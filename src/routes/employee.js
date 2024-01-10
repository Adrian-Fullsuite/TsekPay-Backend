import express from "express";
import{
    create_employee,
    read_employee_all,
    read_employee_info,
    update_employee,
    delete_employee
} from "../controller/employee_controller.js";

const router = express.Router();

router.post("/employee", create_employee);
router.get("/employee/view", read_employee_all);
router.get("/employee/view/:id", read_employee_info);
router.patch("/employee/update/:id", update_employee);
router.delete("/employee/delete/:id", delete_employee);

export default router;