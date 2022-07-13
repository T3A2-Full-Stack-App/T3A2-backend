const UserModel = require("../database/user_model")

function canViewVehicle(user, vehicle) {
  return JSON.stringify(vehicle.user) == JSON.stringify(user._id) || user.role === 'admin'
}

module.exports = { canViewVehicle }
