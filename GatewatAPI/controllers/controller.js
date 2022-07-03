const loginModel = require("../services/loginModel");
const userModel = require("../services/userModel");

module.exports = {
    loginAccount: async function (req, res) {
        try {
            const { username, password } = req.body;
            console.log(username, password)

            const loginM = new loginModel(username, password)
            const loginResult = await loginM.loginAccount()
            res.send(loginResult)
        } catch (error) {
            res.status(400).send(error);
        }
    },
    getAccount: async function (req, res) {
        // View logged in user profile
        var user = req.user
        delete user.user.password
        delete user.user.tokens
        res.send(user);
    },
    createAccount: async function (req, res) {
        try {
            const { username, phone, email, password, fullname } = req.body
            var data = JSON.stringify({
                "username": username,
                "phone": phone,
                "email": email,
                "password": password,
                "fullname": fullname
            });
            var config = {
                method: 'post',
                url: 'http://localhost:3000/users/signup',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (error) {
            res.status(400).send(error);
        }
    },
    updateAccount: async function (req, res) {
        try {
            const { fullname, dob, gender } = req.body
            var userM = new userModel(req.token)
            var updateUser = await userM.updateAccount(fullname, dob, gender).

            res.send(updateUser);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    logoutAccount: async function (req, res) {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token != req.token;
            });
            await req.user.save();
            res.send();
        } catch (error) {
            res.status(500).send(error);
        }
    },
    logoutAllAccount: async function (req, res) {
        try {
            req.user.tokens.splice(0, req.user.tokens.length);
            await req.user.save();
            res.send();
        } catch (error) {
            res.status(500).send(error);
        }
    },
};
