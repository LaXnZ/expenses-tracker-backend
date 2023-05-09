const express = require("express");
const dbConnect = require("./config/dbConnect");
const userRoute = require("./routes/users/usersRoute");

const app = express();

//connection to database
dbConnect();

//middlewares
app.use(express.json());

//routes
app.use("/", userRoute);

module.exports = app;
