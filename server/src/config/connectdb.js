const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (db) {
      console.log("DB Connected successfully!");
    }
  } catch (error) {
    console.log("DB Connected Fail!", error);
  }
};

module.exports = { connectDB };
