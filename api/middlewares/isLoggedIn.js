let isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Please Log-in first');
    return res.redirect('auth/login');

}

module.exports = isLoggedIn
