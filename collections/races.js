const schema = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      description: "collection",
      required: ["country", "name", "distance"],
      properties: {
        _id: {
          bsonType: "objectId",
        },
        country: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        name: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        distance: {
          bsonType: "int",
          description: "must be an integer and is required",
        },
      },
    },
  },
};

modeules.exports = { schema: schema };
