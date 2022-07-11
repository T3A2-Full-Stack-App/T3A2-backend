const express = require('express')
const router = express.Router()
const UserModel = require('../database/user_model')
const { authUser, authRole } = require("../basicAuth")

// Need to add authentication here
router.get('/', authUser, authRole('admin'), async (req, res, next) => {
    try {
        res.status(200).send(await UserModel.find())
    }

    catch {
        res.status(400).send
    }
})

router.post('/', (req, res, next) => { 
    UserModel.create(req.body, (err, doc) => {
        if (err) {
            res.status(422).send({ error: err.message})
        } else {
            res.status(201).send(doc)
        }
    })
})

module.exports = router