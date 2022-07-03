const authAdmin = async (req, res, next) => {
    try {
        if (req.user.user_type == 3) {
            next()
        }
        if (req.user.user_type == 2) {
            next()
        }
        if (req.user.user_type == 1) {
            res.redirect('/')
        }
    } catch (error) {
        res.redirect('/404')
    }
}
const authEmployee = async (req, res, next) => {
    try {
        if (req.user.user_type == 2) {
            next()
        }
        if (req.user.user_type == 3) {
            throw new Error()
        }
        if (req.user.user_type == 1) {
            throw new Error()
        }
    } catch (error) {
        res.redirect('/404')
    }
}
const authCustomer = async (req, res, next) => {
    try {
        if (req.user.user_type == 1) {
            next()
        }
        if (req.user.user_type == 2) {
            throw new Error()
        }
        if (req.user.user_type == 3) {
            throw new Error()
        }

    } catch (error) {
        res.redirect('/404')
    }
}
module.exports = {
    authAdmin,
    authEmployee,
    authCustomer
}