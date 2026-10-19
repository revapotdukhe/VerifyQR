const mongoose = require("mongoose");

const certificateSchema =
new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  course: {
    type: String,
    required: true
  },

  certificateId: {
    type: String,
    required: true,
    unique: true
  },

  issueDate: {
    type: String
  },

  qrCode: {
    type: String
  }

});

module.exports =
mongoose.model(
  "Certificate",
  certificateSchema
);
