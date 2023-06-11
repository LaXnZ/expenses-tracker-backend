const expressAsyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const app = require("../../app");
const Income = require("../../model/Income");
const {
  createIncomeController,
  fetchAllIncomeController,
  fetchIncomeDetailsController,
  updateIncomeController,
  deleteIncomeController,
} = require("./incomeController");

jest.mock("../../model/Income");

describe("incomeController", () => {
  describe("createIncomeController", () => {
    it("should create a new income", async () => {
      const title = "Test Income";
      const amount = 1000;
      const description = "Test Description";
      const user = new mongoose.Types.ObjectId();

      const req = {
        body: {
          title,
          amount,
          description,
        },
        user: {
          _id: user,
        },
      };

      const res = {
        json: jest.fn(),
      };

      Income.create.mockResolvedValue({
        title,
        amount,
        description,
        user,
      });

      await createIncomeController(req, res);

      expect(Income.create).toHaveBeenCalledWith({
        title,
        amount,
        description,
        user,
      });
      expect(res.json).toHaveBeenCalledWith({
        title,
        amount,
        description,
        user,
      });
    });

    it("should return an error if income creation fails", async () => {
      const title = "Test Income";
      const amount = 1000;
      const description = "Test Description";
      const user = new mongoose.Types.ObjectId();

      const req = {
        body: {
          title,
          amount,
          description,
        },
        user: {
          _id: user,
        },
      };

      const res = {
        json: jest.fn(),
      };

      const error = new Error("Test Error");
      Income.create.mockRejectedValue(error);

      await createIncomeController(req, res);

      expect(Income.create).toHaveBeenCalledWith({
        title,
        amount,
        description,
        user,
      });
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });

  describe("fetchAllIncomeController", () => {
    it("should fetch all incomes", async () => {
      const page = 1;
      const incomes = [
        {
          title: "Test Income 1",
          amount: 1000,
          description: "Test Description 1",
          user: new mongoose.Types.ObjectId(),
        },
        {
          title: "Test Income 2",
          amount: 2000,
          description: "Test Description 2",
          user: new mongoose.Types.ObjectId(),
        },
      ];

      const req = {
        query: {
          page,
        },
      };

      const res = {
        json: jest.fn(),
      };

      Income.paginate.mockResolvedValue({
        docs: incomes,
        totalDocs: incomes.length,
        page,
        limit: 10,
      });

      await fetchAllIncomeController(req, res);

      expect(Income.paginate).toHaveBeenCalledWith(
        {},
        { limit: 10, page, populate: "user" }
      );
      expect(res.json).toHaveBeenCalledWith({
        docs: incomes,
        totalDocs: incomes.length,
        page,
        limit: 10,
      });
    });

    it("should return an error if income fetching fails", async () => {
      const page = 1;

      const req = {
        query: {
          page,
        },
      };

      const res = {
        json: jest.fn(),
      };

      const error = new Error("Test Error");
      Income.paginate.mockRejectedValue(error);

      await fetchAllIncomeController(req, res);

      expect(Income.paginate).toHaveBeenCalledWith(
        {},
        { limit: 10, page, populate: "user" }
      );
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });

  describe("fetchIncomeDetailsController", () => {
    it("should fetch a single income", async () => {
      const id = new mongoose.Types.ObjectId();
      const income = {
        _id: id,
        title: "Test Income",
        amount: 1000,
        description: "Test Description",
        user: new mongoose.Types.ObjectId(),
      };

      const req = {
        params: {
          id,
        },
      };

      const res = {
        json: jest.fn(),
      };

      Income.findById.mockResolvedValue(income);

      await fetchIncomeDetailsController(req, res);

      expect(Income.findById).toHaveBeenCalledWith(id);
      expect(res.json).toHaveBeenCalledWith(income);
    });

    it("should return an error if income fetching fails", async () => {
      const id = new mongoose.Types.ObjectId();

      const req = {
        params: {
          id,
        },
      };

      const res = {
        json: jest.fn(),
      };

      const error = new Error("Test Error");
      Income.findById.mockRejectedValue(error);

      await fetchIncomeDetailsController(req, res);

      expect(Income.findById).toHaveBeenCalledWith(id);
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });

  describe("updateIncomeController", () => {
    it("should update an income", async () => {
      const id = new mongoose.Types.ObjectId();
      const title = "Test Income";
      const amount = 1000;
      const description = "Test Description";

      const req = {
        params: {
          id,
        },
        body: {
          title,
          amount,
          description,
        },
      };

      const res = {
        json: jest.fn(),
      };

      const updatedIncome = {
        _id: id,
        title,
        amount,
        description,
        user: new mongoose.Types.ObjectId(),
      };
      Income.findByIdAndUpdate.mockResolvedValue(updatedIncome);

      await updateIncomeController(req, res);

      expect(Income.findByIdAndUpdate).toHaveBeenCalledWith(
        id,
        {
          title,
          description,
          amount,
        },
        { new: true }
      );
      expect(res.json).toHaveBeenCalledWith(updatedIncome);
    });

    it("should return an error if income update fails", async () => {
      const id = new mongoose.Types.ObjectId();
      const title = "Test Income";
      const amount = 1000;
      const description = "Test Description";

      const req = {
        params: {
          id,
        },
        body: {
          title,
          amount,
          description,
        },
      };

      const res = {
        json: jest.fn(),
      };

      const error = new Error("Test Error");
      Income.findByIdAndUpdate.mockRejectedValue(error);

      await updateIncomeController(req, res);

      expect(Income.findByIdAndUpdate).toHaveBeenCalledWith(
        id,
        {
          title,
          description,
          amount,
        },
        { new: true }
      );
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });

  describe("deleteIncomeController", () => {
    it("should delete an income", async () => {
      const id = new mongoose.Types.ObjectId();
      const income = {
        _id: id,
        title: "Test Income",
        amount: 1000,
        description: "Test Description",
        user: new mongoose.Types.ObjectId(),
      };

      const req = {
        params: {
          id,
        },
      };

      const res = {
        json: jest.fn(),
      };

      Income.findByIdAndDelete.mockResolvedValue(income);

      await deleteIncomeController(req, res);

      expect(Income.findByIdAndDelete).toHaveBeenCalledWith(id);
      expect(res.json).toHaveBeenCalledWith(income);
    });

    it("should return an error if income deletion fails", async () => {
      const id = new mongoose.Types.ObjectId();

      const req = {
        params: {
          id,
        },
      };

      const res = {
        json: jest.fn(),
      };

      const error = new Error("Test Error");
      Income.findByIdAndDelete.mockRejectedValue(error);

      await deleteIncomeController(req, res);

      expect(Income.findByIdAndDelete).toHaveBeenCalledWith(id);
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });
});
