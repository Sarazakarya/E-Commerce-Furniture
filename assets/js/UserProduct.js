
let bestSellerProducts = document.querySelector(".Best-seller .new-products");
let getUserName = localStorage.getItem("username");
let sidebarProduct = document.querySelector(".sidebar-product");
let totalPrice = document.querySelector('.total-price');
let tableBody = document.querySelector('tbody')
let tottaProduct = document.querySelector('.foot-total .total-price')
let additem = JSON.parse(localStorage.getItem("productIncard")) || [];

function renderProductsInTable() {
  let additem = JSON.parse(localStorage.getItem("productIncard")) || [];
  tableBody.innerHTML = ``

  additem.forEach(element => {
    tableBody.innerHTML += `
        <tr>
                                <div class="row">
                                    <td class="table-img">
                                        <button onclick="remove(${element.id})"> <i class="fa-solid fa-trash-can" style="color: #989898;"></i></button>
                                        <img src="${element.image}" alt="">
                                        <p>${element.titel}</p>
                                    </td>
                                    <td class="span-td">${element.price}$</td>
                                    <td>
                                        <div class="quantity">
                                            <button onclick="decrement(${element.id})">
                                                <i class="fa-solid fa-minus" style="color: #b3b3b3;"></i>
                                            </button>
                                            <p class="reqi">${element.require}</p>
                                            <button onclick="increment(${element.id})">
                                                <i class="fa-solid fa-plus" style="color: #b3b3b3;"></i>
                                            </button>
                                        </div>
                                    </td>
                                    <td class="span-td">${element.price * element.require}</td>
                                </div>
                            </tr>`
  });
}
renderProductsInTable()
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
      tottaProduct.innerHTML = `
      <p>Total</p>
      <h4> ${total}</h4>`
    }
  }
}
total()


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
        renderProductsInTable(items)
        total()
      }
    }
  }
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
      renderProductsInTable(obj, index)
      total()
    }
  }
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

// render elemrnt Not deleted in sidebar in sidebar 
function draw(products) {
  let productUi = products.map((item) => {
    return `<div class="side-elemrnt">
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
      </div>`
  });

  sidebarProduct.innerHTML = productUi.join('');
}




// render elemrnt Not deleted in sidebar in sidebar 
function drawProductTable(products) {
  let productTable = products.map((item) => {
    return `
    <tr>
    <div class="row">
        <td class="table-img">
            <button onclick="remove(${item.id})"> <i class="fa-solid fa-trash-can" style="color: #989898;"></i></button>
            <img src="${item.image}" alt="">
            <p>${item.titel}</p>
        </td>
        <td class="span-td">${item.price}$</td>
        <td>
            <div class="quantity">
                <button onclick="decrement(${item.id})">
                    <i class="fa-solid fa-minus" style="color: #b3b3b3;"></i>
                </button>
                <p class="reqi">${item.require}</p>
                <button onclick="increment(${item.id})">
                    <i class="fa-solid fa-plus" style="color: #b3b3b3;"></i>
                </button>
            </div>
        </td>
        <td class="span-td">${item.price * item.require}</td>
    </div>
</tr>`;
  });

  tableBody.innerHTML = productTable.join('');
}

// Click at Remove-btn
function remove(id) {
  if (productIncard) {
    let items = JSON.parse(localStorage.getItem("productIncard")) || [];
    let filteres = items.filter((item) => item.id !== id);
    localStorage.setItem("productIncard", JSON.stringify(filteres));
    drawProductTable(filteres);
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

















// SideBar 
var sidebar = document.querySelector(".sidebar");

function openSideBar() {
  if (additem.length === 0) {
    sidebar.style.display = "none";
  }
  else {
    sidebar.style.display = "block";
  }
}

window.onclick = function (event) {
  if (event.target == sidebar) {
    sidebar.style.display = "none";
  }
  else if (event.target == modal) {
    modal.style.display = "none";
  }
}
function closeSlidbar() {
  sidebar.style.display = "none";
}

// Modal for login\sign
var btn = document.getElementById("myBtn");
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
}



