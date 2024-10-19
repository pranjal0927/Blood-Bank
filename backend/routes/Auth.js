import express from "express";
import registerController, {
  loginController,
} from "../Controller/UserController.js";
const route = express.Router();

//register || POST
route.post("/register", registerController);
route.post("/login", loginController);

export default route;
