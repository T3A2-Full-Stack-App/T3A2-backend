// Authentication handlers

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
        console.log(req.user.firstName)
        if (req.user.role !== role) {
            res.status(401)
            return res.send('You are not authorised to access this page')
        }
        next()
    }
}


    
    module.exports = { authUser, authRole }