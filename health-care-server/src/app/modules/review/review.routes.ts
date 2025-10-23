import { Router } from "express";
import { tokenVerifier } from "../../middlewares/tokenVerifier";
import controllers from "./review.controller";

const router = Router();

router.post("/", tokenVerifier, controllers.createReview);

export default router;
