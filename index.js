const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config()
const signupRouter = require("./content/login-signup/siginUp/routes/signUp.router");
const loginRoute = require("./content/login-signup/login/router");
const travelRouter = require("./content/travel/router");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", true);

mongoose
  .connect(
    process.env.DATABASE_FILE || "mongodb://0.0.0.0:27017/signup"
  )
  .then(() => console.log("db conntected.."));

app.use("/signUp",signupRouter);
app.use("/login",loginRoute);
app.use("/travel",travelRouter);



app.listen(4000);
