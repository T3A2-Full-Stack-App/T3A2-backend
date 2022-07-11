const mongoose = require('./connection')

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true },
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel