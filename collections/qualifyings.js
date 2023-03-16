const schema = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      description: "Qualifyings collection",
      required: ["year", "country", "city", "standings", "fastestLap"],
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
          bsonType: "array",
          description:
            "Standings of the qualifying, must be an array and is required",
          items: {
            bsonType: "string",
            description: "Name of the driver, must be a string and is required",
          },
        },
        fastestLap: {
          bsonType: "int",
          description:
            "Time of the fastest lap in seconds, must be an integer and is required",
        },
      },
    },
  },
};

modeules.exports = schema;
