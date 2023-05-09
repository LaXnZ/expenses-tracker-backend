const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://lanz:GavlovCilEgYUEN0@expenses-tracker.vlmko9n.mongodb.net/expenses-tracker-db?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database connected");
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

module.exports = dbConnect;
