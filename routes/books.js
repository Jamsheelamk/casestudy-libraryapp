const express=require('express');
const bodyParser=require('body-parser');
const multer=require('multer');


const fs=require('fs');


//let booksArray=require('../util/booksArray.json');

const imageStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/images/');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }

});

const booksRouter=express.Router();
const bookModel=require('../models/bookModel');

booksRouter.use(bodyParser.urlencoded({extended:true}));
booksRouter.use(multer({storage:imageStorage}).single('authorpic'));

booksRouter.get('/', async(req,res)=>{
    bookModel.find()
    .then((books)=>{
        res.render('books',{books,
            isLoggedIn:req.session.isLoggedIn||false,
            isAdmin:req.session.isAdmin||false,
            userId:req.session.userId||false
        });
    })
    .catch((err)=>{
        console.log('failed to fetch books from db',err);
    })
    
});
booksRouter.route('/addNewBook')
.get((req,res)=>{
    res.render('addOrUpdateBook',{
        pageTitle: 'Add New Book',
        path: '/books/addNewBook',
        editing: false,
        isLoggedIn:req.session.isLoggedIn||false,
        isAdmin:req.session.isAdmin||false,
        userId:req.session.userId||false
      });
})
.post((req,res)=>{
    console.log(req.file);
    
    const name=req.body.bookName;
    const author=req.body.author;
    const genre=req.body.genre;
    const pic=req.file.filename;
    const about=req.body.about;
    const book=new bookModel({
        title:name,
        author:author,
        genre:genre,
        bookPic:pic,
        about:about

    });

    
    book.save()
    .then(()=>{
        console.log('book added to db');
        res.redirect('/books');

    })
    .catch((err)=>{
        console.log('failed to save book to db',err);
    })
      
});
booksRouter.route('/updateBook/:id')
.get((req,res)=>{
    const bookId=req.params.id;
    bookModel.findById(bookId)
    .then((book)=>{
        res.render('addOrUpdateBook',{
            pageTitle: 'Update Book',
            path: `/books/updateBook/${bookId}`,
            editing: true,
            book:book,
            isLoggedIn:req.session.isLoggedIn||false,
            isAdmin:req.session.isAdmin||false,
            userId:req.session.userId||false
          });
    })
    .catch((err)=>{
        console.log('failed to fetch  book for update',err);
    })
    
})
.post((req,res)=>{
    console.log(req.file);
    const bookId=req.params.id;
    const name=req.body.bookName;
    const author=req.body.author;
    const genre=req.body.genre;
    const pic=req.file.filename;
    const about=req.body.about;
    bookModel.findByIdAndUpdate(bookId,
        {
            title:name,
            author:author,
            genre:genre,
            bookPic:pic,
            about:about
    
        })
    .then(()=>{
        console.log('book data updated successfully');
        
        // const filePath = `../public/images/${pic}`; 
        // fs.unlinkSync(filePath);
        res.redirect('/books');

    })
    .catch((err)=>{
        console.log('failed to update book data to db',err);
    })
    

    
});
booksRouter.post('/deleteBook',(req,res)=>{
    const bookId=req.body.bookId;
    bookModel.findByIdAndRemove(bookId)
    .then(()=>{
        console.log('book deleted successfully');
        res.redirect('/books');

    })
    .catch((err)=>{
        console.log('book delete failed',err);
    })
})
booksRouter.get('/:id',(req,res)=>{
    
    let id=req.params.id;
    bookModel.findById(id)
    .then((book)=>{
        res.render('singleBook',{book,
            isLoggedIn:req.session.isLoggedIn||false,
            isAdmin:req.session.isAdmin||false,
            userId:req.session.userId||false});
    })
    .catch((err)=>{
        console.log('failed to fetch single book',err);
    })
    
});


module.exports=booksRouter;