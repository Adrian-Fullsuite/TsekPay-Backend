import express from "express";
import{
    create_compensation_bonuses,
    read_compensation_bonuses_all,
    read_compensation_bonuses_info,
    update_compensation_bonuses,
    delete_compensation_bonuses
} from "../controller/compensation_bonuses_controller.js";

const router = express.Router();

router.post("", create_compensation_bonuses);
router.get("", read_compensation_bonuses_all);
router.get("", read_compensation_bonuses_info);
router.patch("", update_compensation_bonuses);
router.delete("", delete_compensation_bonuses);

export default router;