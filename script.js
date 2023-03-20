const mongo = require("mongodb").MongoClient;

const collDrivers = require("./collections/drivers");
const docDrivers = require("./insertions/drivers");

const collQualifyings = require("./collections/qualifyings");
const docQualifyings = require("./insertions/qualifyings");

const collRaces = require("./collections/races");
const docRaces = require("./insertions/races");

const collSeasons = require("./collections/seasons");
const docSeasons = require("./insertions/seasons");

const collSprints = require("./collections/sprints");
const docSprints = require("./insertions/sprints");

const collTracks = require("./collections/tracks");
const docTracks = require("./insertions/tracks");

// Collection creation and data insertion
mongo.connect("mongodb://localhost:27017").then(
  (client) => {
    console.log("connection success");
    let db = client.db("f1");

    // drivers
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


    // qualifyings
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

    // races
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

    // seasons
    let seasons = db.collection("seasons", collSeasons, (err) => {
      console.error(err);
    });

    seasons
      .insertMany(docSeasons, {
        ordered: true,
      })
      .then(() => {
        console.log("seasons insertion success");
      })
      .catch((err) => {
        console.error(err);
      });

    // sprints
    let sprints = db.collection("sprints", collSprints, (err) => {
      console.error(err);
    });

    sprints
      .insertMany(docSprints, {
        ordered: true,
      })
      .then(() => {
        console.log("sprints insertion success");
      })
      .catch((err) => {
        console.error(err);
      });

    // tracks
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
)