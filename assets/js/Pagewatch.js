let productDiv = document.querySelector('.watch-sec');

let additemfav = JSON.parse(localStorage.getItem("productFav")) || [];
productDiv.innerHTML = ""; // Clear the content before rendering

function addItem() {
    additemfav.forEach(element => {
        productDiv.innerHTML += `
            <div class="watch-prdouct col-md-3">
                <img src="${element.image}" alt="">
                <h6>${element.titel}</h6>
                <p>${element.price}$</p>
                <button onclick="removeFav(${element.id})"><i class="fa-solid fa-trash"></i></button>
            </div>`;
    });
}

function removeFav(id) {
    if (productIncard) {
        let additemfav = JSON.parse(localStorage.getItem("productFav")) || [];
        let filteredItems = additemfav.filter((item) => item.id !== id);
        localStorage.setItem("productFav", JSON.stringify(filteredItems));
        drawProducts(filteredItems);
        renderFavPadge();
    }

}

// render element Not deleted in sidebar in sidebar 
function drawProducts(Fav) {
    let productsUi = Fav.map((item) => {
        return `
                <div class="watch-prdouct col-md-3">
                    <img src="${item.image}" alt="">
                    <h6>${item.titel}</h6>
                    <p>${item.price} $</p>
                    <button onclick="removeFav(${item.id})"><i class="fa-solid fa-trash"></i></button>
                </div>`;
    });

    productDiv.innerHTML = productsUi.join('');
}

addItem(); // Call the function to initially render the favorites
