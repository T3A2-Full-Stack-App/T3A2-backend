const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const { authUser, authRole } = require("./basicAuth")
const runRouter = require("./routes/runs")
const vehicleRouter = require("./routes/vehicles")
const driverRouter = require("./routes/drivers")
const userRouter = require("./routes/users")
const UserModel = require("./database/user_model")
app.use(express.json())
app.use(cors())


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


app.use("/users", userRouter)
app.use(setUser)
app.use("/runs", runRouter)
app.use("/vehicles", vehicleRouter)
app.use("/drivers", driverRouter)


const port = 3300
app.listen(port || 3300, () => console.log(`App running at http://localhost:${port}/`))
