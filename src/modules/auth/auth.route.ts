import express from "express";
import authController from "./auth.controller";
const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/getToken").post(authController.login);       
router.route("/logout").post(authController.logout);
router.route("/forgetPassword").get(authController.forgetPassword);
router.route("/resetPassword").post(authController.resetPassword);
router.route("/changePassword").post(authController.changePassword);

export default router;