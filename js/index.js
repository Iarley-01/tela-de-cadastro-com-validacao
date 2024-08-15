class Validator {
  constructor () {
    this.validator = [
      
    ];
  }
  
  validate(form) {
    let inputs = form.getElementsByTagName("input");
    let inputsArray = [...inputs];
    
    inputsArray.forEach((input) => {
      console.log(input);
    });
  }
}

let formValidator = new Validator();

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  
  formValidator.validate(form);
});