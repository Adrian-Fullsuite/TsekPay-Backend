import express from "express";
import {
    createPayItem,
    readPayItemAll,
    readPayItemAll2,
    updatePayItem,
    deletePayItem
} from "../controller/pay_item_controller.js";

const router = express.Router();

router.post("/pay-item", createPayItem);
router.get("/pay-item/view/:company_id", readPayItemAll);
router.get("/pay-item/data/:account_id", readPayItemAll2);
router.patch("/pay-item/edit/:id", updatePayItem);
router.delete("/pay-item/remove/:id", deletePayItem);

export default router;