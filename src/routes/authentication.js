import express from "express";
import {
  accountAuth
} from "../controller/authentication_controller.js";

const router = express.Router();

router.post("/account/authenticate", accountAuth);

export default router;