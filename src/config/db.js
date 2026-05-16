const mongoose = require("mongoose");

let cachedConnection = null;

const connectDB = async () => {
  try {
    if (cachedConnection) {
      return cachedConnection;
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    cachedConnection = mongoose.connection;

    return cachedConnection;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

module.exports = connectDB;