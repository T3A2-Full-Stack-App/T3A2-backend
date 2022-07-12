const UserModel = require("../database/user_model")

function canViewVehicle(user, vehicle) {
  return user.role === 'admin' || vehicle.user === user._id
}

module.exports = { canViewVehicle }
