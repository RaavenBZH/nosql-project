const mongo = require("mongodb").MongoClient;
const host = require("./config").influx_host;

class APIRaces {
  constructor() {
    this.host = host;

    mongo.connect(this.host).then((client) => {
      this.db = client.db("f1");
    });
  }

  bestPilot() {
    return new Promise((resolve, reject) => {
      var count = {};

      this.db
        .collection("qualifyings")
        .find({})
        .toArray()
        .then((docs) => {
          docs.forEach((doc) => {
            var poleman = doc.standings[0].driver;
            if (count[poleman] == undefined) {
              count[poleman] = 1;
            } else {
              count[poleman]++;
            }
          });

          var max = 0;
          var driver = [];
          for (var key in count) {
            if (count[key] > max) {
              max = count[key];
              driver = [key];
            } else if (count[key] == max) {
              driver.push(key);
            }
          }

          if (driver.length == 1) {
            count = driver[0];
          } else {
            count = driver;
          }
        })
        .then(() => {
          console.log("fetched the pilot with the most pole positions");
          resolve(`${count} a gagné le plus de pole positions`);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  podiumsFerrari() {
    return new Promise((resolve, reject) => {
      var count = 0;

      this.db
        .collection("races")
        .find({})
        .toArray()
        .then((docs) => {
          docs.forEach((doc) => {
            var podium = doc.standings.slice(0, 3);
            podium.forEach((driver) => {
              if (driver.team == "Ferrari") {
                count++;
              }
            });
          });
        })
        .then(() => {
          console.log("fetched the number of podiums of team Ferrari");
          resolve(`L'équipe Ferrari a obtenu un total de ${count} podiums`);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }
}

module.exports = new APIRaces();
