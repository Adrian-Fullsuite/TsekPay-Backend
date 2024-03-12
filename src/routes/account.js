import express from "express";
import{
    createAccount,
    readAccountAll,
    updateAccount,
    deleteAccount,
    isEmailExists,
    getUser
} from "../controller/account_controller.js";

const router = express.Router();

router.post("/account", createAccount);
router.get("/account/view", readAccountAll);
router.patch("/account/edit/:id", updateAccount);
router.delete("/account/remove/:id", deleteAccount);
router.get("/account/isemailexists/:email", isEmailExists);
router.get("/account/get/:id", getUser);


export default router;