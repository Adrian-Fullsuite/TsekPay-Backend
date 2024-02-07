import db from "../database/db.js";
import { sanitizeObject } from "../utils/sanitize.js";
import checkAuthorization from "../utils/authorization.js";

const createEmployee = (req, res) => {
    if(checkAuthorization(req.headers)){
        const { company_id, first_name, middle_name, last_name, email } = req.body;
        db.query(
            "INSERT INTO employee(company_id, first_name, middle_name, last_name, email) VALUES(?, ?, ?, ?, ?)",
            [company_id, first_name, middle_name, last_name, email],
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

const readEmployeeAll = async (req, res) => {
    if (checkAuthorization(req.headers)) {
        db.query("SELECT * FROM employee", (error, result) => {
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

const readEmployeeInfo = async (req, res) => {
    if(checkAuthorization(req.headers)){
        const { id } = req.params;
        db.query(
            "SELECT * FROM employee WHERE id = ?",
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

const updateEmployee = (req, res) => {
    if(checkAuthorization(req.headers)){
        const { company_id, first_name, middle_name, last_name, email } = req.body;
        const { id } = req.params;
        db.query(
            "UPDATE employee SET company_id = ?, first_name = ?, middle_name = ?, last_name = ?, email = ? WHERE id = ?",
            [company_id, first_name, middle_name, last_name, email, id],
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

const deleteEmployee = (req, res) => {
    if(checkAuthorization(req.headers)){
        const { id } = req.params;
        db.query(
        "DELETE FROM employee WHERE id = ?",
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

export { createEmployee, readEmployeeAll, readEmployeeInfo, updateEmployee, deleteEmployee };