const schema = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      description: "Tracks collection",
      required: ["country", "city", "length"],
      properties: {
        _id: {
          bsonType: "objectId",
        },
        country: {
          bsonType: "string",
          description: "Country of the track, must be a string and is required",
        },
        city: {
          bsonType: "string",
          description: "City of the track, must be a string and is required",
        },
        length: {
          bsonType: "int",
          description:
            "Length of the track in meters, must be an integer and is required",
        },
      },
    },
  },
};

module.exports = schema;
