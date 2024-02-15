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
        console.error(error);
        res.sendStatus(500);
    }
};

const readAccountAll = async (req, res) => {
    if (checkAuthorization(req.headers)) {
        db.query("SELECT id, email, first_name, middle_name, last_name, date_of_birth, account_type FROM account", (error, result) => {
            const rows = result;
            if (rows) {
                res.json({rows});
            } else {
              res.sendStatus(500);
            }
        });
    } else {
      res.sendStatus(401);
    }
};

const readAccountInfo = (req, res) => {
    if (checkAuthorization(req.headers)) {
        const { id } = req.params;
        db.query("SELECT * FROM account WHERE id = ?", [id], (error, results, fields) => {
            const rows = results;
            if (sanitizeObject(rows)) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        });
    } else {
        res.sendStatus(401);
    }
};


const updateAccount = (req, res) => {
    if (checkAuthorization(req.headers)) {
        try {
            const { email, first_name, middle_name, last_name, date_of_birth, password, account_type } = req.body;
            const { id } = req.params;
            const saltRounds = process.env.SALT_ROUNDS;
            const formattedDate = new Date(date_of_birth).toLocaleDateString('en-CA'); 
        
            let hash = null;
        
            if (password !== null) {
                const salt = bcryptjs.genSaltSync(Number(saltRounds));
                hash = bcryptjs.hashSync(password, salt);
            }
        
            const updateQuery = password !== null
                ? "UPDATE account SET email = ?, first_name = ?, middle_name = ?, last_name = ?, date_of_birth = ?, password = ?, account_type = ? WHERE id = ?"
                : "UPDATE account SET email = ?, first_name = ?, middle_name = ?, last_name = ?, date_of_birth = ?, account_type = ? WHERE id = ?";
        
            const updateParams = password !== null
                ? [email, first_name, middle_name, last_name, formattedDate, hash, account_type, id]
                : [email, first_name, middle_name, last_name, formattedDate, account_type, id];
        
            db.query(updateQuery, updateParams, (error, result) => {
                if (error) {
                    console.error(error);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        } catch (error) {
            console.error(error);
        }        
    } else {
        res.sendStatus(401);
    }
};


const deleteAccount = (req, res) => {
    if(checkAuthorization(req.headers)){
        const { id } = req.params;
        db.query("DELETE FROM account WHERE id = ?", [id], (error, result) => {
            if (error) {
                console.error(error);
                res.sendStatus(500);
                return;
            }
            res.sendStatus(200);
        });
    } else {
        res.sendStatus(401);
    }
};

export {createAccount, readAccountAll, readAccountInfo, updateAccount, deleteAccount};