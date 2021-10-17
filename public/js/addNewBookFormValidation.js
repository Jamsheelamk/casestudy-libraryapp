const errorFlags={
    bookNameErrFlag:true,
    authorErrFlag:true,
    genreErrFlag:true,
    
    aboutErrFlag:true,
}
function get(str){
    return document.querySelector(str);
}
const about=get('#about');
const aboutError=get('#aboutError');

const bookName=get('#bookName');
const bookNameError=get('#bookNameError');
const author=get('#author');
const authorError=get('#authorError');
const signUpBtn1=get('#signUpBtn');
const genre=get('#genre');
const genreError=get('#genreError');
const authorpic=get('#authorpic');
const authorpicError=get('#authorpic');




const inputValidate=function(input,err,regExp){
    
    let val=input.value.trim();
    let flagName=input.id+"ErrFlag";
    if(!regExp.test(val)){
        
        errorFlags[flagName]=true;
        const msg=`Invalid  ${input.id} `;
        err.innerHTML=msg;
        err.classList.remove('hidden');
    }
    else{
        errorFlags[flagName]=false;
        const msg='';
        err.innerHTML=msg;
        err.classList.add('hidden');
        
    }
};



// non empty validation
function ifEmpty(el){
        let ErrFlag=`${el.id}ErrFlag`;
        if(el.value===''){
            
            errorFlags[ErrFlag]=true;
            const elError=get(`#${el.id}Error`);
            elError.innerHTML='this field can not be empty';
            elError.classList.remove('hidden');
            return true;
        }
        else{
            
            errorFlags[ErrFlag]=false;
            console.log(errorFlags[ErrFlag]);
            return false;
        }
    
}
// sub function for hiding error message of non empty
function errMsgRemove(el){
    const elError=get(`#${el.id}Error`);
    el.addEventListener('input',()=>{
        elError.classList.add('hidden');
    })
}
if(bookName){
    errMsgRemove(bookName);
}
if(author){
    errMsgRemove(author);
}
if(genre){
    errMsgRemove(genre);
}
if(about){
    errMsgRemove(about);
}
if(authorpic){
    errMsgRemove(authorpic);
}




// validate function prevent form from submiting if any of the flags is true
function validate(e){
    for(let flag in errorFlags){
        if(errorFlags[flag]===true){
            
            console.log(errorFlags[flag]);
            e.preventDefault();
            return;
        }
        
    }
}

// if(signUpBtn1){
//     signUpBtn.addEventListener('click',validate);
// }



const loginBtn1 =get('#loginBtn');
// preventing login from submisssion on password error
if(loginBtn1){
    loginBtn1.addEventListener('click',function(e){
        if(errorFlags[password]===true){
            e.preventDefault();
            return;
        }
    });
}



// this is jquery for show/hide password.

$(".toggle-password").click(function() {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });