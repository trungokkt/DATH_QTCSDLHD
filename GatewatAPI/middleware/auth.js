const axios = require("axios")

const auth = async (req, res, next) => {
    try {
        const Authorization = req.header('Authorization')

        if(!Authorization){
            throw new Error()
        }
        const token = Authorization.replace("Bearer ","")
        console.log(token)

        const user = await axios({
            method: "get",
            url: "http://localhost:3000/users/me",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Authorization,
            },
        })
        if (!user) {
            throw new Error()
        }
        req.user = user.data
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({
            error: 'Not authorized to access this resource'
        })
    }
}

module.exports = auth