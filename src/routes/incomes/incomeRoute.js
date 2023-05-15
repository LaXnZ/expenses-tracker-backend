const express = require("express");
const { createIncomeController } = require("../../controllers/incomes/incomeController");


const incomeRoute = express.Router();

incomeRoute.post('/',createIncomeController)

module.exports = incomeRoute;
