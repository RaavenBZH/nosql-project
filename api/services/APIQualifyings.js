const mongo = require("mongodb").MongoClient;
const host = require("./config").influx_host;

class APIQualifyings {
  constructor() {
    this.host = host;

    mongo.connect(this.host).then((client) => {
      this.db = client.db("f1");
    });
  }

  bestPilot() {
    return new Promise((resolve, reject) => {
      var max = 0;
      var pilotes = [];

      this.db
        .collection("races")
        .aggregate([
          {
            $match: {
              city: "Le Castellet",
            },
          },
          {
            $lookup: {
              from: "qualifyings",
              localField: "city",
              foreignField: "city",
              as: "theQuali",
            },
          },
        ])
        .toArray()
        .then((result) => {
          var qualif = result[0].theQuali[0].standings;
          var course = result[0].standings;
          var pilote;

          for (var i = 0; i < qualif.length; i++) {
            pilote = qualif[i].driver;
            for (var j = 0; j < course.length; j++) {
              if (course[j].driver == pilote) {
                if (i - j > max) {
                  max = i - j;
                  pilotes = [];
                  pilotes.push(pilote);
                } else {
                  if (i - j == max) {
                    pilotes.push(pilote);
                  }
                }
              }
            }
          }
          if (pilotes.length == 1) {
            pilotes = pilotes[0];
          }
        })
        .then(() => {
          console.log("fetched the pilot(s) who gained the most positions");
          resolve(
            `>>> ${pilotes} a/ont gagné ${max} postions entre la qualification et la course.`
          );
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  leaderboard() {
    return new Promise((resolve, reject) => {
      var general_standings = {};

      this.db
        .collection("races")
        .aggregate([
          {
            $lookup: {
              from: "sprints",
              localField: "city",
              foreignField: "city",
              as: "theSprint",
            },
          },
          {
            $lookup: {
              from: "seasons",
              localField: "year",
              foreignField: "year",
              as: "theSeason",
            },
          },
        ])
        .toArray()
        .then((results) => {
          results.forEach((document) => {
            var theRace = document.standings;
            var theSprint = document.theSprint[0];
            if (theSprint != undefined) theSprint = theSprint.standings;

            var points_race = document.theSeason[0].racePointsSystem;
            var points_sprint = document.theSeason[0].sprintPointsSystem;

            var driver;

            for (let i = 0; i < theRace.length; i++) {
              driver = theRace[i].driver;
              if (general_standings[driver] == undefined)
                general_standings[driver] = points_race[i];
              else general_standings[driver] += points_race[i];

              if (driver == document.fastestDriver && i < 10) {
                if (general_standings[driver] == undefined)
                  general_standings[driver] = 1;
                else general_standings[driver] += 1;
              }
            }

            if (theSprint != undefined) {
              for (let i = 0; i < theSprint.length; i++) {
                driver = theSprint[i].driver;
                if (general_standings[driver] == undefined)
                  general_standings[driver] = points_sprint[i];
                else general_standings[driver] += points_sprint[i];
              }
            }
          });

          const sortedObj = Object.entries(general_standings).sort(
            ([, a], [, b]) => b - a
          );
          general_standings = Object.fromEntries(sortedObj);

          console.log("fetched the general leaderboard");
          resolve(general_standings);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }
}

module.exports = new APIQualifyings();
