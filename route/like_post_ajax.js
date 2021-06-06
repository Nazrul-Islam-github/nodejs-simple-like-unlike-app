const express = require('express')
const router = express.Router()
const Post = require('../model/Post')
const User = require('../model/User')

const { ensureAuth } = require('../config/auth')

router.post('/', async (req, res) => {
    try {
        const { user, post, action } = req.body
        if (user === 'login') res.send('/login');
        else {
            if (action === "like") {
                await Post.findOneAndUpdate({ _id: post }, { $push: { like: user } }).exec();
                const updateLike = await Post.findOne({ _id: post })
                res.json({ 'like': updateLike.like.length })

            }
            else {
                await Post.findOneAndUpdate({ _id: post }, { $pull: { like: user }, }, { multi: false })
                const updateLike = await Post.findOne({ _id: post })
                res.json({ 'like': updateLike.like.length })
            }

        }

    } catch (error) {
        console.error(error);
    }
})

module.exports = router