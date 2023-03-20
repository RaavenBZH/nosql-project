const schema = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      description: "Drivers collection",
      required: ["lastName", "firstName", "team", "birthdate"],
      properties: {
        _id: {
          bsonType: "objectId",
        },
        lastName: {
          bsonType: "string",
          description:
            "Last name of the driver, must be a string and is required",
        },
        firstName: {
          bsonType: "string",
          description:
            "First name of the driver, must be a string and is required",
        },
        team: {
          bsonType: "string",
          description:
            "Team of the driver, must be an objectId and is required",
        },
        birthdate: {
          bsonType: "date",
          description:
            "Birthdate of the driver, must be a date and is required",
        }
      },
    },
  },
};

module.exports = schema;
