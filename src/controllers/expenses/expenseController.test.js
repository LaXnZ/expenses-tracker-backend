const expressAsyncHandler = require("express-async-handler");
const Expense = require("../../model/Expense");
const {
  createExpenseController,
  fetchAllExpenseController,
} = require("./expenseController");

jest.mock("../../model/Expense");

describe("expenseController", () => {
  describe("createExpenseController", () => {
    it("should create a new expense", async () => {
      const title = "Test Expense";
      const amount = 100;
      const description = "Test Description";
      const userId = "123";

      const req = {
        body: {
          title,
          amount,
          description,
        },
        user: {
          _id: userId,
        },
      };

      const expense = {
        _id: "456",
        title,
        amount,
        description,
        user: userId,
      };

      Expense.create.mockResolvedValue(expense);

      const res = {
        json: jest.fn(),
      };

      await createExpenseController(req, res);

      expect(Expense.create).toHaveBeenCalledWith({
        title,
        amount,
        description,
        user: userId,
      });
      expect(res.json).toHaveBeenCalledWith(expense);
    });

    it("should return an error if expense creation fails", async () => {
      const title = "Test Expense";
      const amount = 100;
      const description = "Test Description";
      const userId = "123";

      const req = {
        body: {
          title,
          amount,
          description,
        },
        user: {
          _id: userId,
        },
      };

      const error = new Error("Failed to create expense");

      Expense.create.mockRejectedValue(error);

      const res = {
        json: jest.fn(),
      };

      await createExpenseController(req, res);

      expect(Expense.create).toHaveBeenCalledWith({
        title,
        amount,
        description,
        user: userId,
      });
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });

  describe("fetchAllExpenseController", () => {
    it("should fetch all expenses", async () => {
      const expenses = [
        {
          _id: "123",
          title: "Test Expense 1",
          amount: 100,
          description: "Test Description 1",
          user: {
            _id: "456",
            firstname: "Test",
            lastname: "User",
            email: "test@example.com",
          },
        },
        {
          _id: "789",
          title: "Test Expense 2",
          amount: 200,
          description: "Test Description 2",
          user: {
            _id: "456",
            firstname: "Test",
            lastname: "User",
            email: "test@example.com",
          },
        },
      ];

      const page = 1;

      const req = {
        query: {
          page,
        },
      };

      Expense.paginate.mockResolvedValue({
        docs: expenses,
        totalDocs: expenses.length,
        page,
        limit: 10,
      });

      const res = {
        json: jest.fn(),
      };

      await fetchAllExpenseController(req, res);

      expect(Expense.paginate).toHaveBeenCalledWith(
        {},
        { limit: 10, page, populate: "user" }
      );
      expect(res.json).toHaveBeenCalledWith({
        docs: expenses,
        totalDocs: expenses.length,
        page,
        limit: 10,
      });
    });

    it("should return an error if expense fetching fails", async () => {
      const page = 1;

      const req = {
        query: {
          page,
        },
      };

      const error = new Error("Failed to fetch expenses");

      Expense.paginate.mockRejectedValue(error);

      const res = {
        json: jest.fn(),
      };

      await fetchAllExpenseController(req, res);

      expect(Expense.paginate).toHaveBeenCalledWith(
        {},
        { limit: 10, page, populate: "user" }
      );
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });
});