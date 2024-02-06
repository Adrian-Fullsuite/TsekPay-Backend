import db from "../database/db.js";
import bcryptjs from "bcryptjs";
import { encodeToken } from "../utils/token.js";

const accountAuth = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.promise().query("SELECT password FROM account WHERE email = ?", 
          [email]
        );

        if (rows.length == 0) {
            res.sendStatus(500);
            return;
        }

        const isPasswordTrue = await bcryptjs.compare(password, rows[0].password);
        if (isPasswordTrue) {
            const token = encodeToken("id", rows[0].id);
            res.json({ token });
        } else {
            res.sendStatus(500);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

export { accountAuth };