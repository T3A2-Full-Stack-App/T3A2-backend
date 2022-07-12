const mongoose = require('./connection')
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true },
  vehicle: {type: Schema.Types.ObjectId, ref: "Vehicle"}
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel