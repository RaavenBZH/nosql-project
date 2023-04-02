const schema = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Races collection",
      required: [
        "year",
        "country",
        "city",
        "standings",
        "duration",
        "lapsCompleted",
        "fastestDriver",
      ],
      properties: {
        _id: {
          bsonType: "objectId",
        },
        year: {
          bsonType: "int",
          description: "Year of the race, must be an integer and is required",
        },
        country: {
          bsonType: "string",
          description: "Country of the race, must be a string and is required",
        },
        city: {
          bsonType: "string",
          description: "City of the race, must be a string and is required",
        },
        standings: {
          bsonType: "array",
          description:
            "Standings of the qualifying, must be an array and is required",
          required: ["driver", "team"],
          properties: {
            driver: {
              bsonType: "string",
              description:
                "Driver of the qualifying, must be a string and is required",
            },
            team: {
              bsonType: "string",
              description:
                "Team of the qualifying, must be a string and is required",
            },
          },
        },
        duration: {
          bsonType: "int",
          description:
            "Duration of the race in milliseconds, must be an integer and is required",
        },
        lapsCompleted: {
          bsonType: "int",
          description:
            "Number of laps completed by the winner, must be an integer and is required",
        },
        fastestDriver: {
          bsonType: "string",
          description:
            "Name of the driver with the fastest lap, must be a string and is required",
        },
      },
    },
  },
};

module.exports = schema;
