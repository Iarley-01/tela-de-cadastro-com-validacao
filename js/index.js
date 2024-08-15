class Validator {
  constructor () {
    this.validator = [
      "data-min-length",
    ];
  }
  
  validate(form) {
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
  
  printMessage(input, msg){
    let template = document.querySelector(".error-validation").cloneNode();
    template.textContent = msg;
    let inputParent = input.parentNode;
    template.classList.remove("template");
    inputParent.appendChild(template);
  }
}

let formValidator = new Validator();

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  
  formValidator.validate(form);
});