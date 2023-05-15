const express = require("express");
const { createIncomeController,fetchAllIncomeController ,fetchIncomeDetailsController} = require("../../controllers/incomes/incomeController");


const incomeRoute = express.Router();

incomeRoute.post('/',createIncomeController)
incomeRoute.get('/',fetchAllIncomeController)
incomeRoute.get('/:id',fetchIncomeDetailsController)

module.exports = incomeRoute;
