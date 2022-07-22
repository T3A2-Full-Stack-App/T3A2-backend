const mongoose = require('./connection')
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true, minlength: 5 },
  role: { type: String, required: true },
  vehicleRegistration: { type: String, default: "No vehicle assigned"},
  runName: { type: String, default: "No run assigned" },
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel