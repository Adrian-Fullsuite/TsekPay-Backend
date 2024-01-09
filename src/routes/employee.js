import express from "express";
import{
    create_employee,
    read_employee_all,
    read_employee_info,
    update_employee,
    delete_employee
} from "../controller/employee_controller.js";

const router = express.Router();

router.post("", create_employee);
router.get("", read_employee_all);
router.get("", read_employee_info);
router.patch("", update_employee);
router.delete("", delete_employee);

export default router;