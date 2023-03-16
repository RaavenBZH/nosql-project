const schema = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      description: "Drivers collection",
      required: ["lastName", "firstName", "age"],
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
        birthdate: {
          bsonType: "date",
          description:
            "Birthdate of the driver, must be a date and is required", // format DD-MM-YYYY
        }
      },
    },
  },
};

module.exports = schema;
