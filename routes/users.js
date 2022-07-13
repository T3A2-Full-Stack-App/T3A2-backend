const express = require("express")
const router = express.Router()
const UserModel = require("../database/user_model")
const { authUser, auth, authRole } = require("../basicAuth")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()



// Registration
router.post("/register", async (req, res, next) => {
  try {
    let { email, password, passwordCheck, firstName, lastName, role } = req.body
    if (!email || !password || !passwordCheck) {
      return res.status(400).send("Must fill all fields to create an account")
    }
    if (password.length < 5) {
      return res.status(400).send("Password must be at least 5 characters")
    } if (password !== passwordCheck) {
      return res.status(400).send("Passwords must be the same")
    }
    const existingUser = await UserModel.findOne({ email: email })
    if (existingUser) {
      return res.status(400).send("An account with this email already exists")
    }
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)
    const newUser = new UserModel({ email, password: passwordHash, firstName, lastName, role })
    const savedUser = await newUser.save()
    res.json(savedUser)
  } catch (err) {
    res.status(500).json({error: err.message})
  }
})


// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    // validate
    if (!email || !password)
      return res.status(400).send("Not all fields have been entered")
    const user = await UserModel.findOne({ email: email })
    if (!user) return res.status(400).send("There is no account registered with this email")
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).send("Password is incorrect")
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({
      token,
      user: { id: user._id, email: user.email },
    })
  } catch (err) {
    res.status(500).json({error: err.message})
  }
})

// Check token
router.post("/tokenIsValid", async (req, res) => { 
  try {
    const token = req.header("x-auth-token")
    if (!token) return res.json(false)
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (!verified) return res.json(false)
    const user = await User.findById(verified.id)
    if (!user) return res.json(false)
    return res.json(true)
  } catch (err) {
    res.status(500).json({error: err.message})
  }
})









// Need to add authentication here
router.get("/", setUser, authUser, authRole("admin"), async (req, res, next) => {
  try {
    res.status(200).send(await UserModel.find())
  } catch {
    res.status(400).send
  }
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
