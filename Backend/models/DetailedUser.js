const mongoose = require("mongoose");

const DetailedUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true  },
  email: { type: String, required: true, unique: true },
  profileImage: { type: String },
  age: { type: Number },
  weight: { type: Number },
  height: { type: Number },
  systolicBP: { type: Number },
  diastolicBP: { type: Number },
  glucose: { type: String },
  geneticRiskFactor: { type: String, enum: ["Yes", "No"], default: "No" },
  allergies: { type: String },
  dailySteps: { type: Number },
});

module.exports = mongoose.model("DetailedUser", DetailedUserSchema);
