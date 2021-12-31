import { Router } from "express";
import { messagesRoutes } from "./messages";
import { utilsRoutes } from "./utils";

const router = Router();

router.use("/messages", messagesRoutes);
router.use("/utils", utilsRoutes);

export { router as routes };
