const mongo = require("mongodb").MongoClient;
const host = require("./config").influx_host;

class APISeasons {
  constructor() {
    this.host = host;

    mongo.connect(this.host).then((client) => {
      this.db = client.db("f1");
    });
  }

  highestPodiums() {
    return new Promise((resolve, reject) => {
      var count = 0;

      this.db
        .collection("races")
        .aggregate([
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
          results.forEach((result) => {
            var champion = result.theSeason[0].defendingTeamChampion;
            for (let i = 0; i < 3; i++) {
              if (result.standings[i].team == champion) {
                count++;
              }
            }
          });
        })
        .then(() => {
          console.log("fetched the number of podiums of the champion");
          resolve(">>> " + count);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  secondBest() {
    return new Promise((resolve, reject) => {
      var general_standings = {};

      this.db
        .collection("races")
        .aggregate([
          {
            $project: {
              city: 1,
              year: 1,
              standings: {
                $filter: {
                  input: "$standings",
                  as: "standing",
                  cond: { $ne: ["$$standing.team", "Red Bull"] },
                },
              },
              fastestDriver: 1,
              racePointsSystem: 1,
              sprintPointSystem: 1,
            },
          },
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
            var points_sprint = document.theSeason[0].sprintPointSystem;

            var driver;

            for (let i = 0; i < theRace.length; i++) {
              driver = theRace[i].driver;
              team = theRace[i].team;
              if (general_standings[team] == undefined)
                general_standings[team] = points_race[i];
              else general_standings[team] += points_race[i];

              if (driver == document.fastestDriver && i < 10) {
                if (general_standings[team] == undefined)
                  general_standings[team] = 1;
                else general_standings[team] += 1;
              }
            }

            if (theSprint != undefined) {
              for (let i = 0; i < theSprint.length; i++) {
                team = theSprint[i].team;
                if (general_standings[team] == undefined)
                  general_standings[team] = points_sprint[i];
                else general_standings[team] += points_sprint[i];
              }
            }
          });

          const sortedObj = Object.entries(general_standings).sort(
            ([, a], [, b]) => b - a
          );
          general_standings = Object.fromEntries(sortedObj);

          resolve(general_standings);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }
}

module.exports = new APISeasons();
