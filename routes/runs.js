const express = require("express")
const router = express.Router()
const RunModel = require('../database/runs_model')
const { authUser, authRole } = require("../basicAuth")
const { canViewRun } = require("../permissions/run")
const { reduceRight } = require("underscore")


router.get("/", authUser, authRole("admin"), async (req, res, next) => {
  try {
    res.status(200).send(await RunModel.find())
  }
  catch {
    res.status(400)
    return res.send("You are not authorised to view these runs")
  }
})

router.post("/", authUser, authRole("admin"), async (req, res, next) => {
  const newRun = {
    area: req.body.area,
    name: req.body.name,
    user: req.body._id
  }
  RunModel.create(newRun, (err, doc) => {
    if (err) {
        res.status(422).send(err.message)
    } else {
      res.status(201).send(doc)
      }
    })
})

// router.get("/_id", setRun, authUser, authGetRun, (req, res) => {
//   res.json(req.run)
// })

function setRun(req, res, next) {
  const runId = parseInt(req.params._id)
  if (runId) {
    RunModel.findById(runId, (err, doc) => {
      if (err) {
        res.status(404)
        return res.send("You are not authorised to view this" )
      } else {
        req.run = doc
        next()
      }
    })
  }
}

function authGetRun(req, res, next) {
  if (!canViewRun(req.user, req.run)) {
    res.status(401)
    return res.send('You are not authorised to view this run')
  }
  next()
}

module.exports = router
