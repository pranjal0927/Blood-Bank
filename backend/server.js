import express from "express";
import morgan from "morgan";
import cors from "cors";
import dbConnection from "./dbConfig/dbConnection.js";
import route from "./routes/Auth.js";
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Third party middleware
app.use(cors());
app.use(morgan("dev"));

//dbConnection
dbConnection();

//Test API
app.get("/", (req, res) => {
  res.status(200).send({ message: "test message" });
});

//API
app.use("/auth", route);

//listen
const PORT = 8080;
const hostName = "127.0.0.1";
app.listen(PORT, hostName, () => {
  console.log(`server running at http://${hostName}:${PORT}`);
});
