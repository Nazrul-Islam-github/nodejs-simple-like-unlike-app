const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const saltRound = 12;
const passport = require('passport');
const Post = require('../model/Post')
const { ensureAuth } = require('../config/auth')

router.get('/', (req, res) => {
    res.render('index', {
        i: req.user
    })
})

//sign up route
router.get('/signup', (req, res) => {
    res.render('signup', {
        layout: 'login-layout'
    })
})

// handle Signup Post Request
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const error = []
        if (!name || !email || !password) {
            error.push({ message: "please Fiil All Feild " })
            res.render('signup', {
                layout: 'login-layout',
                error: error
            })
        }

        else {
            const user = User.findOne({ email: email })
                .then(user => {
                    if (user) {
                        error.push({ message: "This Email Already Exists" });
                        res.render('signup', {
                            layout: 'login-layout',
                            error: error
                        });
                    }
                    else {
                        const newUser = new User({
                            name: name,
                            email: email,
                            password: password
                        })

                        bcrypt.genSalt(saltRound, (error, salt) => {
                            if (error) throw error;
                            bcrypt.hash(newUser.password, salt, (error, hash) => {
                                if (error) throw error;
                                newUser.password = hash
                                newUser.save()
                                    .then(user => {
                                        res.redirect('/login')
                                    })
                                    .catch(error => {
                                        console.error(error);
                                    })
                            })
                        })
                    }
                })
        }


    } catch (error) {
        console.error(error)
    }


})

// Login Route
router.get('/login', (req, res) => {
    res.render('login', {
        layout: 'login-layout'
    })
})

// handle login Post Request
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)
});



// all post show
router.get('/post', async (req, res) => {
    try {

        const logInUser = req.user === undefined ? 'login' : req.user.id
        const isLogin = req.user === undefined ? false : true
        let likePost = [];
        if (isLogin) {
            const countLikes = await Post.find({ like: req.user.id })
            for (let i of countLikes) {
                likePost.push(i._id.toString())
            }
        }
        else {
            likePost = undefined
        }



        const post = await Post.find().populate('user')
            .lean()




        res.render('all-post', {
            post: post,
            checkUserLogin: logInUser,
            likePost: likePost
        })
    } catch (error) {

        console.error(error);
    }

})


// add post 
router.get('/add/post', ensureAuth, (req, res) => {
    res.render('add-post')
})

// handle Post 
router.post('/add/post', ensureAuth, async (req, res) => {
    try {
        const newPost = req.body;
        newPost.user = req.user.id
        await Post.create(newPost)
        res.redirect('/post')
        console.log(newPost);
    } catch (error) {
        console.error(error);
    }
})


// like 

router.post('/like/:id', ensureAuth, async (req, res) => {
    try {
        const counter = 1
        await Post.findOneAndUpdate({ _id: req.params.id }, { $inc: { like: counter } }).exec();
        console.log(counter);
        res.redirect('/post')

    } catch (error) {
        console.error(error);
    }
})

router.get('/logout', ensureAuth, (req, res) => {
    req.logOut();
    res.redirect("/");

})
module.exports = router