import express from "express";
import {
  createCompany,
  readCompanyAll,
  updateCompany,
  deleteCompany,
} from "../controller/company_controller.js";

const router = express.Router();

router.post("/company", createCompany);
router.get("/company/view/:id", readCompanyAll);
router.patch("/company/edit/:id", updateCompany);
router.delete("/company/remove/:id", deleteCompany);

export default router;
