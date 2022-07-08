const { ROLE } = require("../data")

function canViewRun(user, run) {
  return ( user.role === ROLE.ADMIN || run.userId === user.id )
}

module.exports = { canViewRun }
