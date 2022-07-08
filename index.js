const express = require("express")
const app = express()
const { users } = require("./data")
const runRouter = require("./routes/runs")

app.use(express.json())
app.use(setUser)
app.use("/runs", runRouter)

app.get("/", (req, res) => {
  res.send("Home Page")
})

app.get("/dashboard", (req, res) => {
  res.send("Dashboard Page")
})

app.get("/admin", (req, res) => {
  res.send("Admin Page")
})

function setUser(req, res, next) {
  const userId = req.body.userId
  if (userId) {
    req.user = users.find((user) => user.id === userId)
  }
  next()
}

const port = 3300
app.listen(port, () => console.log(`App running at http://localhost:${port}/`))

