const mongoose = require("mongoose");

//schema for income
const incomeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    type: {
      type: String,
      default: "Income",
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, //must be mongodb id
      ref: "User", //which model are we referencing
      required: [true, "User ID is required"],
    },
  },
  { timestamps: true }
);

//compile schema into model
const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
