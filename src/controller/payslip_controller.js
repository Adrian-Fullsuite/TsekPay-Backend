import pool from "../database/db.js";
import { sanitizeObject } from "../utils/sanitize.js";
import checkAuthorization from "../utils/authorization.js";

const createPayslip = (req, res) => {
    if(checkAuthorization(req.headers)){
        const { employee_id, start_date, end_date, payables, total_deductions, net_salary, date_of_payout } = req.body;
        const result = pool.query(
            "payslip (employee_id, start_date, end_date, payables, total_deductions, net_salary, date_of_payout) VALUES($1, $2, $3, $4, $5, $6, $7)",
            [employee_id, start_date, end_date, payables, total_deductions, net_salary, date_of_payout]
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

const readPayslipAll = async (req, res) => {
    if (checkAuthorization(req.headers)) {
      const { rows } = await pool.query("SELECT * FROM payslip");
      if (rows) {
        res.sendStatus(200);
      } else {
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(401);
    }
  };

const readPayslipInfo = async (req, res) => {
    if(checkAuthorization(req.headers)){
        const { id } = req.body;
        const { rows } = await pool.query(
            "SELECT * FROM payslip WHERE id = $1",
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

const updatePayslip = (req, res) => {
    if(checkAuthorization(req.headers)){
        const { employee_id, start_date, end_date, payables, total_deductions, net_salary, date_of_payout, id } = req.body;
        const result = pool.query(
            "UPDATE payslip SET employee_id = $1, start_date = $2, end_date = $3, payables = $4, total_deductions = $5, net_salary = $6, date_of_payout = $7 WHERE id = $8",
            [employee_id, start_date, end_date, payables, total_deductions, net_salary, date_of_payout, id]
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

const deletePayslip = (req, res) => {
    if(checkAuthorization(req.headers)){
        const { id } = req.body;
        const result = pool.query(
            "DELETE FROM payslip WHERE id = $1",
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

export { createPayslip, readPayslipAll, readPayslipInfo, updatePayslip, deletePayslip };