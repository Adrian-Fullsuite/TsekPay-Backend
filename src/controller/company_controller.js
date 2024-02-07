import db from "../database/db.js";
import { sanitizeObject } from "../utils/sanitize.js";
import checkAuthorization from "../utils/authorization.js";

const createCompany = (req, res) => {
    if(checkAuthorization(req.headers)){
        const { account_id, name, address } = req.body;
        db.query(
            "INSERT INTO company(account_id, name, address) VALUES(?, ?, ?)",
            [account_id, name, address],
            (error, response) => {
                if (error) {
                    console.error(error);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            }
        );
    } else {
        res.sendStatus(401);
    }
}

const readCompanyAll = async (req, res) => {
    if (checkAuthorization(req.headers)) {
        db.query("SELECT * FROM company", (error, result) => {
            const rows = result;
            console.log(rows);
            if (rows) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        });
    } else {
      res.sendStatus(401);
    }
};

const readCompanyInfo = async (req, res) => {
    if(checkAuthorization(req.headers)){
        const { id } = req.body;
        db.query("SELECT * FROM company WHERE id = ?", 
        [id], 
        (error, results, fields) => {
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
}

const updateCompany = (req, res) => {
    if(checkAuthorization(req.headers)){
        const { account_id, name, address } = req.body;
        const { id } = req.params;
        db.query(
            "UPDATE company SET account_id = ?, name = ?, address = ? WHERE id = ?",
            [account_id, name, address, id],
            (error, result) => {
                if (error) {
                    console.error(error);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            }
        );
    } else {
        res.sendStatus(401);
    }
}

const deleteCompany = (req, res) => {
    if(checkAuthorization(req.headers)){
        const { id } = req.params;
        db.query(
        "DELETE FROM company WHERE id = ?",
        [id], (error, result) => {
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
}

export { createCompany, readCompanyAll, readCompanyInfo, updateCompany, deleteCompany };