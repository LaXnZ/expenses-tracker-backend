const express = require("express");
const {
  createIncomeController,
  fetchAllIncomeController,
  fetchIncomeDetailsController,
  updateIncomeController,
  deleteIncomeController,
} = require("../../controllers/incomes/incomeController");

const incomeRoute = express.Router();

incomeRoute.post("/", createIncomeController);
incomeRoute.get("/", fetchAllIncomeController);
incomeRoute.get("/:id", fetchIncomeDetailsController);
incomeRoute.put("/:id", updateIncomeController);
incomeRoute.delete("/:id", deleteIncomeController);

module.exports = incomeRoute;
