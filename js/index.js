class Validator {
  constructor () {
    this.validator = [
      "data-required",
      "data-min-length",
      "data-max-length"
    ];
  }
  
  validate(form) {
    let currentValidations = document.querySelectorAll("form .error-validation");
    if (currentValidations.length > 0) {
      this.cleanValidations(currentValidations);
    }
    let inputs = form.getElementsByTagName("input");
    let inputsArray = [...inputs];
    
    inputsArray.forEach((input) => {
      for (let i = 0; this.validator.length > i; i++) {
        if (input.getAttribute(this.validator[i]) != null) {
          let method = this.validator[i].replace("data-", "").replace("-", "");
          let value = input.getAttribute(this.validator[i]);
          this[method](input, value);
        }
      }
    }, this);
  }
  
  minlength(input, minValue){
    let inputLength = input.value.length;
    let errorMessage = `O campo deve ter pelo menos ${minValue} caracteres`;
    
    if (inputLength < minValue) {
      this.printMessage(input, errorMessage);
    }
  }
  
  maxlength(input, maxValue) {
    let inputLength = input.value.length;
    let errorMessage = `O campo deve ter menos do que ${maxValue} caracteres`;
    
    if (inputLength > maxValue) {
      this.printMessage(input, errorMessage);
    }
  }
  
  required(input) {
    let inputValue = input.value; 
    if (inputValue === "") {
      let errorMessage = "Esse campo é obrigatório";
      
      this.printMessage(input, errorMessage);
    }
  }
  
  
  printMessage(input, msg){
    let errorsQtd = input.parentNode.querySelector(".error-validation");
    
    if (errorsQtd == null) {
      
    
    let template = document.querySelector(".error-validation").cloneNode(true);
    template.textContent = msg;
    let inputParent = input.parentNode;
    template.classList.remove("template");
    inputParent.appendChild(template);
    }
  }
  
  cleanValidations(validations) {
    validations.forEach(el => el.remove());
  }
}

let formValidator = new Validator();

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  
  formValidator.validate(form);
});