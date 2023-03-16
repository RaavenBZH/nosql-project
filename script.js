const mongo = require("mongodb").MongoClient;

const collCircuit = require("./collections/circuit").schema;
const documentCircuit = require("./insertions/circuit");

mongo.connect("mongodb://localhost:27017").then(
  (client) => {
    console.log("connection success");
    let db = client.db("grandPrix");

    let circuit = db.collection("circuit", collCircuit, (err) => {
      console.log(err);
    });

    circuit
      .insertMany(documentCircuit, {
        ordered: true,
      })
      .then(() => {
        console.log("insertion success");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  (err) => {
    console.log(err);
  }
);
