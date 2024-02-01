import express from express;
import{
    createEmployee,
    readEmployeeAll,
    readEmployeeInfo,
    updateEmployee,
    deleteEmployee
} from "../controller/employee_controller.js";

const router = express.router();

router.post("/employee", createEmployee);
router.get("/employee/view", readEmployeeAll);
router.get("/employee/view/:id", readEmployeeInfo);
router.patch("/employee/edit/:id", updateEmployee);
router.delete("/employee/remove/:id", deleteEmployee);

export default router;