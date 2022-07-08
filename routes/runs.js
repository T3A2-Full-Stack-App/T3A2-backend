const express = require("express")
const router = express.Router()
const { runs } = require("../data") // will have to get runs from model

router.get("/", (req, res) => {
  res.json(runs)
})

router.get("/:runId", setRun, (req, res) => {
  res.json(req.run)
})

function setRun(req, res, next) {
  const runId = parseInt(req.params.runId)
  req.run = runs.find((run) => run.id === runId)

  if (req.run == null) {
    res.status(404)
    return res.send("Unable to locate run")
  }
  next()
}

module.exports = router
