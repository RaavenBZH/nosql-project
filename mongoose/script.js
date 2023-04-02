const mongoose = require("mongoose");

const Driver = require("./collections/drivers");
const docDrivers = require("../db/insertions/drivers");

const Race = require("./collections/races");
const docRaces = require("../db/insertions/races");

mongoose.connect("mongodb://localhost:27017/f1_mongoose")
  .then(() => {
    console.log("Successfully connected to the database");
    return Promise.all([
      Driver.insertMany(docDrivers, { ordered: true }),
      Race.insertMany(docRaces, { ordered: true })
    ]);
  })
  .then(() => {
    console.log("Successfully inserted data into the collections");
    return mongoose.connection.close();
  })
  .then(() => {
    console.log("Connection to the database has been closed");
  })
  .catch((error) => {
    console.error("Error occurred while connecting to the database", error);
  });
