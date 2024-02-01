import express from express;
import{
    createCompany,
    readCompanyAll,
    readCompanyInfo,
    updateCompany,
    deleteCompany
} from "../controller/company_controller.js";

const router = express.router();

router.post("/company", createCompany);
router.get("/company/view", readCompanyAll);
router.get("/company/view/:id", readCompanyInfo);
router.patch("/company/edit/:id", updateCompany);
router.delete("/company/remove/:id", deleteCompany);

export default router;