
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
    window.location = '../pages/register.html'
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



// Function to render elements in the sidebar
function renderElemnetSideBar() {
  let additem = JSON.parse(localStorage.getItem("productIncard")) || [];
  sidebarProduct.innerHTML = ``;
  additem.forEach((element, index) => {
    sidebarProduct.innerHTML += `
      <div class="side-elemrnt">
        <div>
          <img src="${element.image}" alt="" class="sidebar-img">
        </div>
        <div>
          <h5>${element.titel}</h5>
          <h5>${element.price}</h5>
          <div class="quntity-count">
            <button class="btn-icon" onclick="decrement(${element.id})">
              <i class="fa-solid fa-minus" style="color: #b3b3b3;"></i>
            </button>
            <p class="reqi">${element.require}</p>
            <button class="btn-icon" onclick="increment(${element.id})">
              <i class="fa-solid fa-plus" style="color: #b3b3b3;"></i>
            </button>
            <i class="fa-solid fa-trash-can remove" style="color: #989898;" onclick="remove(${element.id})"></i>
          </div>
        </div>
      </div>`;
  });
}


// Click at Increament-Brt
function increment(id) {
  if (productIncard) {
    let items = JSON.parse(localStorage.getItem("productIncard"));
    let obj = items.find((item) => item.id == id);

    if (obj.id === undefined) {
      return;
    } else {
      if (obj.require < 5) {
        obj.require++;
        localStorage.setItem("productIncard", JSON.stringify(items));
        renderElemnetSideBar(items);
        total()
      }
    }
  }
}



// render elemrnt Not deleted in sidebar in sidebar 
function draw(products) {
  let productsUi = products.map((item) => {
    return `
      <div class="side-elemrnt">
        <div>
          <img src="${item.image}" alt="" class="sidebar-img">
        </div>
        <div>
          <h5>${item.titel}</h5>
          <h5>${item.price}</h5>
          <div class="quntity-count">
            <button class="btn-icon" onclick="decrement(${item.id})">
              <i class="fa-solid fa-minus" style="color: #b3b3b3;"></i>
            </button>
            <p class="reqi">${item.require}</p>
            <button class="btn-icon" onclick="increment(${item.id})">
              <i class="fa-solid fa-plus" style="color: #b3b3b3;"></i>
            </button>
            <i class="fa-solid fa-trash-can remove" style="color: #989898;" onclick="remove(${item.id})"></i>
          </div>
        </div>
      </div>
    `;
  });

  sidebarProduct.innerHTML = productsUi.join('');
}

// click at Descremant-Btn
function decrement(id, index) {
  if (productIncard) {
    let items = JSON.parse(localStorage.getItem("productIncard")) || []
    let obj = items.find((item) => {
      return item.id === id
    })
    if (obj.require > 1) {
      obj.require--;
      localStorage.setItem("productIncard", JSON.stringify(items));
      renderElemnetSideBar(obj, index);
      total()
    }
  }
}

// Click at Remove-btn
function remove(id) {
  if (productIncard) {
    let items = JSON.parse(localStorage.getItem("productIncard")) || [];
    let filteres = items.filter((item) => item.id !== id);
    localStorage.setItem("productIncard", JSON.stringify(filteres));
    draw(filteres);
    renderPadge();
    total()
  }
}

let productIncard = JSON.parse(localStorage.getItem("productIncard")) || [];
renderElemnetSideBar()

// Function to render the badge count
function renderPadge() {
  let additem = JSON.parse(localStorage.getItem("productIncard")) || [];
  let padge = document.querySelectorAll('.padge');
  padge.forEach(element => {
    element.style.display = additem.length > 0 ? 'block' : 'none';
    element.innerHTML = additem.length;
  });
}
renderPadge();


// Add To Favourite Button
function AddToFav(id, clickedButton) {
  if (getUserName) {
    let choosefavItem = bestSeller.find((item) => item.id === id);
    let additemfav = JSON.parse(localStorage.getItem("productFav")) || [];

    if (additemfav.length === 0) {
      additemfav.push(choosefavItem);
    } else {
      let foundFav = false;
      additemfav.forEach(element => {
        if (element.id === id) {
          element.require++;
          foundFav = true;
        }
      });

      if (!foundFav) {
        additemfav.push(choosefavItem);
      }
    }

    clickedButton.innerHTML = `<i class="fa-solid fa-heart" style="color: #ff0000;"></i>`;
    localStorage.setItem("productFav", JSON.stringify(additemfav));
    renderFavPadge(additemfav);
  } else {
    window.location = '../pages/register.html';
  }
}

// Call the renderFavoritesOnLoad function when the page loads
document.addEventListener('DOMContentLoaded', function () {
  renderFavoritesOnLoad();
});
function renderFavoritesOnLoad() {
  let additemfav = JSON.parse(localStorage.getItem("productFav")) || [];
  additemfav.forEach(item => {
    const button = document.getElementById(`favButton${item.id}`);
    if (button) {
      button.innerHTML = `<i class="fa-solid fa-heart" style="color: #ff0000;"></i>`;
    }
  });
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
    <img src="../images/BestSeller/2.webp" alt="">
    <div>
      <p>Luna Purchased! from New York, USA</p>
      <h6>Diamond Halo Stud Massa</h6>
    </div>
  </div>`;

  setTimeout(function () {
    toastContainer.style.display = 'none';

  }, 3000);
}

