let username = document.querySelector("#username");
let password = document.querySelector("#password");
let registerBtn = document.querySelector("#sighnUp");
let usernameInp = document.querySelector(".username-inp");
let PasswordInp = document.querySelector(".PasswordInp");
let errorMsg = document.querySelector(".error-msg")
let inpts = document.querySelectorAll(".inp");
let error = document.querySelectorAll('.error-des');
// LocalStorage
let getUser = localStorage.getItem("username");
let getPassword = localStorage.getItem("password");
let loader = document.querySelector('#loader');

// login 
registerBtn.addEventListener('click', login)

// check
function login(e) {
  e.preventDefault();
  let isValid = true;


  for (let i = 0; i < inpts.length; i++) {
    if (inpts[i].value == "") {
      error[i].style.display = "block";
      isValid = false;
    } else {
      error[i].style.display = "none";
    }
  }
  if (isValid) {
    if (username.value.trim() === getUser.trim() && password.value && password.value.trim() == getPassword.trim()) {
      openLoader()
      setTimeout(() => {
        window.location = '../pages/index.html'
      }, 2500);
    }
    else {
      errorMsg.style.display = "block";
    }
  }
}

// loader
function openLoader() {
  loader.style.display = "flex";
}
function closeLoader() {
  loader.style.display = "none";
}
window.addEventListener('load', () => {
  closeLoader();
});
