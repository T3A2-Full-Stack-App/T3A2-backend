const express = require("express")
const router = express.Router()
const VehicleModel = require("../database/vehicles_model")
const { authUser, authRole } = require("../basicAuth")
const { canViewVehicle } = require("../permissions/vehicle")


router.get('/', authUser, authRole("admin"), async (req, res) => {
    try {
        res.status(200).send(await VehicleModel.find())
    } catch {
        res.status(400)
        return res.send("Unable to display vehicles")
    }
})

router.post("/", authUser, authRole("admin"), async (req, res) => {
    // Need to construct newVehicle object so that vehicle._id != user._id
    const newVehicle = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        registration: req.body.registration,
        user: req.body.user,
        kilometers: req.body.kilometers,
        nextService: req.body.nextService
    }
    VehicleModel.create(newVehicle, (err, doc) => {
        if (err) {
            res.status(400).send(err.message)
        } else {
            res.status(201).send(doc)
        }
    })
})

router.get("/:id", setVehicle, authUser, authGetVehicle, (req, res) => {
  try {
    res.status(200).send(req.vehicle)
  } catch {
    res.status(400)
  }
})




function setVehicle(req, res, next) {
  const vehicleId = req.params.id
  if (vehicleId) {
    VehicleModel.findById(vehicleId, (err, doc) => {
      if (err) {
        res.status(404)
        return res.send({ error: err.message })
      } else {
        req.vehicle = doc
        next()
      }
    })
  }
}

function authGetVehicle(req, res, next) {
    if (!canViewVehicle(req.user, req.vehicle)) {
        res.status(401)
        return res.send('You are not authorised to view this vehicle')
    } else {
        next()
    }
}


module.exports = router