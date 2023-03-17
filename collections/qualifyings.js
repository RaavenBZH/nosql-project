const schema = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      description: "Qualifyings collection",
      required: ["year", "country", "city", "standings", "poleLap"],
      properties: {
        _id: {
          bsonType: "objectId",
        },
        year: {
          bsonType: "int",
          description:
            "Year of the qualifying, must be an integer and is required",
        },
        country: {
          bsonType: "string",
          description:
            "Country of the qualifying, must be a string and is required",
        },
        city: {
          bsonType: "string",
          description:
            "City of the qualifying, must be a string and is required",
        },
        standings: {
          bsonType: "object",
          description:
            "Standings of the qualifying, must be an array and is required",
          required: ["driver", "team"],
          properties: {
            name: {
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
        poleLap: {
          bsonType: "int",
          description:
            "Time of the pole lap in miliseconds, must be an integer and is required",
        },
      },
    },
  },
};

module.exports = schema;
