const express = require("express")
const router = express.Router()
const UserModel = require("../database/user_model")
const { authUser, authRole } = require("../basicAuth")


// Need to add authentication here
router.get("/", setUser, authUser, authRole("admin"), async (req, res, next) => {
  try {
    res.status(200).send(await UserModel.find())
  } catch {
    res.status(400).send
  }
})

router.post("/", (req, res, next) => {
  UserModel.create(req.body, (err, doc) => {
    if (err) {
      res.status(422).send({ error: err.message })
    } else {
      res.status(201).send(doc)
    }
  })
})

router.delete("/:id", setUser, authUser, authRole("admin"), (req, res) => {
  UserModel.findByIdAndDelete(req.params.id, (err, doc) => {
    if (err) {
      res.status(400)
      return res.send("Unable to delete this user")
    } else {
      res.status(200)
      return res.send("User has been deleted")
    }
  })
})

// Remember when adding a vehicle to a user, need to add the user to the vehicle also
// As database is just referenced not embedded
router.put("/:id", setUser, authUser, authRole("admin"), (req, res) => {
  UserModel.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
      vehicle: req.body.vehicle
    },
    {new: true},
    (err, doc) => { 
      if (err) {
        res.status(400)
        return res.send("Unable to update user details")
      } else {
        res.status(200).send(doc)
      }
    })
})

function setUser(req, res, next) {
  const userId = req.body._id
  if (userId) {
    UserModel.findById(userId, (err, doc) => {
      if (err) {
        res.status(404).send({ err })
      } else {
        req.user = doc
        next()
      }
    })
  }
}


module.exports = router
