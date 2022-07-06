var axios = require("axios")

const loginController = {
    index: function (req, res, next) {
        res.render("login", {
            layout: "admin",
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
            if (!result) {
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
    },
    register_index: async function (req, res, next) {
        res.render('register', {
            layout: "admin",
        })
    },
    register: async function (req, res, next) {
        try {
            const { username, password, phone, fullname, address, gender, email,bod } = req.body;
            var data = JSON.stringify({
                "username": username,
                "password": password,
                "phone": phone,
                "email": email,
                "fullname": fullname,
                "address": address,
                "gender": gender,
                "bod": bod
            });

            const result = await axios({
                method: 'post',
                url: 'http://localhost:8000/customer/signup',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            })
            console.log(result.data)
            if (!result) {
                throw new Error("login false")
            }
            console.log(result.data)
            return res.redirect('/login')
        } catch (error) {
            res.redirect('/register')
        }
    }
}
module.exports = loginController