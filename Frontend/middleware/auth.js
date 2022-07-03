const jwt = require('jsonwebtoken')
const JWT_KEY =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjk2NWQ5MzljMzgwZTk4NTBkZjJkNTMiLCJpYXQiOjE2NTQwMjE1MjN9.U4CNHkMKtYyZ6naAGtvAVNwwYfYnbsD9vnUUhnzurfE"

const auth = async (req, res, next) => {
    try {
        if(!req.session.token){
            return next()
        }
        const data = jwt.verify(req.session.token.token, JWT_KEY)
        req.user = data
        req.token = req.session.token.token
        next()
    } catch (error) {
        res.status(401).send({
            error: 'Not authorized to access this resource'
        })
    }
}

module.exports = auth