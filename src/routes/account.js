import express from express;
import{
    createAccount,
    readAccountAll,
    readAccountInfo,
    updateAccount,
    deleteAccount
} from "../controller/account_controller.js";

const router = express.router();

router.post("/account", createAccount);
router.get("/account/view", readAccountAll);
router.get("/account/view/:id", readAccountInfo);
router.patch("/account/edit/:id", updateAccount);
router.delete("/account/remove/:id", deleteAccount);

export default router;