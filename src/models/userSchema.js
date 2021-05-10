const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

 const userSchema = new mongoose.Schema({
     fullname: {
         type:String,
         required : true
     },
     username: {
        type:String,
        required : true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate:{
            validator: validator.isEmail,
            message: 'invalid email',
            isAsync: false
          }
      },
      password: {
        type: String,
        required: true,
        minlength: 8
      },
      gender: {
        type: String
      },
      dateOfBirth: {
        type: Date
      },
      phoneNo : {
        type: Number,
        unique: true,
        min: 10
      },
      bio: {
        type: String
      },
      followers: {
        type: [String]
      },
      following: {
        type: [String]
      },
      tokens:[{
        token:{
          type:String,
          required:true
        }
      }]

 });

 userSchema.methods.createAuthToken = async function(){
   try {
    const token = await jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token});
    await this.save();
    console.log(token);
    return token;
   } catch (error) {
    console.log(error);
   }
 }

//collection creation
 const User = new mongoose.model("User", userSchema);

 module.exports = User;
 