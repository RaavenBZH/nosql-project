const schema = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      description: "Drivers collection",
      required: ["lastName", "firstName", "age", "team"],
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
        age: {
          bsonType: "int",
          description: "Age of the driver, must be an integer and is required",
        },
        team: {
          bsonType: "string",
          description: "Team of the driver, must be a string and is required",
        },
      },
    },
  },
};

module.exports = schema;
