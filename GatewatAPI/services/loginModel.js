const axios = require('axios')

const loginAPIService = "http://localhost:3000"

function loginModel(username, password) {
    this.username = username
    this.password = password
    this.loginAccount = async function () {
        const config = {
            url: `${loginAPIService}/users/login`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username: this.username,
                password: this.password
            }
        }
        const result = await axios(config)
        return result.data
    }
    this.logout = async function () {
        const config = {
            url: `${loginAPIService}/users/login`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username: this.username,
                password: this.password
            }
        }
        const result = await axios(config)
        return result.data
    }
}

module.exports = loginModel