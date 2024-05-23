import { Router } from "express";
import authRouter from "../modules/auth/auth.route";
import menuRouter from "../modules/menu/menu.route"

const router = Router();

router.use("/auth", authRouter);
router.use("/menu", menuRouter)

export default router;
