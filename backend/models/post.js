const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types

const PostSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true
    },

    body: {
        type: String,
        require: true
    },

    likes: [{
        type: ObjectId,
        ref : "user "
    }],

    comment : [{
        text: String,
        postedBy:{
            type: ObjectId,
            ref: 'u ser'
        }
    }],

    postedBy:{
        type: ObjectId,
        ref: 'user'
    },

});


module.exports = mongoose.model("Post", PostSchema);