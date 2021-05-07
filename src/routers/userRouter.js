const express = require("express");

require("../db/conn");
const User = require("../models/userSchema");
const router = new express.Router();

router.get("/", (req, res)=>{
    //console.log (req.body);
    
   res.render('home',{user:[],flag:false});
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
            alert('Username already exists');
        }
        else if(email.length)
        {
            alert('email already exists');
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
            req.session.username = username;
            res.status(201).render('home',{user:result, flag:false});
        }
        else {
            alert("invalid credentials!!!");
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
   
   });

   //search user by userrname
   router.post('/searchuser', async (req, res) => {
    
    try {
        sess = req.session;
        if(sess.username)
        {
            const username = req.body.username;
            const user = await User.findOne({username:username});
            if (user) {
                res.render('home', {user:user,flag:true});
            } else { 
                res.render('home' ,{flag:true});
            }
        }
        else
        {
            alert("You are not logged in");
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
            alert("You are not logged in");
            res.render('login');
        }
    } catch (error) {
            res.status(400).send(error);
        }
    
    
    });

  // Update user profile
router.post('/updateinfo', async (req, res) => {

    try {
        sess = req.session;
        if(sess.username)
        {
            //const {id} = req.params;
            const result = await User.UpdateOne({username:sess.username}, {$set:{
            username: req.body.username,
            email : req.body.email,
            password: req.body.password,
            phoneNo: req.body.phone,
            bio: req.body.bio
        }});
        alert("Your profile is updated!!!");
        const user = await User.findOne({username:sess.username});
        if (user) {
            res.render('profile', {user:user});
        } 

       }
       else{
        alert("You are not logged in");
        res.render('login');
       }
    }catch (error) {
        res.status(400).send(error);
    }
});


router.patch('/follow/:id', (req, res) => {
    const { _id } = req.params;
    const uname = req.session.username;
    if (req.body.action === 'follow') {
      try {
            //adding current user to the followers list of the user followed
            User.findByIdAndUpdate({_id}, { $push:  { followers:uname } },
            function (err, docs) {
            if (err){
            alert(err);
            }
            else{
            alert("user followed");
            }});
            //adding to the following list of the current user
            const user = User.findOne({_id:id});
            User.UpdateOne({username:uname}, { $push:  { following: user.username } },
                function (err, docs) {
                if (err){
                alert(err);
                }
                else{
                console.log("user added to following");
                }});
        
      } catch (err) {
        return res.status(400).send(err);
      }
    } 

    if (req.body.action === 'unfollow') {
        try {
              //removing from followers list
              User.findByIdAndUpdate({_id}, { $pull:  { followers:uname } },
              function (err, docs) {
                if (err){
                alert(err);
                }
                else{
                alert("user unfollowed");
              }});
              //removing from the following list of the current user
              const user =  User.findOne({_id:id});
              User.UpdateOne({username:uname}, { $pull:  { following: user.username } },
                  function (err, docs) {
                    if (err){
                    alert(err);
                    }
                    else{
                    console.log("user removed from following");
                  }});

        } catch (err) {
          return res.status(400).send(err);
        }
      } 
  
});


//delete user profile
router.delete('/delete/:id', async (req, res) => {

    try {
        sess = req.session;
        if(sess.username)
        {
            const {id} = req.params;
            let choice = confirm("are you sure you want to delete your account?");
            if(choice){
            const result =  await Personinfo.deleteOne({_id: id});
         }

        }else{
            alert("You are not logged in");
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