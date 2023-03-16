const schema = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      description: "Races collection",
      required: ["year", "country", "city", "standings", "duration"],
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
            "Standings of the race, must be an array and is required",
          items: {
            bsonType: "string",
            description: "Name of the driver, must be a string and is required",
          },
        },
        duration: {
          bsonType: "int",
          description:
            "Duration of the race in minutes, must be an integer and is required",
        },
      },
    },
  },
};

module.exports = schema;
