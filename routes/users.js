const express = require('express')
const router = express.Router()
const UserModel = require('../database/user_model')

router.get('/', async (req, res) => {
    try {
        res.status(200).send(await UserModel.find())
    }

    catch {
        res.status(400).send
    }
})

module.exports = router