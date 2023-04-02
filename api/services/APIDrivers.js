const mongo = require("mongodb").MongoClient;
const host = require("./config").influx_host;

class APIDrivers {
  constructor() {
    this.host = host;

    mongo.connect(this.host).then((client) => {
      this.db = client.db("f1");
    });
  }

  pilots() {
    return new Promise((resolve, reject) => {
      var count = 0;
      var memo = [];

      this.db
        .collection("races")
        .find({})
        .toArray()
        .then((docs) => {
          docs.forEach((doc) => {
            var winner = doc.standings[0].driver;
            if (!memo.includes(winner)) {
              count++;
              memo.push(winner);
            }
          });
        })
        .then(() => {
          console.log("fetched the winning pilots");
          resolve(
            `Les pilotes ayant gagné une course sont au nombre de ${count} (${memo}).`
          );
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
          console.log("fetched the average age of the pilots");
          resolve(
            `La moyenne d'âge parmi les pilotes est de ${(
              ages.reduce((a, b) => a + b) / ages.length
            ).toFixed(2)} ans.`
          );
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }
}

module.exports = new APIDrivers();
