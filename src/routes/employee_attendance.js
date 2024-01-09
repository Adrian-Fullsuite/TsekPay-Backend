import express from "express";
import{
    create_employee_attendance,
    read_employee_attendance_all,
    read_employee_attendance_info,
    update_employee_attendance,
    delete_employee_attendance
} from "../controller/employee_attendance_controller";

const router = express.Router();

router.post("", create_employee_attendance);
router.get("", read_employee_attendance_all);
router.get("", read_employee_attendance_info);
router.patch("", update_employee_attendance);
router.delete("", delete_employee_attendance);

export default router;