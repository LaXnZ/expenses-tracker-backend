const express = require("express");
const {
  createExpenseController,
  fetchAllExpenseController,
  fetchExpenseDetailsController,
  updateExpenseController,
  deleteExpenseController,
} = require("../../controllers/expenses/expenseController");

const expenseRoute = express.Router();

expenseRoute.post("/", createExpenseController);
expenseRoute.get("/", fetchAllExpenseController);
expenseRoute.get("/:id", fetchExpenseDetailsController);
expenseRoute.put("/:id", updateExpenseController);
expenseRoute.delete("/:id", deleteExpenseController);

module.exports = { expenseRoute };
