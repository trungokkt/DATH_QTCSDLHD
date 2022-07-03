const jwt = require('jsonwebtoken')
var config = require('../db/config');

const auth = async (req, res, next) => {
    try {
        const authorization = req.header('Authorization')
        if (!authorization) {
            throw new Error()
        }
        const token = authorization.replace('Bearer ', '')
        const data = jwt.verify(token, config.JWT_KEY)
        req.username = data._id
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({
            error: 'Not authorized to access this resource'
        })
    }
}

module.exports = auth