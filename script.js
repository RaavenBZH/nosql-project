const mongo = require("mongodb").MongoClient;

const collDrivers = require("collections/drivers");
const docDrivers = require("insertions/drivers");

const collQualifiers = require("collections/qualifiers");
const docQualifiers = require("insertions/qualifiers");

const collRaces = require("collections/races");
const docRaces = require("insertions/races");

const collTracks = require("collections/tracks");
const docTracks = require("insertions/tracks");

mongo.connect("mongodb://localhost:27017").then(
  (client) => {
    console.log("connection success");
    let db = client.db("grandPrix");

    let tracks = db.collection("tracks", collTracks, (err) => {
      console.error(err);
    });

    tracks
      .insertMany(docTracks, {
        ordered: true,
      })
      .then(() => {
        console.log("insertion success");
      })
      .catch((err) => {
        console.error(err);
      });
  },
  (err) => {
    console.erro(err);
  }
);
