function authUser(req, res, next) {
    if (req.user == null) {
        res.status(403)
        return res.send('Log in required')
    }

    next()
}

function authRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            res.status(401)
            return res.send('You are not authorised to access this page')
        }
        next()
    }
}


    
    module.exports = { authUser, authRole }