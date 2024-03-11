productNav = document.querySelector('.products-Nav');
let productDropdown = document.querySelector('.product-dropdown')
let collectionUl = document.querySelector('.collection-Nav')
let CollectioDropdown = document.querySelector('.Collectio-dropdown');
let otherPages = document.querySelector('.other-dropdown');
let OtherPagesUl = document.querySelector('.Other-pages')
let nav = document.querySelector("nav");
let backToTop = document.querySelector('.back')
// navBar-Ul
function handleDropdownEvents(navElement, dropdownElement) {
    navElement.addEventListener('mouseenter', () => {
        dropdownElement.style.display = "block";
        dropdownElement.classList.remove("animate__animated", "animate__fadeOut");
        dropdownElement.classList.add("animate__animated", "animate__fadeInUp");
    });

    navElement.addEventListener('mouseleave', () => {
        dropdownElement.classList.remove("animate__fadeInUp");
        dropdownElement.classList.add("animate__fadeOut");
        setTimeout(() => {
            dropdownElement.style.display = "none";
        }, 400)
    });
}
handleDropdownEvents(collectionUl, CollectioDropdown);
handleDropdownEvents(productNav, productDropdown);
handleDropdownEvents(OtherPagesUl, otherPages);

window.addEventListener('scroll', (e) => {
    if (window.scrollY > 0) {
        nav.classList.add("move-nabar");
        nav.classList.add("animate__fadeInDown");
        backToTop.style.display = "block";

    }
    else {
        nav.classList.remove("move-nabar");
        nav.classList.remove('animate__fadeInDown');
        backToTop.style.display = "none";
    }
})
function renderFavPadge() {
    let additemfav = JSON.parse(localStorage.getItem("productFav")) || [];
    let padge = document.querySelectorAll('.padge-react');
    padge.forEach(element => {
        element.style.display = additemfav.length > 0 ? 'block' : 'none';
        element.innerHTML = additemfav.length;
    });
}
renderFavPadge();

// Scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// logOut-btn
function logOut() {
    localStorage.clear();
    window.location = '../../index.html'
}



// sidebars
let mainDiv = document.querySelector('.main-side');
let CollectionPage = document.querySelector('.other-Collection');
let CollectioDiv = document.querySelector('.collection-page')
let btnIcon = document.querySelector('.other-Collection i');

let ProdcutDiv = document.querySelector('.Product-page');
let ProdcutPage = document.querySelector('.other-products')
let ProdcutIcon = document.querySelector('.other-products i');

let OtherDiv = document.querySelector('.Other-page');
let otherPage = document.querySelector('.other')
let OtherIcon = document.querySelector('.other i');

let sidebarLogo = document.querySelector('.sidebar-logo')
let iconlogo = document.querySelector('.icon-logo')

iconlogo.addEventListener('click', () => {
    sidebarLogo.style.display = 'block';
})

CollectioDiv.addEventListener('click', () => {
    CollectionPage.style.display = 'block';
    mainDiv.style.display = "none";
})
btnIcon.addEventListener('click', () => {
    CollectionPage.style.display = 'none';
    mainDiv.style.display = "block";
})

ProdcutDiv.addEventListener('click', () => {
    ProdcutPage.style.display = 'block';
    mainDiv.style.display = "none";
})
ProdcutIcon.addEventListener('click', () => {
    ProdcutPage.style.display = 'none';
    mainDiv.style.display = "block";
})
OtherDiv.addEventListener('click', () => {
    otherPage.style.display = 'block';
    mainDiv.style.display = "none";
})
OtherIcon.addEventListener('click', () => {
    otherPage.style.display = 'none';
    mainDiv.style.display = "block";
})
