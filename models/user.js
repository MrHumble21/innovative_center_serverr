const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  passport_number: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: String,
    required: true,
  },
  exam_date: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  is_paid: {
    type: Boolean,
    required: true,
    default: false,
  },
  exam_type: {
    type: String,
    required: true,
  },
});

exports.UserSchema = UserSchema;
