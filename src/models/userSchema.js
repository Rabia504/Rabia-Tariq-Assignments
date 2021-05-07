const mongoose = require("mongoose");
const validator = require("validator");

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
      }

 });
//collection creation
 const User = new mongoose.model("User", userSchema);

 module.exports = User;
 