let name = document.querySelector('.name');
let email = document.querySelector('.email');
let phone = document.querySelector('.phone');
let textArea = document.querySelector('.textarea');
let submit = document.querySelector('.submit');


submit.addEventListener('click', () => {
    if (name.value == "" || email.value == "" || phone.value == "" || textArea.value == "") {
        alert('fill your data please')
    }
    else {
        localStorage.setItem('name', name.value);
        localStorage.setItem('EmailSubmit', email.value);
        localStorage.setItem('phone', phone.value);
        localStorage.setItem('textArea', textArea.value);
    }
})















