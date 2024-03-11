
let getUserName = localStorage.getItem("username");
let sidebarProduct = document.querySelector(".sidebar-product");
let totalPrice = document.querySelector('.total-price');
let newArrival = document.querySelector('.new-products')
let additem = JSON.parse(localStorage.getItem("productIncard")) || [];


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


// Function to render elements in the sidebar
function renderElemnetSideBar() {
  let additem = JSON.parse(localStorage.getItem("productIncard")) || [];
  sidebarProduct.innerHTML = ``;
  additem.forEach((element) => {
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

function renderFavPadge() {
  let additemfav = JSON.parse(localStorage.getItem("productFav")) || [];
  let padge = document.querySelectorAll('.padge-react');
  padge.forEach(element => {
    element.style.display = additemfav.length > 0 ? 'block' : 'none';
    element.innerHTML = additemfav.length;
  });
}
renderFavPadge();
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
function AddToFav(id, clickedButton) {
  if (getUserName) { // assuming getUserName is a function
    let choosefavItem = bestSeller.find((item) => item.id === id);
    let additemfav = JSON.parse(localStorage.getItem("productFav")) || [];
    if (additemfav.length === 0) {
      additemfav.push(choosefavItem);
    } else {
      let found = false;
      additemfav.forEach(element => {
        if (element.id === id) {
          element.require++;
          found = true;
        }
      });
      if (!found) {
        additemfav.push(choosefavItem);
      }
    }
    clickBtn = clickedButton.innerHTML = `<i class="fa-solid fa-heart" style="color: #ff0000;"></i>`
    localStorage.setItem("productFav", JSON.stringify(additemfav));
    renderFavPadge(additemfav);
  } else {
    window.location = '../pages/register.html';
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
renderElemnetSideBar();






