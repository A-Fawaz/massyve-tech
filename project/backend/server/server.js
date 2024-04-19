const express = require("express");
const cookieParser = require("cookie-parser");
const authRoute = require("../routes/AuthRoutes");

const connect = require("./connect");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.set("view engine", "ejs");
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3001", // Replace with the origin of your frontend application
  credentials: true, // Allow cookies to be sent with requests
};
app.use(express.json(), cors(corsOptions));
app.use(authRoute);
app.listen(process.env.PORT, function () {
  connect();
  console.log(`Server started on port ${process.env.PORT}`);
});
