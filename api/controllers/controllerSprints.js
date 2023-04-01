const api = require("../services/APISprints");

const getHighestSpeed = (req, res) => {
  api
    .highestSpeed()
    .then((results) => {
      res.send({ status: "OK", data: results });
    })
    .catch((err) => {
      res.send({ status: "ERROR", data: err });
    });
};

const getAvgTrack = (req, res) => {
  api
    .avgTrack()
    .then(() => {
      res.send({ status: "OK", data: results });
    })
    .catch((err) => {
      res.send({ status: "ERROR", data: err });
    });
};

module.exports = {
  getHighestSpeed,
  getAvgTrack,
};
