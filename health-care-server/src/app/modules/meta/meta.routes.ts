import { Router } from "express";
import { tokenVerifier } from "../../middlewares/tokenVerifier";
import controllers from "./meta.controller";

const router = Router();

router.get("/", tokenVerifier, controllers.fetchDashboardMetaData);

export default router;
