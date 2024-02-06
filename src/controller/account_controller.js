import bcryptjs from "bcryptjs";
import db from "../database/db.js";
import { sanitizeObject } from "../utils/sanitize.js";
import checkAuthorization from "../utils/authorization.js";

const createAccount = (req, res) => {
    const { email, first_name, middle_name, last_name, date_of_birth, password, account_type } = req.body;
    const saltRounds = process.env.SALT_ROUNDS;

    try {
        bcryptjs.genSalt(Number(saltRounds), (err, salt) => {
            bcryptjs.hash(password, salt, async (err, hash) => {
                if (err) {
                    throw new Error(err);
                } else {
                    const result = db.query(
                        "INSERT INTO account(email, first_name, middle_name, last_name, date_of_birth, password, account_type) VALUES(?, ?, ?, ?, ?, ?, ?)",
                        [email, first_name, middle_name, last_name, date_of_birth, hash, account_type],
                        (error, response) => {
                            if (error) {
                                console.error(error);
                                res.sendStatus(500);
                            } else {
                                res.sendStatus(200);
                            }
                        }
                    );
                }
            });
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

const readAccountAll = async (req, res) => {
    if (checkAuthorization(req.headers)) {
      const { rows } = await db.query("SELECT * FROM account");
      if (rows) {
        res.sendStatus(200).json(rows);
      } else {
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(401);
    }
};

const readAccountInfo = async (req, res) => {
    if(checkAuthorization(req.headers)){
        const { id } = req.params;
        const { rows } = await db.query(
            "SELECT * FROM account WHERE id = $1",
            [id]
        );
        if (sanitizeObject(rows)){
            res.sendStatus(200).json(rows);
        } else {
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(401);
    }
};

const updateAccount = (req, res) => {
    if(checkAuthorization(req.headers)){
        const { email, first_name, middle_name, last_name, date_of_birth, password, account_type_id, id } = req.body;
        const result = db.query(
            "UPDATE account SET email = $1, first_name = $2, middle_name = $3, last_name = $4, date_of_birth = $5, password = $6, account_type_id = $7 WHERE id = $8",
            [email, first_name, middle_name, last_name, date_of_birth, password, account_type_id, id]
        );
        result
            .then((response) => {
                res.sendStatus(200);
            })
            .catch((error) =>{
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(401);
    }
};

const deleteAccount = (req, res) => {
    if(checkAuthorization(req.headers)){
        const { id } = req.params;
        const result = db.query(
            "DELETE FROM account WHERE id = $1",
            [id]
        );
        result
            .then((response) => {
                res.sendStatus(200);
            })
            .catch((error) => {
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(401);
    }
};

export {createAccount, readAccountAll, readAccountInfo, updateAccount, deleteAccount};