import db from "../database/db.js";
import bcryptjs from "bcryptjs";
import { encodeToken } from "../utils/token.js";

const accountAuth = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.promise().query("SELECT * FROM account WHERE email = ?", 
          [email]
        );
        if (rows.length == 0) {
            console.log("Account does not exists!");
            res.sendStatus(500);
            return;
        }
        const first_name = rows[0].first_name;
        const middle_name = rows[0].middle_name;
        const last_name  = rows[0].last_name;
        const account_type = rows[0].account_type;
        
        const isPasswordTrue = await bcryptjs.compare(password, rows[0].password);
        if (isPasswordTrue) {
            const token = encodeToken("id", rows[0].id);
            res.json({ token, email, first_name, middle_name, last_name, account_type });
            req.session.user = {
                id: rows[0].id,
                email: email
            };
        } else {
            res.sendStatus(500);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

export { accountAuth };