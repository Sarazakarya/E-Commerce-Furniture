let swiperProduc = document.querySelector('.swiper-slide');
let ProductDescription = document.querySelector('.Product-Des');

// Rendering products
function renderproducts(items) {
    ProductDescription.innerHTML = ``
    ProductImageSlider2.forEach((element, index) => {
        let additemfav = JSON.parse(localStorage.getItem("productFav")) || [];
        const isFavorited = additemfav.some((item) => item.id === element.id);
        // Render for New Arrival Section
        ProductDescription.innerHTML += `
  <h6 class='title-product'>${element.titel}</h6>


                            <div class="star-img"><img src="../images/product-item/4.5.png" alt=""></div>
                            <hr>

      <div class="price-quntity">
                            <div class="col-md-6">
                            <div class="proudct-price">
                                <p><span>$550.00</span> </p>
                                |
                                <h5>${element.price}$</h5>
                                <button>-64%</button>
                            </div>
                            <button id="favButton${element.id}" onclick="AddToFav(${element.id}, this)">
                            ${isFavorited ? '<i class="fa-solid fa-heart FavBtn" style="color: #ff0000;"></i>' : '<i class="fa-regular fa-heart FavBtn"></i>'}
                          </button>
                            <p class="about-product">
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                                dolor.
                                Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
                                ridicu lus
                                mus. Donec quam felis, ultri cies nec, pellentesque...
                            </p>
                            <div class="progress">
                                <div class="progress-bar" role="progressbar"
                                    style="width: 95%;background: linear-gradient(90deg, rgba(249, 200, 88, 1), rgba(255, 130, 70, 1) 100%);"
                                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>

                            <p class="product-type"><span>95% </span>Sold - Only 75 item(s) left in stock!</p>

                            <div class="kind">
                                <h4>Tags:</h4>
                                <p>Pink</p>
                            </div>
                            <div class="kind">
                                <h4>SKU:</h4>
                                <p> E-00024</p>
                            </div>
                            <div class="kind differnt-kind">
                                <h4>CATEGORY:</h4>
                                <p>Armchair, Bathroom, Clocks, Flash Deals, Hanging Light, <br> Home page, Planter,
                                    Sofa, Tables
                                </p>
                            </div>

                    </div>

                    <div class="col-md-6">
                            <div class="product-quntity">
                                <h6>QUANTITY:</h6>
                                <div class="quntity">
                                    <div class="quntity-Amount">
                                        <button class="btn-icon" onclick="decrementAmount(${element.id})"> <i class="fa-solid fa-minus"></i></button>
                                        <p>${element.require}</p>
                                        <button class="btn-icon" onclick="incrementAmount(${element.id})"> <i class="fa-solid fa-plus"></i></button>
                                    </div>
                                    <button class="Add-btn" onclick="addToCart(${element.id})">Add to Bags</button>
                                </div>

                                <div class="Payment-by">
                                    <button>
                                        <p>Buy with
                                            <span class="first-span"> Pay <span class="second-span">Pal</span></span>
                                        </p>
                                    </button>
                                </div>
                                <hr class="payment-hr">
                                <div class="payment-visa">
                                    <h6>GUARANTEED SAFE CHECKOUT:</h6>
                                    <img src="../images/product-item/payment_700x.avif" alt="">

                                </div>

                                <div>

                                    <div class="order">
                                        <i class="fa-regular fa-clock"></i>
                                        <p>Orders ship within 5 to 10 business days</p>
                                    </div>
                                    <div class="order">
                                        <i class="fa-solid fa-truck" style="color: #a8acb3;"></i>
                                        <p>Hoorey ! This item ships free to the US</p>
                                    </div>
                                </div>

                            </div>

                        </div>
                        </div>
                        </div>`;
    });

}
renderproducts();
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

function AddToFav(id, clickedButton) {
    if (getUserName) { // assuming getUserName is a function
        let choosefavItem = ProductImageSlider2.find((item) => item.id === id);
        let additemfav = JSON.parse(localStorage.getItem("productFav")) || [];

        if (additemfav.length === 0) {
            additemfav.push(choosefavItem);
        } else {
            let foundFav = false;
            additemfav.forEach(element => {
                if (element.id === id) {
                    // Make sure your object structure has a property like require
                    // If not, modify this based on your object structure
                    if ('require' in element) {
                        element.require++;
                    } else {
                        // If 'require' property doesn't exist, you may add it
                        element.require = 1;
                    }
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

// Click On Add-Btn
function addToCart(id) {
    if (getUserName) {
        let chooseItem = ProductImageSlider2.find((item) => item.id === id);
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
        total();

    }
    else {
        window.location = './/assets/pages/register.html'
    }
}


function incrementAmount(id) {
    ProductImageSlider2.forEach(() => {
        let item = ProductImageSlider2.find((item) => item.id === id); {
            if (item.require < 5) {
                let items = item.require++
                renderproducts(items)

            }
        }
    })
}



// click at Descremant-Btn
function decrementAmount(id) {
    ProductImageSlider2.forEach(() => {
        let item = ProductImageSlider2.find((item) => item.id === id);
        if (item.require > 1) {
            let items = item.require--;
            renderproducts(items)
        }
    })
}









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


//lick-change
function makeActiveLink() {
    var links = document.querySelectorAll(".policy-link a");
    links.forEach(element => {
        element.addEventListener('click', () => {
            var activelink = document.querySelector(".active-link");
            if (element.classList = 'normal') {
                activelink.classList.remove('active-link');
                activelink.classList.add('normal');
                element.classList.remove('normal');
                element.classList.add('active-link');
            }
        });
    });
}
makeActiveLink();

// Change-Content
let descriptionl = document.querySelector('.descriptionl');
let policyDsecription = document.querySelector('.policy-dsecription');
let Deliver = document.querySelector('.Deliver');
let policyDelivery = document.querySelector('.policy-delivery');
let policyShiping = document.querySelector('.policy-shiping');
let polic = document.querySelector('.polic');
var firstHr = document.querySelector(".first-hr");
var seconHr = document.querySelector(".socnd-hr");
var thirdhr = document.querySelector(".third-hr");

descriptionl.addEventListener('click', () => {
    policyDsecription.style.display = "block";
    policyShiping.style.display = "none";
    policyDelivery.style.display = "none";
    firstHr.style.display = 'block';
    seconHr.style.display = 'none';
    thirdhr.style.display = 'none';
});

Deliver.addEventListener('click', () => {
    policyDsecription.style.display = "none";
    policyShiping.style.display = "none";
    policyDelivery.style.display = "block";
    firstHr.style.display = 'none';
    seconHr.style.display = 'block';
    thirdhr.style.display = 'none';
});

polic.addEventListener('click', () => {
    policyDsecription.style.display = "none";
    policyDelivery.style.display = "none";
    policyShiping.style.display = "block";
    firstHr.style.display = 'none';
    seconHr.style.display = 'none';
    thirdhr.style.display = 'block';
});