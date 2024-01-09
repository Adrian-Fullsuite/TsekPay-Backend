import express from "express";
import{
    create_deduction,
    read_deduction_all,
    read_deduction_info,
    update_deduction,
    delete_deduction
} from "../controller/deductions_controller.js";

const router = express.Router();

router.post("", create_deduction);
router.get("", read_deduction_all);
router.get("", read_deduction_info);
router.patch("", update_deduction);
router.delete("", delete_deduction)

export default router;