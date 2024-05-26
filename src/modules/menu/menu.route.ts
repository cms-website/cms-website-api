import express from "express";
import menuController from "./menu.controller";
const router = express.Router();
import { jwtTokenMiddleware } from "src/middlewares/jwtToken.middleware";

router.route("/").get(jwtTokenMiddleware,menuController.getMenu);
router.route("/create").post( menuController.create);
export default router; 