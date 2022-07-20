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

module.exports = router
