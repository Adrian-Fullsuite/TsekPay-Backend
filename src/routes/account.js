import express from "express";
import{
    createAccount,
    readAccountAll,
    updateAccount,
    deleteAccount
} from "../controller/account_controller.js";

const router = express.Router();

router.post("/account", createAccount);
router.get("/account/view", readAccountAll);
router.patch("/account/edit/:id", updateAccount);
router.delete("/account/remove/:id", deleteAccount);

export default router;