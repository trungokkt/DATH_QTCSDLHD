const unAuth = async (req, res, next) => {
    if (req.session.token) {
        return res.redirect('/')
    }
    next();
}

module.exports = unAuth