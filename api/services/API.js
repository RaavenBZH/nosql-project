const mongo = require("mongodb").MongoClient;
const host = require("./config").influx_host;

class API {
  constructor() {
    this.host = host;

    mongo.connect(this.host).then((client) => {
      this.db = client.db("f1");
    });
  }

  dataFetchAll(params) {
    let coll = params.collection;

    return new Promise((resolve, reject) => {
      this.db
        .collection(coll)
        .find({})
        .toArray()
        .then((results) => {
          console.log("fetched all data from collection: " + coll);
          resolve(results);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  dataPost(params, body) {
    let coll = params.collection;

    return new Promise((resolve, reject) => {
      this.db
        .collection(coll)
        .insertOne(body)
        .then(() => {
          console.log("posted data to collection: " + coll);
          resolve();
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  dataDelete(params, body) {
    let coll = params.collection;

    return new Promise((resolve, reject) => {
      this.db
        .collection(coll)
        .deleteOne(body)
        .then(() => {
          console.log("deleted data from collection: " + coll);
          resolve();
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }
}

module.exports = new API();
