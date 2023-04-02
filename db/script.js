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
    db.createCollection("drivers", collDrivers)
      .then((drivers) => {
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
      })
      .catch((err) => {
        console.error(err);
      });

    // qualifyings
    db.createCollection("qualifyings", collQualifyings)
      .then((qualifyings) => {
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
      })
      .catch((err) => {
        console.error(err);
      });

    // races
    db.createCollection("races", collRaces)
      .then((races) => {
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
      })
      .catch((err) => {
        console.error(err);
      });

    // seasons
    db.createCollection("seasons", collSeasons)
      .then((seasons) => {
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
      })
      .catch((err) => {
        console.error(err);
      });

    // sprints
    db.createCollection("sprints", collSprints)
      .then((sprints) => {
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
      })
      .catch((err) => {
        console.error(err);
      });

    // tracks
    db.createCollection("tracks", collTracks)
      .then((tracks) => {
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
      })
      .catch((err) => {
        console.error(err);
      });
  },
  (err) => {
    console.error(err);
  }
);
