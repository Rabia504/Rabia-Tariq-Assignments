const express = require("express");

require("../db/conn");
const User = require("../models/userSchema");
const auth = require("../middleware/auth");

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

router.get("/", (req, res)=>{
    //console.log (req.body);
    
   res.render('home',{user:[],users:null, flag:false});
   });

   router.get("/signup", (req, res)=>{
    res.render('signup');
   });

   router.post("/signup", async (req, res)=>{
    try{
        const username = await User.find({username:req.body.username}).select({username:1});
        const email = await User.find({email:req.body.email}).select({email:1});
        //console.log(username.length);
        if (username.length)
        {
            console.log('Username already exists');
        }
        else if(email.length)
        {
            console.log('email already exists');
        }
        else {
            const user = new User({
                fullname: req.body.fullname,
                username: req.body.username,
                email : req.body.email,
                password: req.body.password,
                gender: req.body.gender,
                dateOfBirth : req.body.dob,
                phoneNo: req.body.phone
        
            })
            const token = await user.createAuthToken();
           // console.log("token: " +token);
            res.cookie("jwt", token, 
                        {expires: new Date(Date.now()+(1000*60)),
                        httpOnly:true})
            const register = await user.save();
            res.status(201).render('login');
        }
       
    }
    catch (error) {
        res.status(400).send(error);
    }

   });

   router.get("/login", (req, res)=>{
    res.render('login');
   });

   router.post("/login", async (req, res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;
        const result = await User.findOne({username:username});
        
        //console.log(result);
        if (result.password == password)
        {
            const token = await result.createAuthToken();
            res.cookie("jwt", token, 
                        {expires: new Date(Date.now()+(20000)),
                        httpOnly:true})
            req.session.username = username;
            res.status(201).render('home',{user:result,users:null, flag:false});
        }
        else {
            console.log("invalid credentials!!!");
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
   
   });

   //search user by userrname
   router.post('/searchuser', auth,async (req, res) => {
    
    try {
        sess = req.session;
        if(sess.username)
        {
            const username = req.body.username;
            const currentuser = await User.findOne({username:sess.username});
            //console.log(currentuser);
            const user = await User.findOne({username:username});
            if (user) {
                
                res.render('home', {user:currentuser,users:user,flag:true});
            } else { 
                res.render('home' ,{user:currentuser,users:null,flag:true});
            }
        }
        else
        {
            console.log("You are not logged in");
            res.render('login');
        }
    } catch (error) {
            res.status(400).send(error);
    }
     
  });

  //view profile info
  router.get("/profile", async (req, res) => {
    
    try {
        sess = req.session;
        if(sess.username)
        {
            const user = await User.findOne({username:sess.username});
            if (user) {
                res.render('profile', {user:user});
            } else { 
                res.status(400).send("user not found");
            }
        }
        else{
            console.log("You are not logged in");
            res.render('login');
        }
    } catch (error) {
            res.status(400).send(error);
        }
    
    
    });

  // Update user profile
router.patch('/updateinfo', async (req, res) => {

    try {
        sess = req.session;
        
        //console.log(sess.username);
        if(sess.username)
        {
            User.updateOne({username:sess.username}, {$set:{
            email : req.body.email,
            password: req.body.password,
            phoneNo: req.body.phone,
            gender: req.body.gender,
            bio: req.body.bio }},
            function (err, docs) {
                if (err){
                console.log(err);
                }
                else{
                console.log("profile updated");
                }
             });
          
             const user = await User.findOne({username:sess.username});
             res.render('profile', {user:user});

       }
       else{
        console.log("You are not logged in");
        res.render('login');
       }
    }catch (error) {
        res.status(400).send(error);
    }
});


router.patch('/follow/:id', async (req, res) => {
    const  id  = req.params.id;
    const uname = req.session.username;
   
    if (req.body.action === 'follow') {
      try {
            const user = await User.findOne({_id:id});
           
            //adding current user to the followers list of the user followed
            User.findByIdAndUpdate({_id:id}, { $push:  { followers:uname } },
                function (err, docs) {
                if (err){
                console.log(err);
                }
                else{
                console.log("user followed");
                }});

            //adding to the following list of the current user
            User.updateOne({username:uname}, { $push:  { following: user.username } },
                function (err, docs) {
                if (err){
                console.log("error");
                }
                else{
                console.log("user added to following");
                res.status(201).send("User followed");
                }});
        
      } catch (err) {
        return res.status(400).send(err);
      }
    } 

    if (req.body.action === 'unfollow') {
        try {
              //removing from followers list
              User.findByIdAndUpdate({_id:id}, { $pull:  { followers:uname } },
              function (err, docs) {
                if (err){
                console.log("error");
                }
                else{
                console.log("user unfollowed");
              }});
              //removing from the following list of the current user
              const user = await User.findOne({_id:id});
              User.updateOne({username:uname}, { $pull:  { following: user.username } },
                  function (err, docs) {
                    if (err){
                    console.log("error");
                    }
                    else{
                    console.log("user removed from following");
                    res.status(201).send("User unfollowed");
                  }});

        } catch (err) {
          return res.status(400).send(err);
        }
      } 
  
});


//delete user profile
router.delete('/delete/:id', (req, res) => {

    try {
        sess = req.session;
        if(sess.username)
        {
            const id = req.params.id;
            User.deleteOne({_id: id}, function (err) {
                if(err) console.log(err);
                console.log("Successful user deletion");
              });
            res.render('login');

        }else{
            console.log("You are not logged in");
            res.render('login');
        }

    }catch (error) {
        res.status(400).send(error);
    }
});


//logout user
router.get('/logout',(req,res) => {
    req.session.destroy((error) => {
        if(error) {
            return console.log(error);
        }
        res.redirect('login');
    });

});


   module.exports = router;