const express = require("express");
//const alert = require("alert");
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


   router.get('/post/:username', async (req, res) => {
     const uname = req.params.username;
     req.session.username = uname;
     const user = await User.findOne({username:uname});
     const following = user.following;
     //console.log(following);
     let posts = [];
     for(let i in following){
      const post =  await Post.find({username:following[i]});
      
      posts.push(post);
     }
     

    res.render('post', {posts: posts, username:uname});
  });


   router.post("/post/:username", async (req, res)=>{
      try{
              var d=new Date();
              const sess = req.session;
              const post = new Post({
                  username: sess.username,
                  postContent: req.body.content,
                  date : d.toLocaleTimeString(),
                  likes: [],
                  likesCount: 0
              })
            //console.log(post);
              const createpost = await post.save();

              let posts = [];
              const user = await User.findOne({username:req.params.username});
              const following = user.following;
              for(let i in following){
               const post =  await Post.find({username:following[i]});
               posts.push(post);
              }
              res.status(201).render('post', {posts: posts, username:sess.username});
          }
      catch (error) {
          res.status(400).send(error);
      }
  
     });

   router.patch('/post/:id', async (req, res) => {
        const id  = req.params.id;
        const postId = req.body.postid;
        //console.log(postId);
        if (req.body.action === 'like') {
          try {
            //console.log(req.body.action);
                Post.findByIdAndUpdate({_id:postId}, {$inc: { likesCount: 1 }, 
                $push:  { likes: req.session.username } },
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
                $pull:  { likes: req.session.username } },
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

          const user = await User.findOne({username:req.session.username});
          const following = user.following;
          //console.log(following);
          let posts = [];
          for(let i in following){
            const post =  await Post.find({username:following[i]});
            
            posts.push(post);
          }
          

          res.render('post', {posts: posts, username:req.session.username});

      });
    
      
      router.delete('/post/:id', (req, res) => {
        
            const id = req.params.id;
            Post.deleteOne({_id: id}, function (err) {
              if(err) console.log(err);
              console.log("Successful post deletion");
            });
        
          return res.status(404).send(err);
        
      });


   module.exports = router;