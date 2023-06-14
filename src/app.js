const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const {
  errorHandler,
  notFoundHandler,
} = require("./middlewares/errorMiddleware");
const userRoute = require("./routes/users/usersRoute");
const incomeRoute = require("./routes/incomes/incomeRoute");
const { expenseRoute } = require("./routes/expenses/expenseRoute");
const {
  accountStatsRoute,
} = require("./routes/accountStats/accountStatsRoute");

const app = express();

//env
dotenv.config();

//connection to database
dbConnect();

//middlewares
const corsOptions = {
    origin: "https://frontend-expense-tracker.vercel.app", // frontend URI (ReactJS)
}

app.use(express.json());
app.use(cors(corsOptions));

//users routes
app.use("/api/users", userRoute);

//account statistics routes
app.use("/", accountStatsRoute);

//income routes
app.use("/api/income", incomeRoute);

//expense routes
app.use("/api/expense", expenseRoute);

//errorHandlers
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
