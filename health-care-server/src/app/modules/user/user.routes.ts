//

//* USER ROUTES *//

import { Router } from "express";
import controllers from "./user.controller";

const router = Router();

router.get("/", controllers.getAllUsers);

export default router;
