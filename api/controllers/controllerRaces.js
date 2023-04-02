const api = require("../services/APIRaces");

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

const getPodiumsFerrari = (req, res) => {
  api
    .podiumsFerrari()
    .then((results) => {
      res.send({ status: "OK", data: results });
    })
    .catch((err) => {
      res.send({ status: "ERROR", data: err });
    });
};

module.exports = {
  getBestPilot,
  getPodiumsFerrari,
};
