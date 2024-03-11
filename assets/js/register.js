let email = document.querySelector("#email");
let username = document.querySelector("#username");
let password = document.querySelector("#password");
let registerBtn = document.querySelector("#sighnUp");
let error = document.querySelectorAll('.error-des');
let usernameInp = document.querySelector(".username-inp")
let PasswordInp = document.querySelector(".PasswordInp");
let emailInpt = document.querySelector(".emailInpt");
let inpts = document.querySelectorAll(".inp");

// click-btn
registerBtn.addEventListener('click', register)


//check-register
function register(e) {
    e.preventDefault();
    let isValid = true;


    // check Username\password\email
    let check = email.value
        .trim()
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

    for (let i = 0; i < inpts.length; i++) {
        if (inpts[i].value == "") {
            error[i].style.display = "block";
            isValid = false;
        } else {
            error[i].style.display = "none";
        }
    }
    // check for email
    if (!check) {
        emailInpt.style.display = "block";
        isValid = false;
    }
    else {
        emailInpt.style.display = "none"
    }
    // check for username
    if (username.value.length < 2) {
        usernameInp.style.display = "block"
    }
    else {
        usernameInp.style.display = "none"
    }
    // check for password
    if (password.value.length < 8) {
        PasswordInp.style.display = "block";
        isValid = false;
    } else {
        PasswordInp.style.display = "none";
    }
    if (isValid) {
        localStorage.setItem('email', email.value);
        localStorage.setItem('username', username.value);
        localStorage.setItem('password', password.value);
        openLoader()
        setTimeout(() => {
            window.location.href = '../pages/Login.html';
        }, 3000);
    }
}
let loader = document.querySelector('#loader');
function openLoader() {
    loader.style.display = "flex";
}
function closeLoader() {
    loader.style.display = "none";
}
window.addEventListener('load', () => {
    closeLoader();
});


