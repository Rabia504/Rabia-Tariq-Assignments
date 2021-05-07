const express = require("express");
require("../db/conn");
const Post = require("../models/postSchema");
const router = new express.Router();


   router.get('/post', async (req, res) => {
    const posts = await Post.find().sort({ timestamp: -1 });
    //console.log(posts);
    //console.log(posts[0].username);
    res.render('post', {posts: posts});
  });


   router.post("/post", async (req, res)=>{
      try{
              const sess = req.session;
              //console.log(sess.username);
              const post = new Post({
                  username: sess.username,
                  postContent: req.body.content,
                  date : Date.now().getTime(),
                  likes: [],
                  likesCount: 0
              })
            //   await post.save();
            //   const p = await Post.getLastInsertedDocument.find({}).sort({_id:-1}).limit(1);
            //   res.render('post',{post:p});
              const createpost = await post.save();
              res.status(201).render('login');
          }
      catch (error) {
          res.status(400).send(error);
      }
  
     });



     router.patch('/post/:id', (req, res) => {
        const { _id } = req.params;

        if (req.body.action === 'like') {
          try {
                Post.findByIdAndUpdate({_id}, {$inc: { likesCount: 1 }, 
                $push:  { likes: req.session.username } },
                function (err, docs) {
                if (err){
                alert(err);
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
            Post.findByIdAndUpdate({_id}, {$inc: { likesCount: -1 }, 
                $pull:  { likes: req.session.username } },
                function (err, docs) {
                if (err){
                alert(err);
                }
                else{
                console.log("post unliked");
                }});
          } catch (err) {
            return res.status(400).send(err);
          }
        }

        
        if (req.body.action === 'editpost') {
            try {
              Post.findByIdAndUpdate({_id}, {$set: { postContent: req.body.content } },
                  function (err, docs) {
                  if (err){
                  alert(err);
                  }
                  else{
                  console.log("post edited");
                  }});
            } catch (err) {
              return res.status(400).send(err);
            }
          }
      });
    
      
      router.delete('/post/:id', async (req, res) => {
        try {
            const {id} = req.params;
            let choice = confirm("Do you want to delete post?");
            if(choice){
            const result =  await Personinfo.deleteOne({_id: id});
            }
        } catch (err) {
          return res.status(404).send(err);
        }
      });


   module.exports = router;