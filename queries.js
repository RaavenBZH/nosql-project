const mongo = require("mongodb").MongoClient;

// Q1
mongo.connect("mongodb://localhost:27017").then(
  (client) => {
    let db = client.db("f1");

    var count = 0;
    var memo = [];
    db.collection("races").find({}).toArray().then(
      (docs) => {
        docs.forEach((doc) => {
          var winner = doc.standings[0].driver;
          if (!memo.includes(winner)) {
            count++;
            memo.push(winner);
          }
        });
      })
    // Result
    .then(
      () => {
        console.log("Combien de pilotes différents ont gagné une course ?")
        console.log(">>> " + count);
        console.log(">>> " + memo + "\n");
      }
    );
  }
);

// Q2
mongo.connect("mongodb://localhost:27017").then(
  (client) => {
    let db = client.db("f1");

    var count = 0;
    var sum = 0;
    db.collection("tracks").find({}).toArray().then(
      (docs) => {
        count = docs.length;
        docs.forEach((doc) => {
          sum += doc.length;
        });
      })

    // Result
    .then(
      () => {
        console.log("Quelle est la longueur moyenne d'un circuit en 2022 (en mètres) ?");
        console.log(">>> " + (sum/count).toFixed(2) + "m\n");
      }
    );
  }
);

// Q3
mongo.connect("mongodb://localhost:27017").then(
  (client) => {
    let db = client.db("f1");

    var count = {};
    db.collection("qualifyings").find({}).toArray().then(
      (docs) => {
        // Count the number of pole positions for each driver
        docs.forEach((doc) => {
          var poleman = doc.standings[0].driver;
          if (count[poleman] == undefined) {
            count[poleman] = 1;
          } else {
            count[poleman]++;
          }
        });

        // Find the driver(s) with the most poless
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

        // Returns a drvier or an array of drivers (str)
        if (driver.length == 1) {
          count = driver[0];
        } else {
          count = driver;
        }
      })

    // Result
    .then(
      () => {
        console.log("Quel pilote a obtenu le plus de pôles positions (1er en qualifications) ?");
        console.log(">>> " + count);
      }
    );
  }
);

// Q4