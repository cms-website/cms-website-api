import express from "express";
import userController from "./user.controller";
const router = express.Router();
// import { jwtTokenMiddleware } from "src/middlewares/jwtToken.middleware";

router.route("/").get(userController.getAllUser)
router.route("/:id").get(userController.getUserById)
.put(userController.updateUserById)
.patch(userController.updateUserRoleById)
.delete(userController.deleteUserById)
export default router