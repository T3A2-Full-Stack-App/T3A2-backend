const express = require("express")
const router = express.Router()
const RunModel = require("../database/runs_model")
const { authUser, authRole } = require("../basicAuth")

router.get("/", authUser, authRole("admin"), async (req, res, next) => {
  try {
    res.status(200).send(await RunModel.find())
  } catch {
    res.status(400)
    return res.send("Unable to display users")
  }
})

router.post("/", authUser, authRole("admin"), async (req, res, next) => {
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

router.get("/:id", setRun, authUser, (req, res) => {
  try {
    res.status(200).send(req.run)
  } catch {
    res.status(400)
  }
})

router.delete("/:id", setRun, authUser, authRole("admin"), (req, res) => {
  RunModel.deleteOne(req.run, (err, doc) => {
    if (err) {
      res.status(405).send
    } else {
      res.status(204)
      return res.send("Deleted run")
    }
  })
})

router.put("/:id", authUser, (req, res, next) => {
  RunModel.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, area: req.body.area },
    {new : true},
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
