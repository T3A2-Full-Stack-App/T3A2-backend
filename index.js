const express = require("express")
const app = express()
const { users, ROLE } = require("./data")
const { authUser, authRole } = require("./basicAuth")
const runRouter = require("./routes/runs")
const vehicleRouter = require("./routes/vehicles")

app.use(express.json())
app.use(setUser)
app.use("/runs", runRouter)
app.use("/vehicles", vehicleRouter)

app.get("/login", (req, res) => {
  res.send("Login Page")
})

app.get("/dashboard", authUser, (req, res) => {
  res.send("Dashboard Page")
})



function setUser(req, res, next) {
  const userId = req.body.userId
  if (userId) {
    req.user = users.find(user => user.id === userId)
  }
  next()
}

const port = 3300
app.listen(port, () => console.log(`App running at http://localhost:${port}/`))

