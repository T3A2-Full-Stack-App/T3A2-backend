const express = require("express")
const router = express.Router()
const UserModel = require("../database/user_model")
const { users, runs, vehicles, ROLE } = require("../data")
const { authUser, authRole } = require("../basicAuth")

router.get("/", authUser, authRole(ROLE.ADMIN), (req, res) => {
  // const drivers = users.findOne({ ROLE: ROLE.DRIVER })
  // console.log(drivers)
}
)
 


module.exports = router