const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const auth = async (req,res,next) =>{

    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({_id:verifyUser._id});
        res.cookie("user", user, {httpOnly:true})

        next();
    } catch (error) {
        res.status(401).render('login');
    }
}


module.exports = auth;


