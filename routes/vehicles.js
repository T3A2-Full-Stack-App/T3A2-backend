const express = require("express")
const router = express.Router()
const { vehicles, users, ROLE } = require("../data")
const { authUser, authRole } = require("../basicAuth")
const { canViewVehicle } = require("../permissions/vehicle")


router.get('/', authUser, authRole(ROLE.ADMIN), (req, res, next) => {
    res.json(vehicles)
})

router.get('/:vehicleId', setVehicle, authUser, authGetVehicle, (req, res, next) => {
    res.json(req.vehicle)
})


function setVehicle(req, res, next) {
    const vehicleId = parseInt(req.params.vehicleId)
    req.vehicle = vehicles.find(vehicle => vehicle.id === vehicleId)

    if (req.vehicle == null) {
        res.status(404)
        return res.send("Vehicle could not be found")
    }
    next()
}

function authGetVehicle(req, res, next) {
    if (!canViewVehicle(req.user, req.vehicle)) {
        res.status(401)
        return res.send('You are not authorised to view this vehicle')
    }
    next()
}


module.exports = router