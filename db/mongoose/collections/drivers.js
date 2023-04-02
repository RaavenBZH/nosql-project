const mongoose = require("mongoose");

const driver = new mongoose.Schema({
  lastName: {
    type: String,
    required: true,
    description: "Last name of the driver, must be a string and is required",
  },
  firstName: {
    type: String,
    required: true,
    description: "First name of the driver, must be a string and is required",
  },
  team: {
    type: String,
    required: true,
    description: "Team of the driver, must be a string and is required",
  },
  birthdate: {
    type: String,
    required: true,
    description: "Birthdate of the driver, must be a date and is required",
  },
});

const Driver = mongoose.model("Driver", driver);

module.exports = Driver;