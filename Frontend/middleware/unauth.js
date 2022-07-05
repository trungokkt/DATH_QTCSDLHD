const jwt = require('jsonwebtoken')
const JWT_KEY =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjk2NWQ5MzljMzgwZTk4NTBkZjJkNTMiLCJpYXQiOjE2NTQwMjE1MjN9.U4CNHkMKtYyZ6naAGtvAVNwwYfYnbsD9vnUUhnzurfE"

const unAuth = async (req, res, next) => {
    if(!req.session.token){
        return next()
    }
    const data = jwt.verify(req.session.token.token, JWT_KEY)
    if (data.user_type == 3 || data.user_type == 2) {
        return res.redirect('/admin/user')
    }
    res.redirect('/')
}

module.exports = unAuth