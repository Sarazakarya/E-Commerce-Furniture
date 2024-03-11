
let bestSellerProducts = document.querySelector(".collection-sec .new-products");
let active = document.querySelector(".activ");
let normal = document.querySelector(".normal");
let firstProduct = document.querySelector('.left-sec .new-products');
let secondProduct = document.querySelector('.Noraml-section ')


function Collection() {
    // Rendering products
    PlanternProduct.forEach((element) => {
        let additemfav = JSON.parse(localStorage.getItem("productFav")) || [];
        const isFavorited = additemfav.some((item) => item.id === element.id);

        // Render for New Arrival Section
        bestSellerProducts.innerHTML += `
        <div class="col-md-4 discount-section">
          <img src="${element.image}" alt="" class="Arrival-img">
          <div class="New-des">
            <h6>${element.titel}</h6>
            <p>$ ${element.price}</p>
            <button class="header-btn" onclick="AddToCart(${element.id})">Add To Cart</button>
            <button id="favButton${element.id}" onclick="AddToFav(${element.id}, this)">
              ${isFavorited ? '<i class="fa-solid fa-heart FavBtn" style="color: #ff0000;"></i>' : '<i class="fa-regular fa-heart FavBtn"></i>'}
            </button>
          </div>
          ${element.discount !== undefined ? `<button class="discount">${element.discount}%</button>` : ''}
        </div>`;
    });
}
Collection();

function renderFavoritesOnLoad() {
    let additemfav = JSON.parse(localStorage.getItem("productFav")) || [];
    additemfav.forEach(item => {
        const button = document.getElementById(`favButton${item.id}`);
        if (button) {
            button.innerHTML = `<i class="fa-solid fa-heart" style="color: #ff0000;"></i>`;
        }
    });
}

// Call the renderFavoritesOnLoad function when the page loads
document.addEventListener('DOMContentLoaded', function () {
    renderFavoritesOnLoad();
});


// Add To Favourite Button
function AddToFav(id, clickedButton) {
    if (getUserName) { // assuming getUserName is a function
        let choosefavItem = topTrending.find((item) => item.id === id);
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
        clickedButton.innerHTML = `<i class="fa-solid fa-heart" style="color: #ff0000;"></i>`
        localStorage.setItem("productFav", JSON.stringify(additemfav));
        renderFavPadge(additemfav);
    } else {
        window.location = '../pages/register.html';
    }
}

function renderFavPadge() {
    let additemfav = JSON.parse(localStorage.getItem("productFav")) || [];
    let padge = document.querySelectorAll('.padge-react');
    padge.forEach(element => {
        element.style.display = additemfav.length > 0 ? 'block' : 'none';
        element.innerHTML = additemfav.length;
    });
}
renderFavPadge();

// Click On Add-Btn
function AddToCart(id) {
    if (getUserName) {
        let chooseItem = PlanternProduct.find((item) => item.id === id);
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
        window.location = './/assets/pages/register.html'
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

// Add Active TO BTN
normal.addEventListener('click', () => {
    active.classList.remove('activ');
    active.classList.add('normal');
    normal.classList.remove('normal');
    normal.classList.add('activ');
    firstProduct.style.display = "none";
    secondProduct.style.display = "block";
})
// Add Active TO BTN
active.addEventListener('click', () => {
    normal.classList.remove('activ');
    normal.classList.add('normal');
    active.classList.remove('normal');
    active.classList.add('activ');
    firstProduct.style.display = "flex";
    secondProduct.style.display = "none";
})

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


swiper = new Swiper(".Collection-Swiper", {
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