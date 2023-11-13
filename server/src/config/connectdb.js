const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (db) {
      console.log("Connected successfully!");
    }
  } catch (error) {
    console.log("Connected Fail!");
  }
};

module.exports = { connectDB };
