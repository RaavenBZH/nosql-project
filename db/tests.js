const mongo = require("mongodb").MongoClient;

// Collection creation and data insertion
mongo.connect("mongodb://localhost:27017").then(
  (client) => {
    console.log("connection success");
    let db = client.db("f1");

    db.collection("drivers")
      .insertOne({
        test: 0,
      })
      .then(() => {
        console.log("insertion success");
      })
      .catch((err) => {
        console.error(err);
      });

    db.collection("qualifyings")
      .insertOne({
        test: 0,
      })
      .then(() => {
        console.log("insertion success");
      })
      .catch((err) => {
        console.error(err);
      });

    db.collection("races")
      .insertOne({
        test: 0,
      })
      .then(() => {
        console.log("insertion success");
      })
      .catch((err) => {
        console.error(err);
      });

    db.collection("seasons")
      .insertOne({
        test: 0,
      })
      .then(() => {
        console.log("insertion success");
      })
      .catch((err) => {
        console.error(err);
      });

    db.collection("sprints")
      .insertOne({
        test: 0,
      })
      .then(() => {
        console.log("insertion success");
      })
      .catch((err) => {
        console.error(err);
      });

    db.collection("tracks")
      .insertOne({
        test: 0,
      })
      .then(() => {
        console.log("insertion success");
      })
      .catch((err) => {
        console.error(err);
      });
  },
  (err) => {
    console.error(err);
  }
);
