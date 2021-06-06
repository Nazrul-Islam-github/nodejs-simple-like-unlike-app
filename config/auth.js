const Local = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = require('../model/User')

const LoginAuth = (passport) => {
    passport.use(new Local({ usernameField: "email" }, (email, password, done) => {
        User.findOne({ email: email }).then(user => {
            if (!user) {
                return done(null, false, { message: "invalid Email or Password" })
            }

            bcrypt.compare(password, user.password, (error, isMatch) => {
                if (error) throw error;
                if (isMatch) {
                    return done(null, user)
                }
                else (
                    done(null, false, { message: "invalid email or password" })
                )
            })
        }).catch(error => {
            console.error(error);
        })
    }))


    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}

const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}
module.exports = {
    LoginAuth,
    ensureAuth,
}
