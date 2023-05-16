const express = require("express");
const {
  createExpenseController,
  fetchAllExpenseController,
  fetchExpenseDetailsController,
  updateExpenseController,
  deleteExpenseController,
} = require("../../controllers/expenses/expenseController");
const authMiddleware = require("../../middlewares/authMiddleware");

const expenseRoute = express.Router();

expenseRoute.post("/", authMiddleware, createExpenseController);
expenseRoute.get("/", authMiddleware, fetchAllExpenseController);
expenseRoute.get("/:id", authMiddleware, fetchExpenseDetailsController);
expenseRoute.put("/:id", authMiddleware, updateExpenseController);
expenseRoute.delete("/:id", authMiddleware, deleteExpenseController);

module.exports = { expenseRoute };
