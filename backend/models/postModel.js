const mongoose = require('mongoose');

const postShema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    title: {
        type: String,
    },
    article: {
        type: String,
    },
    likes: {
        type: Array,
        default: [],
      },
    created_at : {
        type: Date, required: true, default: Date.now 
       },
},
 
);

const Post = mongoose.model('Post', postShema);
module.exports = Post;