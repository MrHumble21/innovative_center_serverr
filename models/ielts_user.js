const mongoose = require("mongoose");
const { Schema } = mongoose;

const IeltsUserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  is_paid: {
    type: Boolean,
    required: true,
    default: false,
  },
  exam_date:{
    type: String,
    required: true,
  },

  exam_type: {
    type: String,
    required: true,
    default: "IELTS Mock",
  },
});

exports.IeltsUserSchema = IeltsUserSchema;
