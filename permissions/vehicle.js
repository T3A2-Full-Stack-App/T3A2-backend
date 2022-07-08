const { ROLE } = require('../data')

function canViewVehicle(user, vehicle) {
    return (
        user.role === ROLE.ADMIN || vehicle.userId === user.id
    )
}

module.exports = { canViewVehicle}