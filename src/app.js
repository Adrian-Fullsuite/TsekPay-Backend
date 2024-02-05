import express from "express";
import account from "./routes/account.js";
import company from "./routes/company.js";
import employee from "./routes/employee.js";
import payslip from "./routes/payslip.js";

const app = express();

app.use(express.json());
app.use(account);
app.use(company);
app.use(employee);
app.use(payslip);

app.get("/", (req, res) => {
  res.sendStatus(200);
});
  
export default app;