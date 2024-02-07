import db from "../database/db.js";
import { sanitizeObject } from "../utils/sanitize.js";
import checkAuthorization from "../utils/authorization.js";

const createPayslip = (req, res) => {
    if(checkAuthorization(req.headers)){
        const { employee_id, start_date, end_date, payables, total_deductions, net_salary, date_of_payout } = req.body;

        // Serialize the payables object to a JSON string
        const serializedPayables = JSON.stringify(payables);

        db.query(
            "INSERT INTO payslip (employee_id, start_date, end_date, payables, total_deductions, net_salary, date_of_payout) VALUES(?, ?, ?, ?, ?, ?, ?)",
            [employee_id, start_date, end_date, serializedPayables, total_deductions, net_salary, date_of_payout],
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

const readPayslipAll = async (req, res) => {
    if (checkAuthorization(req.headers)) {
        db.query("SELECT * FROM payslip", (error, result) => {
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

const readPayslipInfo = async (req, res) => {
    if(checkAuthorization(req.headers)){
        const { id } = req.params;
        db.query(
            "SELECT * FROM payslip WHERE id = ?",
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

const updatePayslip = (req, res) => {
    if(checkAuthorization(req.headers)){
        const { employee_id, start_date, end_date, payables, total_deductions, net_salary, date_of_payout } = req.body;
        const { id } = req.params;

        // Serialize the payables object to a JSON string
        const serializedPayables = JSON.stringify(payables);

        db.query(
            "UPDATE payslip SET employee_id = ?, start_date = ?, end_date = ?, payables = ?, total_deductions = ?, net_salary = ?, date_of_payout = ? WHERE id = ?",
            [employee_id, start_date, end_date, serializedPayables, total_deductions, net_salary, date_of_payout, id],
            (error, result) => {
                if (error) {
                    console.log(error);
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

const deletePayslip = (req, res) => {
    if(checkAuthorization(req.headers)){
        const { id } = req.params;
        db.query(
        "DELETE FROM payslip WHERE id = ?",
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

export { createPayslip, readPayslipAll, readPayslipInfo, updatePayslip, deletePayslip };