const mongo = require("mongodb").MongoClient;
const host = require("./config").influx_host;

class APIDrivers {
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
          console.log("fetched best pilot from collection: drivers");
          resolve(count);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  avgAge() {
    return new Promise((resolve, reject) => {
      var ages = [];

      this.db
        .collection("drivers")
        .find({})
        .toArray()
        .then((docs) => {
          docs.forEach((doc) => {
            var birthdate = doc.birthdate.split("-");
            var date = new Date(birthdate[2], birthdate[1] - 1, birthdate[0]);

            var diff = Date.now() - date.getTime();
            var age_date = new Date(diff);
            var age = Math.abs(age_date.getUTCFullYear() - 1970);

            ages.push(age);
          });
        })
        .then(() => {
          console.log("fetched avg age from collection: drivers");
          resolve((ages.reduce((a, b) => a + b) / ages.length).toFixed(2));
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }
}

module.exports = new APIDrivers();
