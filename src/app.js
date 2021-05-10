require('dotenv').config();
const express = require("express");
const path = require("path");
const session = require('express-session');
const ejs = require("ejs");
const UserRouter = require("./routers/userRouter");
const PostRouter = require("./routers/postRouter");
var cookieParser = require('cookie-parser')


const port =  process.env.PORT || 8000;
const app = express();

app.use(session({ secret: 'Shhh',
                  resave: true,
                  saveUninitialized: true}))

const viewsPath = path.join(__dirname,"../templates/views");
const partialPath = path.join(__dirname,"../templates/partials");
const publicPath = path.join(__dirname, '..', 'public');

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:false}));

//for displaying dynamic content
app.set('view engine','ejs');
app.set("views",viewsPath);
//ejs.registerPartials(partialPath);
app.use(express.static(publicPath));

app.use (UserRouter);
app.use (PostRouter);




app.listen(port,()=>{
    console.log(`listening to ${port}`);
})
