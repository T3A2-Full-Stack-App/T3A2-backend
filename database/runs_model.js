const mongoose = require("./connection");
const Schema = mongoose.Schema;

const runSchema = new mongoose.Schema({
  name: { type: String, required: true },
  area: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  comments: { type: String, required: true },
});

const RunModel = mongoose.model("Run", runSchema);

module.exports = RunModel;
