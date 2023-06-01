const expressAsyncHandler = require("express-async-handler");
const Expense = require("../../model/Expense");
const Income = require("../../model/Income");

const accountStatsController = expressAsyncHandler(async (req, res) => {
  try {
    //expense statiscs
    const expenseStats = await Expense.aggregate([
      //filterin by amount
      { $match: { amount: { $gte: 0 } } },

      //grouping by id and calculate the average, total, min, max and total records
      {
        $group: {
          _id: null,
          averageExpense: { $avg: "$amount" },
          totalExpense: { $sum: "$amount" },
          minExpense: { $min: "$amount" },
          maxExpense: { $max: "$amount" },
          totalRecordsExpense: { $sum: 1 },
        },
      },
    ]);

    //income statiscs
    const incomeStats = await Income.aggregate([
      //filterin by amount
      { $match: { amount: { $gte: 0 } } },
      //grouping by id and calculate the average, total, min, max and total records
      {
        $group: {
          _id: null,
          averageIncome: { $avg: "$amount" },
          totalIncome: { $sum: "$amount" },
          minIncome: { $min: "$amount" },
          maxIncome: { $max: "$amount" },
          totalRecordsIncome: { $sum: 1 },
        },
      },
    ]);

    res.json({ expenseStats, incomeStats });
  } catch (error) {
    res.json(error);
  }
});

module.exports = accountStatsController;
