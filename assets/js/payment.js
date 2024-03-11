
let getUserName = localStorage.getItem("username");
let totalPrice = document.querySelector('.total-price');
let totalPriceProduct = document.querySelector('.total-priceProduct');
let additem = JSON.parse(localStorage.getItem("productIncard")) || [];
let PriceProducts = document.querySelector('.Price-products');
let PayNow = document.querySelector('.Pay-Now');

// input
let error = document.querySelectorAll('.error-des');

let email = document.querySelector(".email");
let EmailInp = document.querySelector(".emailInpt");

let Name = document.querySelector(".boxs");
let NameInp = document.querySelector(".NameInpt");

let Address = document.querySelector('.Address');
let AddressInp = document.querySelector(".AddressInp")

let CardNumber = document.querySelector(".Card-number");
let CardNumInp = document.querySelector(".Cardnumber");

let City = document.querySelector(".box-postal");
let CityInpt = document.querySelector(".City-inp");

let DateNum = document.querySelector(".box");
let DateInp = document.querySelector(".DateNum");

let CardName = document.querySelector(".NameCard");
let CardNameInp = document.querySelector(".CardNameInp");

let inpts = document.querySelectorAll(".inp");
PayNow.addEventListener('click', payment);
function payment() {
    let isValid = true; // Define isValid variable

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
        EmailInp.style.display = "block";
        isValid = false;
    }
    else {
        EmailInp.style.display = "none"
    }
    // check for username
    if (Name.value.length < 2) {
        NameInp.style.display = "block"
    }
    else {
        NameInp.style.display = "none"
    }
    // check for Address
    if (Address.value.length < 8) {
        AddressInp.style.display = "block";
        isValid = false;
    } else {
        AddressInp.style.display = "none";
    }
    // check for city
    if (City.value.length < 8) {
        CityInpt.style.display = "block";
        isValid = false;
    } else {
        CityInpt.style.display = "none";
    }

    // check for Date
    if (DateNum.value.length < 8) {
        DateInp.style.display = "block";
        isValid = false;
    } else {
        DateInp.style.display = "none";
    }

    // check for CardName
    if (CardName.value.length < 2) {
        CardNameInp.style.display = "block";
        isValid = false;
    } else {
        CardNameInp.style.display = "none"; // Corrected from CardNumInp
    }
    // check for CardNumber
    if (CardNumber.value.length < 8) {
        CardNumInp.style.display = "block";
        isValid = false;
    } else {
        CardNumInp.style.display = "none";
    }

    if (isValid) {
        localStorage.setItem('Vesa', JSON.stringify([
            {
                "Email": email.value,
                "Address": Address.value,
                "Name": Name.value,
                "City": City.value,
                "DateNum": DateNum.value,
                "CardName": CardName.value,
                "CardNum": CardNumber.value,
            }
        ]));

        openLoader();

        setTimeout(() => {
            localStorage.removeItem('productIncard');
            window.location.href = '../pages/index.html';
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


function renderProductsInDiv() {
    let additem = JSON.parse(localStorage.getItem("productIncard")) || [];
    totalPriceProduct.innerHTML = ``

    additem.forEach(element => {
        totalPriceProduct.innerHTML += `
        <tr>
        <div class="img-price">
        <img src="${element.image}" alt="">
        <p>${element.titel}</p>'
        <h5>${element.price}</h5>
    </div>
  </tr>`
    });
}
renderProductsInDiv()

function total() {
    let additem = JSON.parse(localStorage.getItem("productIncard")) || [];
    let total = 0;
    if (additem.length === 0) {
        totalPrice.innerHTML = `<h5>0$</h5>`
    }
    else {
        for (let i = 0; i < additem.length; i++) {
            total += additem[i].price * additem[i].require;
            PriceProducts.innerHTML += ``
            PriceProducts.innerHTML = `<h5>${total}$</h5>`
            PriceProducts.innerHTML = `
              <h6>Total:</h6>
               <h4>${total} $</h4>`
        }
    }
}
total()
