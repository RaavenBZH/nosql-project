const mongo = require("mongodb").MongoClient;

const collDrivers = require("./collections/drivers");
const docDrivers = require("./insertions/drivers");

const collQualifyings = require("./collections/qualifyings");
const docQualifyings = require("./insertions/qualifyings");

const collRaces = require("./collections/races");
const docRaces = require("./insertions/races");

const collTracks = require("./collections/tracks");
const docTracks = require("./insertions/tracks");

mongo.connect("mongodb://localhost:27017").then(
  (client) => {
    console.log("connection success");
    let db = client.db("grandprix");

    let drivers = db.collection("drivers", collDrivers, (err) => {
      console.error(err);
    });

    drivers
      .insertMany(docDrivers, {
        ordered: true,
      })
      .then(() => {
        console.log("drivers insertion success");
      })
      .catch((err) => {
        console.error(err);
      });

    let qualifyings = db.collection("qualifyings", collQualifyings, (err) => {
      console.error(err);
    });

    qualifyings
      .insertMany(docQualifyings, {
        ordered: true,
      })
      .then(() => {
        console.log("qualifyings insertion success");
      })
      .catch((err) => {
        console.error(err);
      });

    let races = db.collection("races", collRaces, (err) => {
      console.error(err);
    });

    races
      .insertMany(docRaces, {
        ordered: true,
      })
      .then(() => {
        console.log("races insertion success");
      })
      .catch((err) => {
        console.error(err);
      });

    let tracks = db.collection("tracks", collTracks, (err) => {
      console.error(err);
    });

    tracks
      .insertMany(docTracks, {
        ordered: true,
      })
      .then(() => {
        console.log("tracks insertion success");
      })
      .catch((err) => {
        console.error(err);
      });
  },
  (err) => {
    console.error(err);
  }
);
