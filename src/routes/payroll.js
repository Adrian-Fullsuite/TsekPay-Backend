import express from "express";
import{
    create_payroll,
    read_payroll_all,
    read_payroll_info,
    update_payroll,
    delete_payroll,
} from "../controller/payroll_controller.js";

const router = express.Router();

router.post("", create_payroll);
router.get("", read_payroll_all);
router.get("", read_payroll_info);
router.patch("", update_payroll);
router.delete("", delete_payroll);

export default router;