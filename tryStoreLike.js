const mongoose = require('mongoose');
const con = require('./config/conn')
con()
const Post = mongoose.Schema({
    post: {
        type: String

    },

    like: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ],


    post_id: {
        type: String
    }
})

const Demo = mongoose.model('Demo', Post)

const neww = {
    // post: "lore fgThe Instagram colors are various shades of purple, pink, blue, orange, red and yellow. Use this Instagram brand color scheme for digital or print projects that need ..",
    // post_id: '123'
    like: '60a138a746d9bd0708cded79'
}

const ab = async () => {
    try {
        await Demo.findOneAndUpdate({ post_id: '123' }, { $push: { like: neww.like }, }, { multi: false })
        // await Demo.findOneAndUpdate({ post_id: '122' }, { $pull: { like: neww.like }, }, { multi: false })
        // const Likes = await Demo.findOne({ like: '60a138a746d9bd0708cded79' });
        // console.log(Likes);
        // await Demo.create(neww)
    } catch (error) {
        console.error(error);
    }
}

// ab()



let i = [
    '60a2865fda623300081244a9',
    '60a2866dda623300081244aa',
    '60a2867fda623300081244ab',
    '60a3d36e29be2729183cf0fa',
    '60a3d37b29be2729183cf0fb'
]
console.log(i.includes("60a3d37b29be2729183cf0fb"));