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
      },
    },
  },
};

modeules.exports = { schema: schema };
