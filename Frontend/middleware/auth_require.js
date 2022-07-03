const axios = require("axios")

const auth_require = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.redirect('/login')
        }

        next()
    } catch (error) {
        res.status(401).send({
            error: 'Not authorized to access this resource'
        })
    }
}

module.exports = auth_require