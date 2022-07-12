const express = require("express")
const router = express.Router()
const UserModel = require("../database/user_model")
const { authUser, authRole } = require("../basicAuth")

router.get("/", authUser, authRole("admin"), async (req, res, next) => {
  try {
    res.status(200).send(await UserModel.find())
  } catch {
    res.status(400).send
  }
})

module.exports = router
