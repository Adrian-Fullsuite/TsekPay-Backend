import express from "express";
import uploadMulter from "../utils/multerFileHandler.js";
import {
  createCompany,
  readCompanyAll,
  updateCompany,
  deleteCompany,
} from "../controller/company_controller.js";

const router = express.Router();

router.post("/company", uploadMulter.single("logo"), createCompany);
router.get("/company/view/:id", readCompanyAll);
router.patch("/company/edit/:id", uploadMulter.single("logo"), updateCompany);
router.delete("/company/remove/:id", deleteCompany);

export default router;
