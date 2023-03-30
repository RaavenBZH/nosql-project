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

const postOne = (req, res) => {
  api
    .dataPost(req.params, req.body)
    .then(() => {
      res.send({ status: "OK" });
    })
    .catch((err) => {
      res.send({ status: "ERROR", data: err });
    });
};

const deleteOne = (req, res) => {
  api
    .dataDelete(req.params, req.body)
    .then(() => {
      res.send({ status: "OK" });
    })
    .catch((err) => {
      res.send({ status: "ERROR", data: err });
    });
};

module.exports = {
  getAll,
  postOne,
  deleteOne,
};
