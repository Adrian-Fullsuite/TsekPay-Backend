import express from "express";
import{
    create_employee_financial,
    read_employee_financial_all,
    read_employee_financial_info,
    update_employee_financial,
    delete_employee_financial
} from "../controller/employee_financial_conroller.js";

const router = express.Router();

router.post("", create_employee_financial);
router.get("", read_employee_financial_all);
router.get("", read_employee_financial_info);
router.patch("", update_employee_financial);
router.delete("", delete_employee_financial);

export default router;

