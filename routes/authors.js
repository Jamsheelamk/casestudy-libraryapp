const express=require('express');
const bodyParser=require('body-parser');
const multer=require('multer');

const imageStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/images/');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }

});

const authorModel=require('../models/authorModel');

const authorsRouter=express.Router();

authorsRouter.use(bodyParser.urlencoded({extended:true}));
authorsRouter.use(multer({storage:imageStorage}).single('authorpic'));


authorsRouter.get('/',(req,res)=>{
    authorModel.find()
    .then((authors)=>{
        res.render('authors',{authors,
            isLoggedIn:req.session.isLoggedIn||false,
            isAdmin:req.session.isAdmin||false,
            userId:req.session.userId||false});
    })
    .catch((err)=>{
        console.log('failed',err);
    })
    
});





authorsRouter.route('/addNewAuthor')
.get((req,res)=>{
    res.render('addOrUpdateAuthor',{
        pageTitle: 'Add New Author',
        path: '/authors/addNewAuthor',
        editing: false,
        isLoggedIn:req.session.isLoggedIn||false,
        isAdmin:req.session.isAdmin||false,
        userId:req.session.userId||false
      });
})
.post((req,res)=>{
    console.log(req.file);
    
    const name=req.body.authorName;
    const authorWorks=req.body.authorWorks;
    const pic=req.file.filename;
    const about=req.body.about;
    const book=new authorModel({
        name:name,
        authorWorks:authorWorks,
        authorPic:pic,
        about:about

    });

    
    book.save()
    .then(()=>{
        console.log('author added');
        res.redirect('/authors');

    })
    .catch((err)=>{
        console.log('failed',err);
    })
      
});


authorsRouter.route('/updateAuthor/:id')
.get((req,res)=>{
    const authorId=req.params.id;
    authorModel.findById(authorId)
    .then((author)=>{
        res.render('addOrUpdateAuthor',{
            pageTitle: 'Update Author',
            path: `/authors/updateAuthor/${authorId}`,
            editing: true,
            author:author,
            isLoggedIn:req.session.isLoggedIn||false,
            isAdmin:req.session.isAdmin||false,
            userId:req.session.userId||false
          });
    })
    .catch((err)=>{
        console.log('failed',err);
    })
    
})
.post((req,res)=>{
    console.log(req.file);
    const authorId=req.params.id;
    const name=req.body.authorName;
    const authorWorks=req.body.authorWorks;
    const pic=req.file.filename;
    const about=req.body.about;
    authorModel.findByIdAndUpdate(authorId,
        {
            name:name,
            authorWorks:authorWorks,
            authorPic:pic,
            about:about
    
        })
    .then(()=>{
        console.log('author updated');
        
       
        res.redirect('/authors');

    })
    .catch((err)=>{
        console.log('failed',err);
    })
    

    
});
authorsRouter.post('/deleteAuthor',(req,res)=>{
    const authorId=req.body.authorId;
    authorModel.findByIdAndRemove(authorId)
    .then(()=>{
        console.log('author deleted');
        res.redirect('/authors');

    });
    // .catch((err)=>{
    //     console.log('failed',err);
    // });
});


// authorsRouter.get('/:id',(req,res)=>{
    
//     let id=req.params.id;
//     authorModel.findById(id)
//     .then(()=>{
//         res.render('singleAuthor',{book,
//             isLoggedIn:req.session.isLoggedIn||false,
//             isAdmin:req.session.isAdmin||false,
//             userId:req.session.userId||false});
//     });
    
// });





module.exports=authorsRouter;