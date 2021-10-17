const express=require('express');
const mongoose=require('mongoose');
const session=require('express-session');
const MongoDBStore=require('connect-mongodb-session')(session);

const loginRouter=require('./routes/login');
const signupRouter=require('./routes/signup');
const booksRouter=require('./routes/books');
const authorsRouter=require('./routes/authors');

const app=express();
const MONGODB_URI='mongodb+srv://zebralib-user:zebralib-user-password@cluster-zebralib.xh777.mongodb.net/library?retryWrites=true&w=majority';
const PORT = process.env.PORT || 2000;

const store= new MongoDBStore({
 uri:MONGODB_URI,
 collection:'sessions'
});

app.set('view engine','ejs');
app.use(express.static('public/js'));
app.use(express.static('public/css'));
app.use(express.static('public/images'));

//setting up session middleware
app.use(session({
    secret:'my session hash key',
    resave:false,
    saveUninitialized:false,
    store:store
}));

//main route
app.get('/',(req,res)=>{
    res.render('index',{
        isLoggedIn:req.session.isLoggedIn||false,
        isAdmin:req.session.isAdmin||false,
        userId:req.session.userId||false
    });
});
app.get('/booksjson',(req,res)=>{
    res.sendFile('./util/booksArray.json');
})
app.use('/logIn',loginRouter);
app.use('/signUp',signupRouter);
app.use('/books',booksRouter);
app.use('/authors',authorsRouter);

app.get('/logOut',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})



// app serving in a perticular port
mongoose.connect(MONGODB_URI,{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`app serving at port ${PORT}`);
    });
})
.catch((err)=>{
    console.log('failed to conncet to mongoDB atlas',err);
})
