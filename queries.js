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
          console.log("Q1 : Combien de pilotes différents ont gagné une course ?");
          console.log(`>>> ${count} (${memo})`);
          console.log();
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
          console.log("Q2 : Quelle est la longueur moyenne d'un circuit en 2022 (en mètres) ?");
          console.log(">>> " + (sum / count).toFixed(2) + "m");
          console.log();
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
          console.log("Q3 : Quel pilote a obtenu le plus de pôles positions (1er en qualifications) ?");
          console.log(">>> " + count);
          console.log();
        }
      );
  }
);

// Q4
mongo.connect("mongodb://localhost:27017").then(
  (client) => {
    let db = client.db("f1");

    var count = 0;
    db.collection('races').find({}).toArray().then(
      (docs) => {
        docs.forEach((doc) => {
          var podium = doc.standings.slice(0, 3);
          podium.forEach((driver) => {
            if (driver.team == "Ferrari") {
              count++;
            }
          });
        });
      })

      // Result
      .then(
        () => {
          console.log("Q4 : Combien de podiums l'équipe Ferrari a-t-elle obtenu ?");
          console.log(">>> " + count);
          console.log();
        }
      );
  }
);

// Q5
mongo.connect("mongodb://localhost:27017").then(
  (client) => {
    let db = client.db("f1");

    var ages = [];
    db.collection('drivers').find({}).toArray().then(
      (docs) => {
        docs.forEach((doc) => {
          // traite la date de naissance
          var birthdate = doc.birthdate.split("-");
          var date = new Date(birthdate[2], birthdate[1] - 1, birthdate[0]);

          // calcule l'âge
          var diff = Date.now() - date.getTime();
          var age_date = new Date(diff);
          var age = Math.abs(age_date.getUTCFullYear() - 1970);

          ages.push(age);
        });
      })

      // Result
      .then(
        () => {
          console.log("Q5 : Quel est l'âge moyen des pilotes ?");
          console.log(">>> " + (ages.reduce((a, b) => a + b) / ages.length).toFixed(2) + " ans");
        }
      );
  }
);

// Q6 : Modifier les données pour que l'année soit 2021
mongo.connect("mongodb://localhost:27017").then(
  (client) => {
    let db = client.db("f1");

    db.collection("qualifyings").updateMany(
      { year: 2022 },
      { $set: { year: 2021 } }
    );

    db.collection("races").updateMany(
      { year: 2022 },
      { $set: { year: 2021 } }
    );

    db.collection("sprints").updateMany(
      { year: 2022 },
      { $set: { year: 2021 } }
    );

    db.collection("seasons").updateMany(
      { year: 2022 },
      { $set: { year: 2021 } }
    );

    console.log("Q6 : Modification des données pour que l'année soit 2021");
  }
);

// Q7 : Échanger l'équipe des pilotes Hamilton et Verstappen. // NE FONCTIONNE PAS
mongo.connect("mongodb://localhost:27017").then(
  (client) => {
    let db = client.db("f1");

    var hamiltonTeam = "";
    var verstappenTeam = "";
    db.collection("drivers").find(
      { lastName: { $in: ["Hamilton", "Verstappen"] } }
    ).toArray().then(
      (docs) => {
        var h = "";
        var v = "";
        docs.forEach((doc) => {
          if (doc.lastName == "Hamilton") {
            h = doc.team;
          } else {
            v = doc.team;
          }
        });
        hamiltonTeam = h;
        verstappenTeam = v;
      }
    )
      .then(() => {

        var collections = ["races", "qualifyings", "sprints"]

        // Verstappen -> Hamilton
        db.collection("drivers").updateOne(
          { lastName: "Verstappen" },
          { $set: { team: hamiltonTeam } }
        );

        collections.forEach((collection) => {
          db.collection(collection).updateMany(
            { "standings.driver": "Verstappen" },
            { $set: { "standings.$.team": hamiltonTeam } }
          );
        });

        // Hamilton -> Verstappen

        db.collection("drivers").updateMany(
          { lastName: "Hamilton" },
          { $set: { team: verstappenTeam } }
        );

        var collections = ["races", "qualifyings", "sprints"]
        collections.forEach((collection) => {
          db.collection(collection).updateMany(
            { "standings.driver": "Hamilton" },
            { $set: { "standings.$.team": verstappenTeam } }
          );
        });
      })
  }
);