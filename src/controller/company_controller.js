import db from "../database/db.js";
import { sanitizeObject } from "../utils/sanitize.js";
import checkAuthorization from "../utils/authorization.js";
import { response } from "express";

const createCompany = (req, res) => {
    if(checkAuthorization(req.headers)){
        const { account_id, name, address } = req.body;
        const result = db.query(
            "INSERT INTO company(account_id, name, address) VALUES($1, $2, $3)",
            [account_id, name, address]
        );        
        result
            .then((response) => {
                res.sendStatus(200)
            })
            .catch((erro) =>{
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(401);
    }
}

const readCompanyInfo = async (req, res) => {
    if(checkAuthorization(req.headers)){
        const { id } = req.body;
        const { rows } = await db.query(
            "SELECT * FROM company WHERE id = $1",
            [id]
        );        
        if (sanitizeObject(rows)){
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(401);
    }
}

const updateCompany = (req, res) => {
    if(checkAuthorization(req.headers)){
        const { account_id, name, address, id } = req.body;
        const result = db.query(
            "UPDATE company SET account_id = $1, name = $2, address = $3 WHERE id = $4",
            [account_id, name, address, id]
        );
        result
            .then((response) => {
                res.sendStatus(200)
            })
            .catch((erro) =>{
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(401);
    }
}

const deleteCompany = (req, res) => {
    if(checkAuthorization(req.headers)){
        const { id } = req.body;
        const result = db.query(
            "DELETE FROM company WHERE id = $1",
            [id]
        );
        result
            .then((response) => {
                res.sendStatus(200)
            })
            .catch((erro) =>{
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(401);
    }
}

export { createCompany, readCompany, updateCompany, deleteCompany };