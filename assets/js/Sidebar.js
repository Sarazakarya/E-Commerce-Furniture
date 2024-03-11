// SideBar 
var sidebar = document.querySelector(".sidebar");
sidebarLogo = document.querySelector('.sidebar-logo')

function openSideBar() {
    additem = JSON.parse(localStorage.getItem("productIncard")) || [];
    if (additem.length !== 0) {
        sidebar.style.display = "block";
    }
    else {
        sidebar.style.display = "none";
    }
}

window.onclick = function (event) {
    if (event.target == sidebar) {
        sidebar.style.display = "none";
    }
    else if (event.target == modal) {
        modal.style.display = "none";
    }
    else if (event.target == sidebarLogo) {
        sidebarLogo.style.display = 'none';
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