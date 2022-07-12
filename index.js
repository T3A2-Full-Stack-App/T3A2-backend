const express = require("express")
const app = express()
const { authUser, authRole } = require("./basicAuth")
const runRouter = require("./routes/runs")
const vehicleRouter = require("./routes/vehicles")
const driverRouter = require("./routes/drivers")
const userRouter = require("./routes/users")
const UserModel = require("./database/user_model")

app.use(express.json())

app.use("/runs", runRouter)
app.use("/vehicles", vehicleRouter)
app.use("/drivers", driverRouter)
app.use("/users", userRouter)

app.get("/login", (req, res) => {
  res.send("Login Page")
})

app.get("/register", (req, res) => {
  res.send("Register Page")
})

app.get("/dashboard", authUser, (req, res) => {
  res.send("Dashboard Page")
})

const unless = (path, middleware) => {
  return (req, res, next) => {
    if (path === req.path) {
      return next
    } else {
      return middleware(req, res, next)
    }
  }
}

app.use(unless("/users", setUser))

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

const port = 3300
app.listen(port, () => console.log(`App running at http://localhost:${port}/`))
