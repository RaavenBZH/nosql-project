const api = require("../services/API");

const getAll = (req, res) => {
  api
    .dataFetchAll(req.params)
    .then((results) => {
      res.send({ status: "OK", data: results });
    })
    .catch((err) => {
      res.send({ status: "ERROR", data: err });
    });
};

module.exports = {
  getAll,
};
