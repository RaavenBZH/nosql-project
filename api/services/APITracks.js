const mongo = require("mongodb").MongoClient;
const host = require("./config").influx_host;

class APITracks {
  constructor() {
    this.host = host;

    mongo.connect(this.host).then((client) => {
      this.db = client.db("f1");
    });
  }

  highestSpeed() {
    return new Promise((resolve, reject) => {
      this.db
        .collection("races")
        .aggregate([
          {
            $lookup: {
              from: "tracks",
              localField: "city",
              foreignField: "city",
              as: "theTrack",
            },
          },
        ])
        .toArray()
        .then((results) => {
          let arr = [];

          results.forEach((result) => {
            let country = result.country;
            let city = result.city;
            let duration = result.duration / 3600000;
            let dist =
              (result.theTrack[0]["length"] * result.lapsCompleted) / 1000;

            arr.push({
              country: country,
              city: city,
              duration: duration,
              distance: dist,
              speed: dist / duration,
            });
          });

          let best = arr[0];

          arr.forEach((item) => {
            if (item.speed > best.speed) {
              best = item;
            }
          });

          console.log("fetched highest speed from collection: tracks");
          resolve(
            `${best.country}, ${best.city} at ${best.speed.toFixed(2)} km/h.`
          );
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  avgTrack() {
    return new Promise((resolve, reject) => {
      var count = 0;
      var sum = 0;

      this.db
        .collection("tracks")
        .find({})
        .toArray()
        .then((docs) => {
          count = docs.length;
          docs.forEach((doc) => {
            sum += doc.length;
          });
        })
        .then(() => {
          console.log("fetched avg track length from collection: tracks");
          resolve(
            `La longueur moyenne d'un circuit est de ${(sum / count).toFixed(
              2
            )}.`
          );
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }
}

module.exports = new APITracks();
