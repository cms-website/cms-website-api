import express from "express";
import menuController from "./menu.controller";
const router = express.Router();
import { jwtTokenMiddleware } from "src/middlewares/jwtToken.middleware";

router.route("/").get(menuController.getMenu);
router.route("/create").post( jwtTokenMiddleware,menuController.create);
export default router;