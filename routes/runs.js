const express = require("express")
const router = express.Router()
const { runs, users, ROLE } = require("../data")
const { authUser, authRole } = require("../basicAuth")
const { canViewRun } = require("../permissions/run")


router.get("/", authUser, authRole(ROLE.ADMIN), (req, res) => {
  res.json(runs)
})

router.get("/:runId", setRun, authUser, authGetRun, (req, res) => {
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

function authGetRun(req, res, next) {
  if (!canViewRun(req.user, req.run)) {
    res.status(401)
    return res.send('You are not authorised to view this run')
  }
  next()
}

module.exports = router
