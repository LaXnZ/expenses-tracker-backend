const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect");
const {
  errorHandler,
  notFoundHandler,
} = require("./middlewares/errorMiddleware");
const userRoute = require("./routes/users/usersRoute");
const incomeRoute = require("./routes/incomes/incomeRoute");
const { expenseRoute } = require("./routes/expenses/expenseRoute");

const app = express();

//env
dotenv.config();

//connection to database
dbConnect();

//middlewares
app.use(express.json());

//users routes
app.use("/api/users", userRoute);

//income routes
app.use("/api/income", incomeRoute);

//expense routes
app.use("/api/expense", expenseRoute);

//errorHandlers
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
