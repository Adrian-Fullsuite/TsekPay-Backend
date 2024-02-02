import pool from "../database/db.js"
import bcryptjs from "bcryptjs"
import { encodeToken } from "../utils/token"

const accountAuth = ( req, res ) => {
    const { email, password } = req.body;

  const result = pool.query("SELECT password FROM account WHERE email = $1", 
    [email]
  );

  result.then((response) => {
    const { rows } = response;

    if (rows.length == 0) {
      res.sendStatus(500);
      return;
    }

    try {
      bcryptjs.compare(password, rows[0].password, (err, isPasswordTrue) => {
        let token;
        isPasswordTrue
          ? (token = encodeToken("id", rows[0].id))
          : res.sendStatus(500);
        res.send(token);
      });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });
};

export { accountAuth };