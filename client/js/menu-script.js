import { getCookie, deleteCookie } from "./utils/cookie.js";


const indicator = document.querySelector(".nav-indicator");
const items = document.querySelectorAll(".nav-item");

const accountBtn = document.querySelector(".account-btn");

document.addEventListener("DOMContentLoaded", loadUiOnUserStatus);

console.log("menu-script.js loaded");

console.log("menu cookie: ", document.cookie);

function handleIndicator(el) {
  accountBtn.children[0].removeAttribute("style");
  items.forEach((item) => {
    item.classList.remove("is-active");
    item.removeAttribute("style");
  });

  indicator.style.width = `${el.offsetWidth}px`;
  indicator.style.left = `${el.offsetLeft}px`;
  indicator.style.backgroundColor = `${el.getAttribute("active-color")}`;

  el.classList.add("is-active");
  console.log(el.classList);
  el.style.color = el.getAttribute("active-color");

  localStorage.setItem("activeMenu", el.getAttribute("href"));
}

const activeMenu = localStorage.getItem("activeMenu");
if (activeMenu) {
  const activeMenuItem = document.querySelector(`a[href="${activeMenu}"]`);
  if (activeMenuItem) {
    handleIndicator(activeMenuItem);
  }
}

items.forEach((item) => {
  item.addEventListener("click", (e) => {
    handleIndicator(e.target);
    console.log(e.target);
  });
  item.classList.contains("is-active") && handleIndicator(item);
});

accountBtn.addEventListener("click", (e) => {
  if (isUserLoggedIn()) {
    items.forEach((item) => {
      item.classList.remove("is-active");
      item.removeAttribute("style");
    });

    indicator.removeAttribute("style");
    accountBtn.children[0].style.color = accountBtn.getAttribute("active-color");
  
    localStorage.removeItem("activeMenu");
  }
});





function isUserLoggedIn() {
  return getCookie("token") !== null;
}

function loadUiOnUserStatus() {
  const isLoggedIn = isUserLoggedIn();

  if (isLoggedIn) {
    console.log("user is Logged");
    loadIfLogged();
  } else {
    loadIfNotLogged();
    console.log("user is not Logged");
  }
}

function loadIfLogged() {
  const details = document.querySelector(".details");
  const username = getCookie("username");
  const usernameDiv = document.createElement("div");
  usernameDiv.id = "usernameDiv";
  usernameDiv.textContent = username !== null ? username : "unknown";

  const logout = document.createElement("div");
  logout.textContent = "Déconnexion";

  logout.addEventListener("click", disconect);

  details.appendChild(usernameDiv);
  details.appendChild(logout);
}

function loadIfNotLogged() {
  const details = document.querySelector(".details");
  const detailsDiv = document.createElement("a");
  detailsDiv.target = "_top";
  detailsDiv.href = "/html/login.html";
  detailsDiv.classList.add("connect");
  detailsDiv.textContent = "connect";

  details.appendChild(detailsDiv);
}


function disconect() {
  deleteCookie("token");
  deleteCookie("username");
  deleteCookie("userId");
  deleteCookie("email");
  location.reload();
}
