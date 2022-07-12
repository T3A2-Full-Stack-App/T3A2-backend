const UserModel = require("../database/user_model")

function canViewRun(user, run) {
  return user.role === 'admin' || run.user === user._id
}

module.exports = { canViewRun }
