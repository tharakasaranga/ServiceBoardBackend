const mongoose = require("mongoose");
const validator = require("validator");

const jobRequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    contactName: {
      type: String,
      trim: true,
    },

    contactEmail: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email address",
      },
    },

    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("JobRequest", jobRequestSchema);