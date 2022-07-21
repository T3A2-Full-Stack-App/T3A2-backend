const mongoose = require("./connection");
const Schema = mongoose.Schema;

const runSchema = new mongoose.Schema({
  name: { type: String, required: true },
  area: { type: String, required: true },
  userEmail: { type: String },
});


const RunModel = mongoose.model("Run", runSchema);

module.exports = RunModel;
