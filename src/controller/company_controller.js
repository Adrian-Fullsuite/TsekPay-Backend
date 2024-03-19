import db from "../database/db.js";
import { sanitizeObject } from "../utils/sanitize.js";
import checkAuthorization from "../utils/authorization.js";

const createCompany = (req, res) => {
  if (checkAuthorization(req.headers)) {
    const { account_id, company_name, tin, address, logo } = req.body;
    db.query(
      "INSERT INTO company(account_id, company_name, tin,  address, logo) VALUES(?, ?, ?, ?, ?)",
      [account_id, company_name, tin, address, logo],
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
};

const readCompanyAll = async (req, res) => {
  if (checkAuthorization(req.headers)) {
    const {id} = req.params;

    db.query("SELECT * FROM company WHERE account_id = ?",
    [id],
    (error, result) => {
      const rows = result;
      if (rows) {
        //res.sendStatus(200);
        res.json({ rows });
      } else {
        res.sendStatus(500);
      }
    });
  } else {
    res.sendStatus(401);
  }
};

const readCompanyInfo = async (req, res) => {
  if (checkAuthorization(req.headers)) {
    const { id } = req.params;

    db.query(
      "SELECT * FROM company WHERE id = ?",
      [id],
      (error, results, fields) => {
        const rows = results;

        if (rows) {
          //res.sendStatus(200);
          res.json({ rows });
        } else {
          res.sendStatus(500);
        }
      }
    );
  } else {
    res.sendStatus(401);
  }
};

const updateCompany = (req, res) => {
  if (checkAuthorization(req.headers)) {
    const { account_id, company_name, tin, address, logo } = req.body;
    const { id } = req.params;
    db.query(
      "UPDATE company SET account_id = ?, company_name = ?, tin = ?, address = ?, logo = ? WHERE id = ?",
      [account_id, company_name, tin, address, logo, id],
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
};

const deleteCompany = (req, res) => {
  if (checkAuthorization(req.headers)) {
    const { id } = req.params;
    db.query("DELETE FROM company WHERE id = ?", [id], (error, result) => {
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

export {
  createCompany,
  readCompanyAll,
  readCompanyInfo,
  updateCompany,
  deleteCompany,
};
