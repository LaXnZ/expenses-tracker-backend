const express = require("express");
const {
  createIncomeController,
  fetchAllIncomeController,
  fetchIncomeDetailsController,
  updateIncomeController,
  deleteIncomeController,
} = require("../../controllers/incomes/incomeController");
const authMiddleware = require("../../middlewares/authMiddleware");

const incomeRoute = express.Router();

incomeRoute.post("/", authMiddleware, createIncomeController);
incomeRoute.get("/", authMiddleware, fetchAllIncomeController);
incomeRoute.get("/:id", authMiddleware, fetchIncomeDetailsController);
incomeRoute.put("/:id", authMiddleware, updateIncomeController);
incomeRoute.delete("/:id", authMiddleware, deleteIncomeController);

module.exports = incomeRoute;
