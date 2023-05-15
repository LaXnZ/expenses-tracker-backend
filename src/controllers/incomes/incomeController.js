const expressAsyncHandler = require("express-async-handler");
const Income = require("../../model/Income");

//create income
const createIncomeController = expressAsyncHandler(async (req, res) => {
  const { title, amount, description, user } = req?.body;
  try {
    const income = await Income.create({
      title,
      amount,
      description,
      user,
    });
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

//fetch all incomes
const fetchAllIncomeController = expressAsyncHandler(async (req, res) => {
  try {
    const income = await Income.find();
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

//fetch single income
const fetchIncomeDetailsController = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const income = await Income.findById(id);
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createIncomeController,
  fetchAllIncomeController,
  fetchIncomeDetailsController,
};
