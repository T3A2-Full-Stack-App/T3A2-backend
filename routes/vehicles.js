const express = require("express")
const router = express.Router()
const VehicleModel = require("../database/vehicles_model")
const { authUser, authRole } = require("../basicAuth")
const { canViewVehicle } = require("../permissions/vehicle")
const { difference } = require("underscore")

router.get("/", async (req, res) => {
  try {
    res.status(200).send(await VehicleModel.find())
  } catch {
    res.status(400)
    return res.send("Unable to display vehicles")
  }
})

router.post("/",  async (req, res) => {

  function difference(nextService, kilometers)
    {return nextService - kilometers}

  const newVehicle = {
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    registration: req.body.registration,
    user: req.body.user,
    kilometers: req.body.kilometers,
    nextService: req.body.nextService,
    kmRemaining: difference(parseInt(req.body.nextService), parseInt(req.body.kilometers)),
    condition: req.body.condition
  }
  VehicleModel.create(newVehicle, (err, doc) => {
    if (err) {
        res.status(400)
        return res.send(err.message)
    } else {
      res.status(201).send(doc)
    }
  })
})

router.get("/:registration", async (req, res) => {
  try {
    res
      .status(200)
      .send(
        await VehicleModel.findOne({ registration: req.params.registration })
      )
  } catch {
    res.status(400)
    return res.send("Unable to display vehicles")
  }
})

router.put("/:registration", (req, res) => {

  function difference(nextService, kilometers) {
    return nextService - kilometers
  }

  VehicleModel.findOneAndUpdate(
    { registration: req.params.registration },
    {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      registration: req.body.registration,
      kilometers: req.body.kilometers,
      nextService: req.body.nextService,
      kmRemaining: difference(req.body.nextService, req.body.kilometers),
      condition: req.body.condition,
    },
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(400).send
      } else {
        res.status(200).send(doc)
      }
    }
  )
})

router.put("/driver/:registration", (req, res) => {
  function difference(nextService, kilometers) {
    return nextService - kilometers
  }

  VehicleModel.findOneAndUpdate(
    { registration: req.params.registration },
    {
      kilometers: req.body.kilometers,
      nextService: req.body.nextService,
      kmRemaining: difference(req.body.nextService, req.body.kilometers),
    },
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(400).send
      } else {
        res.status(200).send(doc)
      }
    }
  )
})

router.put("/condition/:registration", (req, res) => {
  VehicleModel.findOneAndUpdate(
    { registration: req.params.registration },
    {
      condition: req.body.condition,
    },
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(400).send
      } else {
        res.status(200).send(doc)
      }
    }
  )
})

router.put("/assigndriver/:registration", (req, res) => {

  VehicleModel.findOneAndUpdate(
    { registration: req.params.registration },
    {
      driverEmail: req.body.driverEmail,
    },
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(400).send
      } else {
        res.status(200).send(doc)
      }
    }
  )
})




router.delete("/:id", setVehicle,  (req, res) => {
    VehicleModel.deleteOne(req.vehicle, (err, doc) => {
        if (err) {
            res.status(400)
            return res.send('Unable to delete vehicle')
        } else {
            res.status(200)
            return res.send('Deleted vehicle')
        }
    })
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
    return res.send("You are not authorised to view this vehicle")
  } else {
    next()
  }
}

module.exports = router
