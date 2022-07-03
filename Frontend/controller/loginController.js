var axios = require("axios").default
const loginController = {
    index: function (req, res, next) {
        res.render("login", {
            layout: "login",
        });
    },
    login: async function (req, res, next) {
        try {
            const {
                username,
                password
            } = req.body;
            var data = JSON.stringify({
                "username": username,
                "password": password
            });
            const result = await axios({
                method: 'post',
                url: 'http://localhost:8000/customer/login',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            })
            if(!result){
                throw new Error("login false")
            }
            req.session.token = result.data
            return res.redirect('/admin/user')
        } catch (error) {
            res.status(400).redirect('/login')
        }
    },
    logout: async function (req, res, next) {
        delete req.session.token
        res.redirect('/login')
    }

}
module.exports = loginController