const schema = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Sprints collection",
      required: ["year", "country", "city", "standings", "duration"],
      properties: {
        _id: {
          bsonType: "objectId",
        },
        year: {
          bsonType: "int",
          description:
            "Year of the sprint race, must be an integer and is required",
        },
        country: {
          bsonType: "string",
          description:
            "Country of the sprint race, must be a string and is required",
        },
        city: {
          bsonType: "string",
          description:
            "City of the sprint race, must be a string and is required",
        },
        standings: {
          bsonType: "array",
          description:
            "Standings of the sprint race, must be an array and is required",
          required: ["driver", "team"],
          properties: {
            driver: {
              bsonType: "string",
              description:
                "Driver of the sprint race, must be a string and is required",
            },
            team: {
              bsonType: "string",
              description:
                "Team of the sprint race, must be a string and is required",
            },
          },
        },
        duration: {
          bsonType: "int",
          description:
            "Duration of the sprint race, must be an integer and is required",
        },
      },
    },
  },
};

module.exports = schema;
