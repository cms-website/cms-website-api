import express from "express";
import pageController from "./page.controller";
const router = express.Router();

router.route("/create").post( pageController.create);
export default router; 