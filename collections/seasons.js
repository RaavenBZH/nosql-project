const schema = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      description: "Seasons collection",
      required: ["year", "numberOfRaces", "defendingDriverChampion", "defendingTeamChampion", "racePointsSystem", "sprintPointSystem"],
      properties: {
        _id: {
          bsonType: "objectId",
        },
        year: {
          bsonType: "int",
          description: "Year of the season, must be an integer and is required",
        },
        numberOfRaces: {
          bsonType: "int",
          description: "Number of races in the season, must be an integer and is required",
        },
        defendingDriverChampion: {
          bsonType: "string",
          description: "Defending driver champion, must be an objectId and is required",
        },
        defendingTeamChampion: {
          bsonType: "string",
          description: "Defending team champion, must be an objectId and is required",
        },
        racePointsSystem: {
          bsonType: "array",
          description: "Race points system, must be an array and is required",
          items: {
            bsonType: "int",
            description: "Points for each position, must be an integer",
          },
        },
        sprintPointSystem: {
          bsonType: "array",
          description: "Sprint points system, must be an array and is required",
          items: {
            bsonType: "int",
            description: "Points for each position, must be an integer",
          },
        },
      }
    },
  },
};