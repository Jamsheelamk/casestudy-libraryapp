const formBtn1 = document.querySelector('#btn-1');
const formBtnPrev2 = document.querySelector('#btn-2-prev');
const formBtnNext2 = document.querySelector('#btn-2-next');
const formBtnPrev3 = document.querySelector('#btn-3-prev');
const formBtnNext3 = document.querySelector('#btn-3-next');
const formBtnPrev4 = document.querySelector('#btn-4-prev');
const formBtnNext4 = document.querySelector('#btn-4-next');
const formBtn5 = document.querySelector('#btn-5-prev');
const signUpBtn=document.querySelector('#signUpBtn');

// Button listener of form 1
formBtn1.addEventListener('click', function(e) {
  e.preventDefault();
  ifEmpty(bookName);
  console.log('button1 clicked');
  if(errorFlags.bookNameErrFlag===false ){
    gotoNextForm(formBtn1,formBtnNext2, 1, 2);
    
  }
  
});

// Next button listener of form 2
formBtnNext2.addEventListener('click', function(e) {
  e.preventDefault();
  ifEmpty(author);
  if(errorFlags.authorErrFlag===false){
    gotoNextForm(formBtnNext2, formBtnNext3, 2, 3);
   
  }
  
});

// Previous button listener of form 2
formBtnPrev2.addEventListener('click', function(e) {
  gotoNextForm(formBtnNext2, formBtn1, 2, 1);
  e.preventDefault();
});
// Previous button listener of form 3
formBtnPrev3.addEventListener('click', function(e) {
  gotoNextForm(formBtnNext3, formBtnNext2, 3, 2);
  e.preventDefault();
});
// Next button listener of form 3
formBtnNext3.addEventListener('click', function(e) {
  e.preventDefault();
  ifEmpty(genre);
  if(errorFlags.genreErrFlag===false ){
    gotoNextForm(formBtnNext3, formBtnNext4, 3, 4);
    
  }
  
});
// Previous button listener of form 4
formBtnPrev4.addEventListener('click', function(e) {
  gotoNextForm(formBtnNext4, formBtnNext3, 4, 3);
  e.preventDefault();
});
// Next button listener of form 4
formBtnNext4.addEventListener('click', function(e) {
  e.preventDefault();
  
  if(authorpic.files[0]){
    gotoNextForm(formBtnNext4, formBtn5, 4, 5);
  }
 
  
});
// Previous button listener of form 5
formBtn5.addEventListener('click', function(e) {
  gotoNextForm(formBtn5, formBtnNext4, 5, 4);
  e.preventDefault();
});

//signUp Button listener of form 5
signUpBtn.addEventListener('click', function(e) {
  e.preventDefault();
  ifEmpty(about);
  if(errorFlags.aboutErrFlag===false){
    document.querySelector(`.step--5`).classList.remove('step-active');
    document.querySelector(`.step--6`).classList.add('step-active');
    formBtn5.parentElement.style.display = 'none';
    document.querySelector('.form--message').innerHTML = `
    <h1 class="form--message-text"> ${get('#serverMessage').innerHTML} </h1>
    `;
    setTimeout(()=>{
      get('#addNewBookForm').submit();
    },2000);
  }
  
  
});

const gotoNextForm = (prev, next, stepPrev, stepNext) => {
  // Get form through the button
  const prevForm = prev.parentElement;
  const nextForm = next.parentElement;
  const nextStep = document.querySelector(`.step--${stepNext}`);
  const prevStep = document.querySelector(`.step--${stepPrev}`);
  // Add active/inactive classes to both previous and next form
  nextForm.classList.add('form-active');
  nextForm.classList.add('form-active-animate');
  prevForm.classList.add('form-inactive');
  // Change the active step element
  prevStep.classList.remove('step-active');
  nextStep.classList.add('step-active');
  // Remove active/inactive classes to both previous an next form
  setTimeout(() => {
    prevForm.classList.remove('form-active');
    prevForm.classList.remove('form-inactive');
    nextForm.classList.remove('form-active-animate');
  }, 1000);
};
