import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnection = async (req, res) => {
  try {
    await mongoose.connect(`${process.env.MongoURL}`);
    console.log("database connected successfully ");
    // res.status(200).send({ message: "database connected successfully" });
  } catch (error) {
    console.error("something went wrong in database connection ", error);
    // res
    //   .status(500)
    //   .send({ message: "Database connected failed to connect", error });
  }
};
export default dbConnection;
