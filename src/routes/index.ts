import { Router } from "express";
import authRouter from "../modules/auth/auth.route";
import menuRouter from "../modules/menu/menu.route"
import userRouter from "../modules/user/user.route"
import roleRouter from "../modules/role/role.route"
import pageRouter from "../modules/page/page.route"

const router = Router();
router.use("/auth", authRouter);
router.use("/menu", menuRouter)
router.use("/user", userRouter)
router.use("/role", roleRouter)
router.use("/page", pageRouter)
export default router;
