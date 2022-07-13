const jwt = require('jsonwebtoken')
require("dotenv").config()

// Handler to check if user is a registered user 
function authUser(req, res, next) {
    if (req.user == null) {
        res.status(403)
        return res.send('Log in required')
    }

    next()
}

// Handler to check if the user's role matches the required role for the task
function authRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            res.status(401)
            return res.send('You are not authorised to perform this action')
        }
        next()
    }
}

// JWT authorisation
const auth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token")
        if (!token)
            return res.status(401).send("No authentication token, access denied")
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if (!verified)
            return res.status(401).send("Token verification failed. Authorisation denied.")
        req.user = verified.id
        next()
    } catch (err) {
        res.status(500).json({ error: err.message})
    }
}



    
    module.exports = { authUser, authRole, auth }