const express = require("express");
var moment = require('moment');
const auth = require("../middleware/auth");

require("../db/conn");
const Post = require("../models/postSchema");
const User = require("../models/userSchema");
const router = new express.Router();
router.use( function( req, res, next ) {

  if ( req.query._method == 'DELETE' ) {
      req.method = 'DELETE';
      req.url = req.path;
  }      
  if ( req.query._method == 'PATCH' ) {
    req.method = 'PATCH';
    req.url = req.path;
}     
  next(); 
});


   router.get('/post',auth, async (req, res) => {
     const username = req.cookies.user.username;
     const user = await User.findOne({username});
     const following = user.following;
     let posts = [];
     for(let i in following){
      const post =  await Post.find({username:following[i]});
      
      posts.push(post);
     }
     

    res.render('post', {posts:posts,username:username});
  });

  router.get('/myposts',auth, async (req, res) => {
    const username = req.cookies.user.username;
    const post =  await Post.find({username}).sort({time: -1});
    //console.log(post[2].time.toLocaleTimeString());
   res.render('myposts', {posts: post, username:username});
 });


   router.post("/post", async (req, res)=>{
      try{
              const username = req.cookies.user.username;
              const post = new Post({
                  username: username,
                  postContent: req.body.content,
                  time : new Date(),
                  likes: [],
                  likesCount: 0
              })
            //console.log(post);
              const createpost = await post.save();

              if(req.body.mypost=="mypost"){
                const post =  await Post.find({username}).sort({time: -1});
                res.status(201).render('myposts', {posts: post, username:username});
              }
              else{
                let posts = [];
                const user = await User.findOne({username});
                const following = user.following;
                for(let i in following){
                const post =  await Post.find({username:following[i]}).sort({time: -1});
                posts.push(post);
                }
                res.status(201).render('post', {posts: posts, username:username});
            }
          }
      catch (error) {
          res.status(400).send(error);
      }
  
     });

   router.patch('/post/:id', async (req, res) => {
        const id  = req.params.id;
        const postId = req.body.postid;
        const username = req.cookies.user.username;
        if (req.body.action === 'like') {
          try {
            //console.log(req.body.action);
                Post.findByIdAndUpdate({_id:postId}, {$inc: { likesCount: 1 }, 
                $push:  { likes: username } },
                function (err, docs) {
                if (err){
                console.log(err);
                }
                else{
                console.log("post liked");
                }});
            
          } catch (err) {
            return res.status(400).send(err);
          }
        }
        if (req.body.action === 'unlike') {
          try {
            Post.findByIdAndUpdate({_id:id}, {$inc: { likesCount: -1 }, 
                $pull:  { likes: username } },
                function (err, docs) {
                if (err){
                console.log(err);
                }
                else{
                console.log("post unliked");
                //res.status(201).send('post unliked');
                }});
          } catch (err) {
            return res.status(400).send(err);
          }
        }

        
        if (req.body.action === 'editpost') {
            try {
              Post.findByIdAndUpdate({_id:id}, {$set: { postContent: req.body.content } },
                  function (err, docs) {
                  if (err){
                  console.log(err);
                  }
                  else{
                  console.log("post edited");
                  }});
            } catch (err) {
              return res.status(400).send(err);
            }
          }

          const user = await User.findOne({username});
          const following = user.following;
          //console.log(following);
          let posts = [];
          for(let i in following){
            const post =  await Post.find({username:following[i]});
            
            posts.push(post);
          }
          

          res.render('post', {posts: posts, username:username});

      });
    
      
      router.delete('/post/:id', async(req, res) => {
            const username = req.cookies.user.username;
            const id = req.params.id;
            Post.deleteOne({_id: id}, function (err) {
                if(err) console.log(err);
                console.log("Successful post deletion");
              });
              const post =  await Post.find({username});

              res.render('myposts', {posts: post, username:username});
           

      });


   module.exports = router;