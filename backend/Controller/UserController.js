import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

//registration of new user
const registerController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send({ message: "All field are required" });
    let existUser = await userModel.findOne({ email: email });
    if (existUser)
      return res.status(409).send({ message: "User is Already Registered" });
    //Hashing password
    let salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password, salt);
    let newUser = new userModel({ ...req.body, password: hashPassword });
    await newUser.save();
    res.status(201).send({ message: "User successfully created" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Somthing Wrong in Registration",
      error,
      success: false,
    });
  }
};

//this is for login and generating token
export const loginController = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    if ((!email, !password, !role))
      return res.status(400).send({ message: "All field required" });

    let findData = await userModel.findOne({ email: email });
    if (!findData)
      return res.status(400).send({
        message: "Either email or password is invalid",
        success: false,
      });
    // match-role
    if ((findData.role = !role)) throw new Error("Invalid Account");

    //compared-role
    const comparePassword = await bcrypt.compare(password, findData.password);
    if (!comparePassword)
      return res.status(400).send({
        message: "Either email or password is invalid",
        success: false,
      });

    //token
    let accessToken = await jwt.sign(
      { userId: findData._id },
      process.env.ACCESS_SECRET_KEY,
      { expiresIn: "20days" }
    );
    let refreshToken = await jwt.sign(
      { userId: findData._id },
      process.env.REFRESH_SECRET_KEY,
      { expiresIn: "20days" }
    );
    res.status(200).send({
      message: "User is Login Successfully",
      success: true,
      accessToken,
      refreshToken,
      user: findData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Somthing Wrong in Registration",
      error,
      success: false,
    });
  }
};

export default registerController;
