const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

//schema for expense
const expenseSchema = new mongoose.Schema(
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
      default: "Expense",
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

//pagination
expenseSchema.plugin(mongoosePaginate);

//compile schema into model
const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
