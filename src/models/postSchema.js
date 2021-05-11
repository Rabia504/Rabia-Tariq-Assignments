
const mongoose = require("mongoose");
const validator = require("validator");

 const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
      },
      postContent: {
        type: String,       
        required: true
      },
      time: {
        type: Date,
        required: true
      },
      likes: {
        type: [String],
        
      },
      likesCount: {
        type: Number,
      }
 });

 const Post = new mongoose.model("Post", postSchema);

 module.exports = Post;