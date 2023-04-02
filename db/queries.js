const mongo = require("mongodb").MongoClient;
console.log("Queries.js :\n\n");

////////////////////////////////////////////////////////////
// 4.1. Combien de pilotes différents ont gagné une course ?
////////////////////////////////////////////////////////////
mongo.connect("mongodb://localhost:27017").then((client) => {
  let db = client.db("f1");

  var count = 0;
  var memo = [];
  db.collection("races")
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
      console.log(
        "Q4.1 : Combien de pilotes différents ont gagné une course ?"
      );
      console.log(`>>> ${count} (${memo})`);
      console.log();
    });
});

/////////////////////////////////////////////////////////////////////////
// 4.2. Quelle est la longueur moyenne d'un circuit en 2022 (en mètres) ?
/////////////////////////////////////////////////////////////////////////
mongo.connect("mongodb://localhost:27017").then((client) => {
  let db = client.db("f1");

  var count = 0;
  var sum = 0;
  db.collection("tracks")
    .find({})
    .toArray()
    .then((docs) => {
      count = docs.length;
      docs.forEach((doc) => {
        sum += doc.length;
      });
    })
    .then(() => {
      console.log(
        "Q4.2 : Quelle est la longueur moyenne d'un circuit en 2022 (en mètres) ?"
      );
      console.log(">>> " + (sum / count).toFixed(2) + "m");
      console.log();
    });
});

/////////////////////////////////////////////////////////////////////////////////
// 4.3. Quel pilote a obtenu le plus de pôles positions (1er en qualifications) ?
/////////////////////////////////////////////////////////////////////////////////
mongo.connect("mongodb://localhost:27017").then((client) => {
  let db = client.db("f1");

  var count = {};
  db.collection("qualifyings")
    .find({})
    .toArray()
    .then((docs) => {
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
    .then(() => {
      console.log(
        "Q4.3 : Quel pilote a obtenu le plus de pôles positions (1er en qualifications) ?"
      );
      console.log(">>> " + count);
      console.log();
    });
});

/////////////////////////////////////////////////////////////
// 4.4. Combien de podiums l'équipe Ferrari a-t-elle obtenu ?
/////////////////////////////////////////////////////////////
mongo.connect("mongodb://localhost:27017").then((client) => {
  let db = client.db("f1");

  var count = 0;
  db.collection("races")
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
      console.log(
        "Q4.4 : Combien de podiums l'équipe Ferrari a-t-elle obtenu ?"
      );
      console.log(">>> " + count);
      console.log();
    });
});

//////////////////////////////////////////
// 4.5. Quel est l'âge moyen des pilotes ?
//////////////////////////////////////////
mongo.connect("mongodb://localhost:27017").then((client) => {
  let db = client.db("f1");

  var ages = [];
  db.collection("drivers")
    .find({})
    .toArray()
    .then((docs) => {
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
    .then(() => {
      console.log("Q4.5 : Quel est l'âge moyen des pilotes ?");
      console.log(
        ">>> " +
          (ages.reduce((a, b) => a + b) / ages.length).toFixed(2) +
          " ans"
      );
      console.log();
    });
});

////////////////////////////////////////////////////////
// 5.1. Modifier les données pour que l'année soit 2021.
////////////////////////////////////////////////////////
mongo
  .connect("mongodb://localhost:27017")
  .then((client) => {
    let db = client.db("f1");

    db.collection("qualifyings").updateMany(
      { year: 2022 },
      { $set: { year: 2021 } }
    );

    db.collection("races").updateMany({ year: 2022 }, { $set: { year: 2021 } });
    db.collection("sprints").updateMany(
      { year: 2022 },
      { $set: { year: 2021 } }
    );
    db.collection("seasons").updateMany(
      { year: 2022 },
      { $set: { year: 2021 } }
    );
  })
  .then(() => {
    console.log("Q5.1 : Modification des données pour que l'année soit 2021");
    console.log(">>> Done");
    console.log();
  });

/////////////////////////////////////////////////////////////
// 5.2. Échanger l'équipe des pilotes Hamilton et Verstappen.
/////////////////////////////////////////////////////////////
mongo
  .connect("mongodb://localhost:27017")
  .then((client) => {
    let db = client.db("f1");

    var hamiltonTeam = "";
    var verstappenTeam = "";
    db.collection("drivers")
      .find({ lastName: { $in: ["Hamilton", "Verstappen"] } })
      .toArray()
      .then((docs) => {
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
      })
      .then(() => {
        var collections = ["races", "qualifyings", "sprints"];

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

        var collections = ["races", "qualifyings", "sprints"];
        collections.forEach((collection) => {
          db.collection(collection).updateMany(
            { "standings.driver": "Hamilton" },
            { $set: { "standings.$.team": verstappenTeam } }
          );
        });
      });
  })
  .then(() => {
    console.log("Q5.2 : Échanger l'équipe des pilotes Hamilton et Verstappen.");
    console.log(">>> Done");
    console.log();
  });

///////////////////////////////////////////////////////////////////
// 5.3. Déclasser Carlos Sainz de 5 places pour la course de Miami.
///////////////////////////////////////////////////////////////////
mongo
  .connect("mongodb://localhost:27017")
  .then((client) => {
    let db = client.db("f1");

    var classement;
    db.collection("races")
      .find({ city: "Miami" })
      .toArray()
      .then((docs) => {
        // Récupération du classement de la course et changement des positions
        classement = docs[0].standings;
        for (let i = 0; i < classement.length; i++) {
          pilote = classement[i].driver;
          if (pilote == "Sainz") {
            var j = i;
            while (j + 1 < classement.length && j < i + 5) {
              var tmp = classement[j];
              classement[j] = classement[j + 1];
              classement[j + 1] = tmp;
              j++;
            }
            break;
          }
        }
      })
      .then(() => {
        // Enregistrement du nouveau classement
        db.collection("races").updateOne(
          { city: "Miami" },
          {
            $set: { standings: classement },
          }
        );
      });
  })
  .then(() => {
    console.log(
      "Q5.3 : Déclasser Carlos Sainz de 5 places pour la course de Miami."
    );
    console.log(">>> Done");
    console.log();
  });

///////////////////////////////////////////////////////////////////////////////////////
// 5.4. Supprimer les Grand Prix dont les pays sont représentés par plusieurs circuits.
///////////////////////////////////////////////////////////////////////////////////////
mongo
  .connect("mongodb://localhost:27017")
  .then((client) => {
    let db = client.db("f1");

    collections = ["tracks", "qualifyings", "sprints", "races"];
    pays = [];
    non_uniques = [];

    // Rechercher les pays accueillant plusieurs circuits
    db.collection("tracks")
      .find()
      .toArray()
      .then((docs) => {
        docs.forEach((doc) => {
          if (pays.includes(doc.country)) {
            non_uniques.push(doc.country);
            console.log("[++] " + doc.country);
          } else {
            pays.push(doc.country);
            console.log("[+] " + doc.country);
          }
        });
      })
      .then(() => {
        collections.forEach((collection) => {
          console.log("Collection : " + collection);
          non_uniques.forEach((pays) => {
            db.collection(collection).deleteMany({ country: pays });
          });
        });
      });
  })
  .then(() => {
    console.log(
      "Q5.4 : Supprimer les Grand Prix dont les pays sont représentés par plusieurs circuits."
    );
    console.log(">>> Done");
    console.log();
  });

/////////////////////////////////////////////////////////
// 5.5. Échanger les positions des coéquipiers en sprint.
/////////////////////////////////////////////////////////
mongo
  .connect("mongodb://localhost:27017")
  .then((client) => {
    let db = client.db("f1");

    var positions;
    db.collection("sprints")
      .find()
      .toArray()
      .then((docs) => {
        docs.forEach((doc) => {
          positions = {};
          var classement = doc.standings;
          console.log("1", doc.city, classement);

          for (let i = 0; i < classement.length; i++) {
            var line = classement[i];
            if (positions[line.team] === undefined) {
              positions[line.team] = i;
            } else {
              var tmp = classement[positions[line.team]];
              classement[positions[line.team]] = classement[i];
              classement[i] = tmp;
            }
          }
          console.log("2", doc.city, classement);
          db.collection("sprints").updateOne(
            { _id: doc._id },
            { $set: { standings: classement } }
          );
        });
      });
  })
  .then(() => {
    console.log("Q5.5 : Échanger les positions des coéquipiers en sprint.");
    console.log(">>> Done");
    console.log();
  });

///////////////////////////////////////////////////////////////////////////
// 6.1. Combien de podiums le champion en titre par équipes a-t-il obtenu ?
///////////////////////////////////////////////////////////////////////////
mongo.connect("mongodb://localhost:27017").then((client) => {
  let db = client.db("f1");

  var count = 0;
  db.collection("races")
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
      console.log(
        "Q6.1 : Combien de podiums le champion en titre par équipes a-t-il obtenu ?"
      );
      console.log(">>> " + count + " podiums");
      console.log();
    });
});

/////////////////////////////////////////////////////////////////////////////////
// 6.2. Sur quel circuit la vitesse moyenne était-elle la plus élevée en course ?
/////////////////////////////////////////////////////////////////////////////////
mongo.connect("mongodb://localhost:27017").then((client) => {
  let db = client.db("f1");

  db.collection("races")
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
        let dist = (result.theTrack[0]["length"] * result.lapsCompleted) / 1000;

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

      console.log(
        "Q6.2 : Sur quel circuit la vitesse moyenne était-elle la plus élevée en course ?"
      );
      console.log(
        ">>> " +
          best.country +
          ", " +
          best.city +
          " at " +
          best.speed.toFixed(2) +
          " km/h"
      );
      console.log();
    })
    .catch((err) => console.error(err));
});

///////////////////////////////////////////////////////////////////////////////////////
// 6.3. Qui a gagné le plus de postions entre la qualification et la course en France ?
///////////////////////////////////////////////////////////////////////////////////////
mongo.connect("mongodb://localhost:27017").then((client) => {
  let db = client.db("f1");

  var max = 0;
  var pilotes = [];
  db.collection("races")
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
      console.log(
        "Q6.3 : Qui a gagné le plus de positions entre la qualification et la course en France ?"
      );
      console.log(
        `>>> ${pilotes} a/ont gagné ${max} postions entre la qualification et la course.`
      );
      console.log();
    });
});

///////////////////////////////////////////////////////////
// 6.4. Quel est le classement du championnat des pilotes ?
///////////////////////////////////////////////////////////
mongo.connect("mongodb://localhost:27017").then((client) => {
  let db = client.db("f1");

  var general_standings = {};

  db.collection("races")
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
        /*
         The drivers from the top 10 are awarded some points according to the points system.
         The driver who set the fastest lap is awarded 1 point if he is in the top 10.
        */
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

        /*
          The drivers from the top 8 are awarded some points according to the points system.
        */
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

      console.log("6.4. Quel est le classement du championnat des pilotes ?");
      console.log(
        ">>> Le classement du championnat des pilotes est le suivant :"
      );
      console.log(general_standings);
      console.log();
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 6.5. Si l'équipe Red Bull était déclassée de toutes les sessions, qui aurait gagné le championnat par équipe ?
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
mongo.connect("mongodb://localhost:27017").then((client) => {
  let db = client.db("f1");

  var general_standings = {};

  db.collection("races")
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
          sprintPointsSystem: 1,
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
        var points_sprint = document.theSeason[0].sprintPointsSystem;

        var driver;
        /*
         The drivers from the top 10 are awarded some points according to the points system.
         The driver who set the fastest lap is awarded 1 point if he is in the top 10.
        */
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

        /*
          The drivers from the top 8 are awarded some points according to the points system.
        */
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

      console.log(
        "6.5. Si l'équipe Red Bull était déclassée de toutes les sessions, qui aurait gagné le championnat par équipe ?"
      );
      console.log(
        ">>> Le classement du championnat par équipe serait le suivant :"
      );
      console.log(general_standings);
      console.log();
    });
});
