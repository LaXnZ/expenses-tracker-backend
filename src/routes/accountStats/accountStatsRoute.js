const express = require("express");
const accountStatsController = require("../../controllers/accountStatistics/accountStatsController");

const accountStatsRoute = express.Router();

accountStatsRoute.get("/api/account-stats", accountStatsController);

module.exports = { accountStatsRoute };
