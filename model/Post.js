const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    post: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    like: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ],


    postAt: {
        type: Date,
        default: Date.now,
    }


})

const Post = mongoose.model('Post', postSchema);
module.exports = Post