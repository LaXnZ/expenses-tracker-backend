const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect");
const {
  errorHandler,
  notFoundHandler,
} = require("./middlewares/errorMiddleware");
const userRoute = require("./routes/users/usersRoute");

const app = express();

//env
dotenv.config();

//connection to database
dbConnect();

//middlewares
app.use(express.json());

//routes
app.use("/api/users", userRoute);

//errorHandlers
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
