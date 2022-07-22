const express = require("express")
const router = express.Router()
const RunModel = require("../database/runs_model")
const { authUser, authRole } = require("../basicAuth")

router.get("/", async (req, res, next) => {
  try {
    res.status(200).send(await RunModel.find())
  } catch {
    res.status(400)
    return res.send("Unable to display users")
  }
})

router.post("/", async (req, res, next) => {
  const newRun = {
    area: req.body.area,
    name: req.body.name,
  }
  RunModel.create(newRun, (err, doc) => {
    if (err) {
      res.status(422).send(err.message)
    } else {
      res.status(201).send(doc)
    }
  })
})

router.get("/:area", (req, res) => {
  RunModel.findOne({ area: req.params.area }, (err, doc) => {
    if (err) {
      res.status(400).send
    } else {
      res.status(200).send(doc)
    }
  })
})



router.delete("/:id", setRun, (req, res) => {
  RunModel.deleteOne(req.run, (err, doc) => {
    if (err) {
      res.status(405).send
    } else {
      res.status(204)
      return res.send("Deleted run")
    }
  })
})

router.put("/:id", (req, res, next) => {
  RunModel.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, area: req.body.area },
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(400)
        return res.send("Unable to udpate run")
      } else {
        res.status(200).send(doc)
      }
    }
  )
})

router.put("/assigndriver/:id", (req, res, next) => {
  RunModel.findByIdAndUpdate(
    req.params.id,
    { driverEmail: req.body.driverEmail },
    { new: true },
    (err, doc) => {
      if (err) {
        res.status(400)
        return res.send("Unable to udpate run")
      } else {
        res.status(200).send(doc)
      }
    }
  )
})

function setRun(req, res, next) {
  const runId = req.params.id
  if (runId) {
    RunModel.findById(runId, (err, doc) => {
      if (err) {
        res.status(404)
        return res.send({ error: err.message })
      } else {
        req.run = doc
        next()
      }
    })
  }
}

module.exports = router
