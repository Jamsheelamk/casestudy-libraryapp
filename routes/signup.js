const express=require('express');

const userModel=require('../models/userModel');

const signupRouter=express.Router();
signupRouter.use(express.urlencoded({extended:true}));

signupRouter.route('/')
.get((req,res)=>{
    res.render('signUp',{
        isLoggedIn:req.session.isLoggedIn||false,
        isAdmin:req.session.isAdmin||false,
        userId:req.session.userId||false
    });
})
.post((req,res)=>{

    const {name,uname,password,rpassword,email,mobile,dob,gender,address,classOfUser}=req.body;
    const user=new userModel({
        name,
        uname,
        email,
        mobile,
        password,
        dob,
        gender,
        address,
        userClass:classOfUser
    });
    user.save()
    .then(()=>{
        console.log('user added suuccessfully');
        res.redirect('/logIn');
    })
    .catch((err)=>{
        console.log('failed to store user details',err);
    });
});

module.exports=signupRouter;