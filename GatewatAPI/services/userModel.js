const axios = require('axios')

const loginAPIService = "http://localhost:3000"

function userModel(token) {
    this.token = token
    this.updateAccount = async function (fullname, dob, gender) {
        const config = {
            url: `${loginAPIService}/users/update`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                fullname: fullname,
                dob: dob,
                gender: gender
            }
        }
        const result = await axios(config)
        return result.data
    }
}

module.exports = userModel