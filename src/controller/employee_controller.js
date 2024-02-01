import db from "../database/db.js";
import { sanitizeObject } from "../utils/sanitize.js";
import checkAuthorization from "../utils/authorization.js";
import { response } from "express";

const createEmployee = (req, res) => {
    if(checkAuthorization(req.headers)){
        const { company_id, first_name, middle_name, last_name, email } = req.body;
        const result = db.query(
            "INSERT INTO employee(company_id, first_name, middle_name, last_name, email) VALUES($1, $2, $3, $4, $5)",
            [company_id, first_name, middle_name, last_name, email]
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

const readEmployeeAll = async (req, res) => {
    if (checkAuthorization(req.headers)) {
      const { rows } = await db.query("SELECT * FROM employee");
      if (rows) {
        res.sendStatus(200);
      } else {
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(401);
    }
  };

const readEmployeeInfo = async (req, res) => {
    if(checkAuthorization(req.headers)){
        const { id } = req.body;
        const { rows } = await db.query(
            "SELECT * FROM employee WHERE id = $1",
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

const updateEmployee = (req, res) => {
    if(checkAuthorization(req.headers)){
        const { company_id, first_name, middle_name, last_name, email, id } = req.body;
        const result = db.query(
            "UPDATE employee SET company_id = $1, first_name = $2, middle_name = $3, last_name = $4, email = $5 WHERE id = $6",
            [company_id, first_name, middle_name, last_name, email, id]
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

const deleteEmployee = (req, res) => {
    if(checkAuthorization(req.headers)){
        const { id } = req.body;
        const result = db.query(
            "DELETE FROM employee WHERE id = $1",
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

export { createEmployee, readEmployeeAll, readEmployeeInfo, updateEmployee, deleteEmployee };