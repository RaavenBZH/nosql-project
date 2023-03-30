const api = require("../services/APIDrivers");

const getBestPilot = (req, res) => {
  api
    .bestPilot()
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
  getBestPilot,
  getAvgAge,
};
