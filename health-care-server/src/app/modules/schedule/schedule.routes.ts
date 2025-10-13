//

//* SCHEDULE ROUTES *//

import { Router } from "express";
import controllers from "./schedule.controller";

const router = Router();

router.get("/", controllers.getAllSchedule);

router.post("/", controllers.createSchedule);

router.delete("/:id", controllers.deleteSchedule);

export default router;
