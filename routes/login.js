const express=require('express');
const userModel=require('../models/userModel');

const loginRouter=express.Router();
loginRouter.use(express.urlencoded({extended:true}));

loginRouter.route('/').
get((req,res)=>{
    res.render('logIn',{
        unameEntered:false,
        passwordEntered:false,
        errorMsg:false,
        isLoggedIn:req.session.isLoggedIn||false,
        isAdmin:req.session.isAdmin||false,
        userId:req.session.userId||false
    });
})
.post((req,res)=>{
    const {uname,password}=req.body;
userModel.findOne({uname:uname,password:password})
.then((user)=>{
    if(!user){
        res.render('logIn',{
            unameEntered:uname,
            passwordEntered:password,
            errorMsg:'username password mismatch. No valid user found',
            isLoggedIn:req.session.isLoggedIn||false,
            isAdmin:req.session.isAdmin||false,
            userId:req.session.userId||false});
    }
    else{
        req.session.isLoggedIn=true;
        req.session.userId=user._id;
        if(user.userClass==='admin'){
            req.session.isAdmin=true;
        }
        res.redirect('/');
    }
})
})

module.exports=loginRouter;