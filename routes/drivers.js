const express = require("express")
const router = express.Router()
const UserModel = require("../database/user_model")
const { authUser, authRole } = require("../basicAuth")

router.get("/", async (req, res, next) => {
  try {
    res.status(200).send(await UserModel.find({role: 'driver'}))
  } catch {
    res.status(400)
    return res.send("Unable to show drivers")
  }
})

router.get("/get/:email/find", async (req, res, next) => {
  try {
    res.status(200).send(await UserModel.findOne({ email: req.params.email }))
  } catch {
    res.status(400)
    return res.send("Unable to show drivers")
  }
})

router.put("/:id",  (req, res) => {
  UserModel.findByIdAndUpdate(
    req.params.id,
    {
      vehicleRegistration: req.body.vehicleRegistration
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

module.exports = router
