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



app.use("/api/v1/drivers", driverRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/runs", runRouter)
app.use("/api/v1/vehicles", vehicleRouter)
app.use(setUser)



const port = process.env.PORT || 3405
app.listen(port, () => console.log(`App running at http://localhost:${port}/`))
