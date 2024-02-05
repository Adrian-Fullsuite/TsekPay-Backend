import express from "express";
import{
    createPayslip,
    readPayslipAll,
    readPayslipInfo,
    updatePayslip,
    deletePayslip
} from "../controller/payslip_controller.js";

const router = express.Router();

router.post("/payslip", createPayslip);
router.get("/payslip/view", readPayslipAll);
router.get("/payslip/view/:id", readPayslipInfo);
router.patch("/payslip/edit/:id", updatePayslip);
router.delete("/payslip/remove/:id", deletePayslip);

export default router;