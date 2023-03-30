const api = require("../services/APIQualifyings");

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

const getLeaderboard = (req, res) => {
  api
    .leaderboard()
    .then((results) => {
      res.send({ status: "OK", data: results });
    })
    .catch((err) => {
      res.send({ status: "ERROR", data: err });
    });
};

module.exports = {
  getBestPilot,
  getLeaderboard,
};
