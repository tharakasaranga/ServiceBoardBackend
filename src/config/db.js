const mongoose = require("mongoose");

let cachedConnection = null;
let cachedPromise = null;

const connectDB = async () => {
  try {
    if (cachedConnection) {
      return cachedConnection;
    }

    if (cachedPromise) {
      return cachedPromise;
    }

    cachedPromise = mongoose.connect(process.env.MONGO_URI);

    await cachedPromise;

    console.log("MongoDB Connected");

    cachedConnection = mongoose.connection;
    cachedPromise = null;

    return cachedConnection;
  } catch (error) {
    console.log(error);

    cachedPromise = null;

    throw error;
  }
};

module.exports = connectDB;