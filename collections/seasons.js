const schema = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      description: "Seasons collection",
      required: ["year", "numberOfRaces", "previousDriverChampion", "previousTeamChampion"],
      properties: {
        _id: {
          bsonType: "objectId",
        },
        year: {
          bsonType: "int",
          description:
            "Year of the season, must be an integer and is required",
        },
        numberOfRaces: {
          bsonType: "int",
          description:
            "Number of races of the season, must be an integer and is required",
        },
        previousDriverChampion: {
          bsonType: "string",
          description: "Name of the previous driver champion, must be a string and is required",
        },
        previousTeamChampion: {
          bsonType: "string",
          description: "Name of the previous team champion, must be a string and is required",
        },
      },
    },
  },
};

module.exports = schema;