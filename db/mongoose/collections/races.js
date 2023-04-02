const mongoose = require('mongoose');

const race = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  standings: {
    type: [{
      driver: {
        type: String,
        required: true,
      },
      team: {
        type: String,
        required: true,
      },
    }],
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  lapsCompleted: {
    type: Number,
    required: true,
  },
  fastestDriver: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Race', race);