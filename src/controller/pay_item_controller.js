import db from "../database/db.js";
import checkAuthorization from "../utils/authorization.js";

const createPayItem = (req, res) => {
  if (checkAuthorization(req.headers)) {
    const { company_id, name, category } = req.body;
    db.query(
      "INSERT INTO pay_item(company_id, name, category) VALUES(?, ?, ?)",
      [company_id, name, category],
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

const readPayItemAll = async (req, res) => {
  if (checkAuthorization(req.headers)) {
    const {company_id} = req.params;

    db.query("SELECT * FROM pay_item WHERE company_id = ?",
    [company_id],
    (error, result) => {
      const rows = result;
      if (rows) {
        res.json({ rows });
      } else {
        res.sendStatus(500);
      }
    });
  } else {
    res.sendStatus(401);
  }
};

const readPayItemAll2 = async (req, res) => {
  if (checkAuthorization(req.headers)) {
    const {account_id} = req.params;

    db.query("SELECT * FROM `company` INNER JOIN `pay_item` ON `company`.`id` = `pay_item`.`company_id` WHERE `company`.`account_id` = ?",
    [account_id],
    (error, result) => {
      const rows = result;
      if (rows) {
        res.json({ rows });
      } else {
        res.sendStatus(500);
      }
    });
  } else {
    res.sendStatus(401);
  }
};

const updatePayItem = (req, res) => {
  if (checkAuthorization(req.headers)) {
    const { name, category } = req.body;
    const { id } = req.params;
    db.query(
      "UPDATE pay_item SET name = ?, category = ? WHERE id = ?",
      [ name, category, id],
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

const deletePayItem = (req, res) => {
  if (checkAuthorization(req.headers)) {
    const { id } = req.params;
    db.query("DELETE FROM pay_item WHERE id = ?", [id], (error, result) => {
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
  createPayItem,
  readPayItemAll,
  readPayItemAll2,
  updatePayItem,
  deletePayItem,
};