const jwt = require('jsonwebtoken')
var config = require('../db/config');

const auth_emp_ad = async (req, res, next) => {
    try {
        if(req.user_type == 1){
            throw new Error()
        }        
        next()
    } catch (error) {
        res.status(401).send({
            error: 'Not authorized to access this resource'
        })
    }
}

module.exports = auth_emp_ad