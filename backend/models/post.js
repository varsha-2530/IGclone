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
    photos: {
      type: String,

    },

    likes: [{
        type: ObjectId,
        ref : "User"
    }],

    comment : [{
        text: String,
        postedBy:[{
            type: ObjectId,
            ref: 'User'
        }]
    }],
     
    postedBy:{
        type: ObjectId,
        ref: 'User'
    },  
    

}); 


module.exports = mongoose.model("Post", PostSchema);