import express from "express";
import userController from "./user.controller";
const router = express.Router();
// import { jwtTokenMiddleware } from "src/middlewares/jwtToken.middleware";

router.route("/user").get(userController.getAllUser)
router.route("/user/:id").get(userController.getUserById)
router.route("/user/:id").put(userController.updateUserById)
router.route("/user/:id").patch(userController.updateUserRoleById)
router.route("/user/:id").delete(userController.deleteUserById)
export default router