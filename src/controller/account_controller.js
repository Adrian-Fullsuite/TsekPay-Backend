import bcryptjs from "bcryptjs";
import db from "../database/db.js";
import checkAuthorization from "../utils/authorization.js";

const createAccount = (req, res) => {
  const {
    email,
    first_name,
    middle_name,
    last_name,
    date_of_birth,
    password,
    account_type,
  } = req.body;
  const saltRounds = process.env.SALT_ROUNDS;

  try {
    bcryptjs.genSalt(Number(saltRounds), (err, salt) => {
      bcryptjs.hash(password, salt, async (err, hash) => {
        if (err) {
          throw new Error(err);
        } else {
          const result = db.query(
            "INSERT INTO account(email, first_name, middle_name, last_name, date_of_birth, password, account_type) VALUES(?, ?, ?, ?, ?, ?, ?)",
            [
              email,
              first_name,
              middle_name,
              last_name,
              date_of_birth,
              hash,
              account_type,
            ],
            (error, response) => {
              if (error) {
                // console.error(error);
                // console.log(error);
                // res.sendStatus(400);
                res.status(500).send(`Invalid query: ${error}`);
              } else {
                // res.sendStatus(200);
                res.status(200).send("Inserted Successfully");
              }
            }
          );
        }
      });
    });
  } catch (error) {
    // console.error(error);
    // console.log(error);
    // res.sendStatus(500);
    res.status(500).send("Internal Server Error");
  }
};

const readAccountAll = async (req, res) => {
  if (checkAuthorization(req.headers)) {
    db.query(
      "SELECT id, email, first_name, middle_name, last_name, date_of_birth, account_type FROM account",
      (error, result) => {
        const rows = result;
        if (rows) {
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

function formatDateString(inputDateString) {
  const inputDate = new Date(inputDateString);

  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
  const day = inputDate.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const updateAccount = (req, res) => {
  if (checkAuthorization(req.headers)) {
    try {
      const {
        email,
        first_name,
        middle_name,
        last_name,
        date_of_birth,
        password,
        account_type,
      } = req.body;
      const { id } = req.params;
      const saltRounds = process.env.SALT_ROUNDS;
      const formattedDate = formatDateString(date_of_birth);

      let hash = null;

      if (password !== null && password !== undefined) {
        const salt = bcryptjs.genSaltSync(Number(saltRounds));
        hash = bcryptjs.hashSync(password, salt);
      }

      const updateQuery =
        password !== null && password !== undefined && password !== ""
          ? "UPDATE account SET email = ?, first_name = ?, middle_name = ?, last_name = ?, date_of_birth = ?, password = ?, account_type = ? WHERE id = ?"
          : "UPDATE account SET email = ?, first_name = ?, middle_name = ?, last_name = ?, date_of_birth = ?, account_type = ? WHERE id = ?";

      const updateParams =
        password !== null && password !== undefined && password !== ""
          ? [
              email,
              first_name,
              middle_name,
              last_name,
              formattedDate,
              hash,
              account_type,
              id,
            ]
          : [
              email,
              first_name,
              middle_name,
              last_name,
              formattedDate,
              account_type,
              id,
            ];

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
  if (checkAuthorization(req.headers)) {
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

const isEmailExists = (req, res) => {
  const { email } = req.params;

  if (checkAuthorization(req.headers)) {
    db.query(
      "SELECT email FROM account WHERE email=?",
      [email],
      (error, result) => {
        const rows = result;
        if (rows) {
          res.status(200).send(rows.length == 1);
        } else {
          // res.sendStatus(500);
          res.status(500).send("Internal Server Error");
        }
      }
    );
  } else {
    // res.sendStatus(401);
    res.status(401).send("Unauthorize Request");
  }
};

const getUser = (req, res) => {
  const { id } = req.params;
  if (checkAuthorization(req.headers)) {
    db.query(
      "SELECT id, email, first_name, middle_name, last_name, date_of_birth, account_type FROM account WHERE id=?",
      [id],
      (error, result) => {
        if (result) {
          res.status(200).send(result);
        } else {
          // res.sendStatus(500);
          res.status(500).send("Internal Server Error");
        }
      }
    );
  } else {
    // res.sendStatus(401);
    res.status(401).send("Unauthorize Request");
  }
};

export {
  createAccount,
  readAccountAll,
  updateAccount,
  deleteAccount,
  isEmailExists,
  getUser,
};
