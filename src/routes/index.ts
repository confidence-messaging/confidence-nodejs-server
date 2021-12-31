import { Router } from "express";
import { messageRoutes } from "./message";

const router = Router();

router.use("/messages", messageRoutes);

export { router as routes };
