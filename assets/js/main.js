
let bestSellerProducts = document.querySelector(".Best-seller .new-products");
let getUserName = localStorage.getItem("username");
let sidebarProduct = document.querySelector(".sidebar-product");
let totalPrice = document.querySelector('.total-price');
let newArrival = document.querySelector('.new-products');
let additem = JSON.parse(localStorage.getItem("productIncard")) || [];


bestSeller.forEach((element) => {
  bestSellerProducts.innerHTML += renderProduct(element);
  newArrival.innerHTML += renderProduct(element);
});

function renderProduct(element) {
  let additemfav = JSON.parse(localStorage.getItem("productFav")) || [];
  const isFavorited = additemfav.some((item) => item.id === element.id);

  return `
    <div class="col-lg-4 ol-md-6 discount-section bestSeller-Products">
      <img src="${element.image}" alt="" class="Arrival-img">
      <div class="New-des">
        <h6>${element.titel}.00</h6>
        <p>$ ${element.price}</p>
        <button class="header-btn Addbtn" onclick="AddToCart(${element.id})">Add To Cart</button>
        <button id="favButton${element.id}" onclick="AddToFav(${element.id}, this)">
          ${isFavorited ? '<i class="fa-solid fa-heart FavBtn" style="color: #ff0000;"></i>' : '<i class="fa-regular fa-heart FavBtn"></i>'}
        </button>
        ${element.discount !== undefined ? `<button class="discount">${element.discount}%</button>` : ''}
      </div>
    </div>`;
}



// calculate total
function total() {
  let additem = JSON.parse(localStorage.getItem("productIncard")) || [];
  let total = 0;
  if (additem.length === 0) {
    totalPrice.innerHTML = `<h5>0$</h5>`
  }
  else {
    for (let i = 0; i < additem.length; i++) {
      total += additem[i].price * additem[i].require;
      totalPrice.innerHTML += ``
      totalPrice.innerHTML = `<h5>${total}$</h5>`
    }
  }
}
total()


// Click On Add-Btn
function AddToCart(id) {
  if (getUserName) {
    let chooseItem = bestSeller.find((item) => item.id === id);
    let additem = JSON.parse(localStorage.getItem("productIncard")) || [];

    if (additem.length === 0) {
      additem.push(chooseItem);
    } else {
      let found = false;
      additem.forEach(element => {
        if (element.id === id) {
          element.require++;
          found = true;
        }
      });
      if (!found) {
        additem.push(chooseItem);
      }
    }
    localStorage.setItem("productIncard", JSON.stringify(additem));
    renderElemnetSideBar(additem)
    renderPadge(additem);
    showSubmitToast('Thank You');
    total()
  }
  else {
    window.location = './assets/pages/register.html'
  }
}
// toast
function showSubmitToast(message) {
  var toastSubmit = document.getElementById('toast-submit');
  toastSubmit.textContent = message;
  toastSubmit.style.display = 'block';
  toastSubmit.innerHTML = `<p>${message}</p>`; // Use the passed message

  setTimeout(function () {
    toastSubmit.style.display = 'none'; // Hide the toastSubmit element
  }, 2000);
}





// Render favourite product Number
function renderFavPadge() {
  let additemfav = JSON.parse(localStorage.getItem("productFav")) || [];
  let padge = document.querySelectorAll('.padge-react');
  padge.forEach(element => {
    element.style.display = additemfav.length > 0 ? 'block' : 'none';
    element.innerHTML = additemfav.length;
  });
}
renderFavPadge();


// Submit-Btn
let Submit = document.querySelector('.submit-btn');
let SubmitInp = document.querySelector('.sumit-inp');
Submit.addEventListener('click', () => {
  if (SubmitInp.value == '') {
    showSubmitToast('Fill your Data Please !');
  }
  else {
    localStorage.setItem('EmailSubmit', SubmitInp.value);
    showSubmitToast('Thank You');
    SubmitInp.value = '';
  }
});




// Swiper
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});



var swiper = new Swiper(".mySwiper", {});

const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
var swiper = new Swiper(".mys", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      progressCircle.style.setProperty("--progress", 1 - progress);
      progressContent.textContent = `${Math.ceil(time / 1000)}s`;
    }
  }
});


var swiper = new Swiper(".mySwi", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// GallerySwiper
swiper = new Swiper(".gallery-sw", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// NavSwiper
swiper = new Swiper(".myNavSwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// toast
document.addEventListener('DOMContentLoaded', function () {
  showToast();
});

function showToast(message) {
  var toastContainer = document.getElementById('toast-container');
  toastContainer.textContent = message;
  toastContainer.style.display = 'block';
  toastContainer.innerHTML = `<div class="toast-items">
    <img src="assets/images/BestSeller/2.webp" alt="">
    <div>
      <p>Luna Purchased! from New York, USA</p>
      <h6>Diamond Halo Stud Massa</h6>
    </div>
  </div>`;

  setTimeout(function () {
    toastContainer.style.display = 'none';

  }, 3000);
}

