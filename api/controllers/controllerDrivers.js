const api = require("../services/APIDrivers");

const getPilots = (req, res) => {
  api
    .pilots()
    .then((results) => {
      res.send({ status: "OK", data: results });
    })
    .catch((err) => {
      res.send({ status: "ERROR", data: err });
    });
};

const getAvgAge = (req, res) => {
  api
    .avgAge()
    .then((results) => {
      res.send({ status: "OK", data: results });
    })
    .catch((err) => {
      res.send({ status: "ERROR", data: err });
    });
};

module.exports = {
  getPilots,
  getAvgAge,
};
