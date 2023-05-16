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
  const { page } = req?.query;
  try {
    const income = await Income.paginate({}, { limit: 10, page: Number(page) });
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

//update income
const updateIncomeController = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params; //getting the mongodb id of that particular income that we want to update
  const { title, amount, description } = req?.body;

  try {
    const income = await Income.findByIdAndUpdate(
      id,
      {
        title,
        description,
        amount,
      },
      { new: true }
    );
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

//delecte income
const deleteIncomeController = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;

  try {
    const income = await Income.findByIdAndDelete(id);
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createIncomeController,
  fetchAllIncomeController,
  fetchIncomeDetailsController,
  updateIncomeController,
  deleteIncomeController,
};
