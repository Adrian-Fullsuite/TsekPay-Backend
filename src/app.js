import express from "express";
import session from "express-session";
import account from "./routes/account.js";
import authentication from "./routes/authentication.js";
import company from "./routes/company.js";
import payslip from "./routes/payslip.js";
import pay_item from "./routes/pay_item.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(cors());
app.use(account);
app.use(authentication);
app.use(company);
app.use(payslip);
app.use(pay_item);

app.get("/", (req, res) => {
  res.sendStatus(200);
});
  
export default app;