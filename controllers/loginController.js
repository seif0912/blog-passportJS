const validationResult = require('express-validator').validationResult
const loginService = require('../services/loginservice')

let getLoginPage = (req, res) => {
    return res.render('login', {
        errors: req.flash("errors")
    })
}

let handleLogin = async (req, res) => {
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/login");
    }

    try {
        await loginService.handleLogin(req.body.email, req.body.password);
        return res.redirect("/");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/login");
    }
};

let checkLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    next();
};

let isLoggedIn = (req, res, next) => {
    req.isLoggedIn = req.isAuthenticated()
    next();
};

let checkLoggedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
};

let postLogOut = (req, res) => {
    req.session.destroy(function(err) {
        return res.redirect("/");
    });
};

let isAuthorized = (req, res, next) => {
    console.log(req.user)
    console.log(req.params)
    if(req.params.id != req.user.id){
        return res.redirect('/not-authorized')
    }
    next()
}

module.exports = {
    getLoginPage,
    handleLogin,
    checkLoggedIn,
    checkLoggedOut,
    isLoggedIn,
    postLogOut,
    isAuthorized
};