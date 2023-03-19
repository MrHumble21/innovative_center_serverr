const mongoose = require("mongoose");
const { ExamSchema } = require("../models/exam");
const { IeltsUserSchema } = require("../models/ielts_user");
const { UserSchema } = require("../models/user");

const connectionString ='mongodb://localhost:27017/innovative'
  // "mongodb+srv://armeumhumble:tel5850789@cluster0.f0oelew.mongodb.net/?retryWrites=true&w=majority&wtimeoutMS=100000";

mongoose.set("strictQuery", false);
mongoose.connect(connectionString);

const User = mongoose.model("User", UserSchema);
const Exam = mongoose.model("Exam", ExamSchema);
const IeltsUser = mongoose.model("IeltsUser", IeltsUserSchema);

exports.ExamSchema = Exam;
exports.UserSchema = User;
exports.IeltsUserSchema = IeltsUser;
exports.connectionString = connectionString;
