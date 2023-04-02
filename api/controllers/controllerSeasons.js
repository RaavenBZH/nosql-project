const api = require("../services/APISeasons");

const getHighestPodiums = (req, res) => {
  api
    .highestPodiums()
    .then((results) => {
      res.send({ status: "OK", data: results });
    })
    .catch((err) => {
      res.send({ status: "ERROR", data: err });
    });
};

const getSecondBest = (req, res) => {
  api
    .secondBest()
    .then((results) => {
      res.send({ status: "OK", data: results });
    })
    .catch((err) => {
      res.send({ status: "ERROR", data: err });
    });
};

module.exports = {
  getHighestPodiums,
  getSecondBest,
};
