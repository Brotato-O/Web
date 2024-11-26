window.onload = function () {
  createAdmin();
  loadProfile();
};

window.addEventListener("load", () => {
  clickSubmitProfile("#luu");
  setupImageUpload("#img-user1", 'input[type="file"]', "#avatar", ".bxs-user");
});

var Sign = document.getElementById("Sign");
var SignForm = document.getElementById("SignForm");
var RegisterForm = document.getElementById("RegisterForm");
var SignFormRegister = document.getElementById("SignForm-register");
var RegisterFormLogin = document.getElementById("RegisterForm-login");
var SignFormClose = document.getElementById("SignForm-close");
var RegisterFormClose = document.getElementById("RegisterForm-close");
var overlay = document.getElementById("overlay");
var SignSubmit = document.getElementById("SignForm-submit");
var RegisterSubmit = document.getElementById("RegisterForm-submit");
var Search = document.getElementById("search");
var Cart = document.getElementById("Cart");
var username = document.getElementById("txtUsername");
var password = document.getElementById("txtPassword");
var rusername = document.getElementById("txtRUsername");
var rpassword = document.getElementById("txtRPassword");
var rpassword2 = document.getElementById("txtRPassword2");

function showSignForm() {
  SignForm.style.display = "block";
  RegisterForm.style.display = "none";
  CartForm.style.display = "none";
  overlay.style.display = "block";
  SearchBar.style.display = "none";
}

function showRegisterForm() {
  SignForm.style.display = "none";
  RegisterForm.style.display = "block";
  overlay.style.display = "block";
}

function closeSignForm() {
  SignForm.style.display = "none";
  overlay.style.display = "none";
}

function closeRegisterForm() {
  RegisterForm.style.display = "none";
  overlay.style.display = "none";
}

function closeOverlay() {
  overlay.style.display = "none";
  RegisterForm.style.display = "none";
  SignForm.style.display = "none";
  CartForm.style.display = "none";
  SearchBar.style.display = "none";
}
// test
function createAdmin() {
  if (localStorage.getItem("user") === null) {
    var userArray = [];
    var user = {
      username: "admin",
      password: "admin",
    };
    userArray.push(user);
    localStorage.setItem("user", JSON.stringify(userArray));
  }
}

function checklogin(name) {
  if (localStorage.getItem("user")) {
    var listUser = JSON.parse(localStorage.getItem("user"));
    var s = "";
    for (var i = 0; i < listUser.length; i++) {
      if (listUser[i].username == name) {
        s = ` <li id="search"><a><i class="fa-solid fa-magnifying-glass"></i></a></li>
              <li id="Sign">
                <div id="img-user" name="Sign">
                  <a><i class="fa-solid fa-user"></i></a>
                  <div id="list">
                      <button class="user__" id="account">Account</button>
                      <button class="user__" id="logout" onClick="logout(\'index.html\')">Logout</button>
                  </div>
                </div>
              </li>
              <li id="Cart" name="Cart"><a href="cart/cart.html"><i class="fa-solid fa-bag-shopping"></i></i></a></li>`;
        break;
      }
    }
    document.querySelector("#nav-links-function").innerHTML = s;
  }
  OpenProfile();
}

function validateSignForm() {
  var username = document.getElementById("txtUsername");
  var password = document.getElementById("txtPassword");
  if (username.value == "" && password.value == "") {
    username.nextElementSibling.innerHTML = "Tên đăng nhập đang trồng";
    password.nextElementSibling.innerHTML = "Mật khẩu đang trồng";
    password.focus();
    username.focus();
    return false;
  } else if (username.value == "" && password.value != "") {
    username.nextElementSibling.innerHTML = "Tên đăng nhập đang trồng";
    username.focus();
    password.nextElementSibling.innerHTML = "";
    return false;
  } else if (password.value == "" && username.value != "") {
    password.nextElementSibling.innerHTML = "Mật khẩu đang trồng";
    password.focus();
    username.nextElementSibling.innerHTML = "";
    return false;
  } else {
    username.nextElementSibling.innerHTML = "";
    password.nextElementSibling.innerHTML = "";
  }
  var arrUser = JSON.parse(localStorage.getItem("user"));
  //Tạo thêm userlogin để quản lý người dùng khi đăng nhập
  for (let i = 0; i < arrUser.length; i++) {
    if (
      arrUser[i].username == username.value &&
      arrUser[i].password == password.value
    ) {
      localStorage.setItem("userlogin", JSON.stringify(arrUser[i]));
      break;
    }
  }
  var check = false;
  for (let i = 0; i < arrUser.length; i++) {
    if (
      arrUser[i].username == username.value &&
      arrUser[i].password == password.value
    ) {
      check = true;
      break;
    }
  }
  if (!check) {
    alert("Tên đăng nhập hoặc mật khẩu bị sai");
    return false;
  }
  return true;
}

function validateRegisterForm() {
  var rusername = document.getElementById("txtRUsername");
  var rpassword = document.getElementById("txtRPassword");
  var rpassword2 = document.getElementById("txtRPassword2");
  if (
    rusername.value == "" &&
    rpassword.value == "" &&
    rpassword2.value == ""
  ) {
    rusername.nextElementSibling.innerHTML = "Tên đăng nhập đang trống";
    rpassword.nextElementSibling.innerHTML = "Mật khẩu đang trồng";
    rpassword2.nextElementSibling.innerHTML = "Mật khẩu đang trồng";
    rpassword.focus();
    rpassword2.focus();
    rusername.focus();
    return false;
  } else if (
    rusername.value == "" &&
    rpassword.value != "" &&
    rpassword2.value == ""
  ) {
    rusername.nextElementSibling.innerHTML = "Tên đăng nhập đang trống";
    rpassword.nextElementSibling.innerHTML = "";
    rpassword2.nextElementSibling.innerHTML = "Mật khẩu đang trồng";
    rpassword2.focus();
    rusername.focus();
  } else if (
    rusername.value != "" &&
    rpassword.value == "" &&
    rpassword2.value == ""
  ) {
    rusername.nextElementSibling.innerHTML = "";
    rpassword.nextElementSibling.innerHTML = "Mật khẩu đang trồng";
    rpassword2.nextElementSibling.innerHTML = "Mật khẩu đang trồng";
    rpassword2.focus();
    rpassword.focus();
  } else if (
    rusername.value == "" &&
    rpassword.value == "" &&
    rpassword2.value != ""
  ) {
    rusername.nextElementSibling.innerHTML = "";
    rpassword.nextElementSibling.innerHTML = "";
    rpassword2.nextElementSibling.innerHTML = "Mật khẩu đang trồng";
    rpassword2.focus();
  } else if (rpassword.value != rpassword2.value) {
    rpassword2.nextElementSibling.innerHTML =
      "Mật khẩu nhập lại không chính xác";
    rpassword2.focus();
    return false;
  }
  var arrUser = JSON.parse(localStorage.getItem("user"));

  for (let i = 0; i < arrUser.length; i++) {
    if (arrUser[i].username == rusername.value) {
      alert("Tên đăng nhập đã có người sử dụng");
      rusername.focus();
      return false;
    }
  }
  var user = {
    username: rusername.value,
    password: rpassword.value,
  };

  arrUser.push(user);
  localStorage.setItem("user", JSON.stringify(arrUser));
  alert("Đăng ký thành công!");
  return true;
}
// test

Sign.addEventListener("click", showSignForm);
SignFormRegister.addEventListener("click", showRegisterForm);
RegisterFormLogin.addEventListener("click", showSignForm);
SignFormClose.addEventListener("click", closeSignForm);
RegisterFormClose.addEventListener("click", closeRegisterForm);
overlay.addEventListener("click", closeOverlay);

// test
window.addEventListener("DOMContentLoaded", () => {
  SignSubmit.addEventListener("click", function (event) {
    if (validateSignForm()) {
      event.preventDefault();
      alert("Đăng nhập thành công!");
      checklogin(username.value);
      username.value = "";
      password.value = "";
      closeSignForm();
    }
  });
});

function logout(url) {
  localStorage.removeItem("userlogin");
  location.href = url;
  alert("Bạn đã đăng xuất");
}

RegisterSubmit.addEventListener("click", function (event) {
  event.preventDefault();
  if (validateRegisterForm()) {
    alert("Đăng ký thành công!");
    rusername.value = "";
    rpassword.value = "";
    rpassword2.value = "";
    closeRegisterForm();
  }
});
// test

function test() {
  alert("Chức năng đang được phát triển!");
}

var CartForm = document.getElementById("CartForm");

Cart.addEventListener("click", function (event) {
  CartForm.style.display = "block";
  overlay.style.display = "block";
  SignForm.style.display = "none";
  RegisterForm.style.display = "none";
  SearchBar.style.display = "none";
  //nhàn
  var cartArray = JSON.parse(localStorage.getItem("cart"));
  var s = "";
  var display = cartArray.length;
  if (cartArray.length == undefined) display = 0;
  else if (cartArray.length > 5) display = 5;
  for (var i = 0; i < display; i++) {
    s += `
            <li><a href="cart/cart.html?focus&${cartArray[i].id}" class="link-shop">
                <img src="${cartArray[i].image}" alt="sp">
                <div>${cartArray[i].name}</div>
                <div>${cartArray[i].price}</div>
                </a>
            </li>
        `;
  }
  document.getElementById("CartForm-items-list").innerHTML = s;
});

var CartFormClose = document.getElementById("CartForm-close");
CartFormClose.addEventListener("click", function (event) {
  CartForm.style.display = "none";
  overlay.style.display = "none";
});

Search.addEventListener("click", function (event) {
  document.getElementById("SearchBar").style.display = "flex";
  document.getElementById("txtSearch").value = "";
  document.getElementById("SearchBar").focus();
  overlay.style.display = "block";
  SignForm.style.display = "none";
  RegisterForm.style.display = "none";
  CartForm.style.display = "none";
});

const productsPage1 = [
  { image: "img/1000.jpg", title: "GIÀY XANH", price: "1.000.000$" },
  { image: "img/1003.jpg", title: "GIÀY NIKE", price: "1.000.000$" },
  {
    image: "img/1007.jpg",
    title: "TRAVISCOTT COLLECTION",
    price: "1.000.000$",
  },
  { image: "img/1009.jpg", title: "COCACOLA", price: "1.000.000$" },
  { image: "img/1035.jpg", title: "FANTA", price: "1.000.000$" },
  { image: "img/1036.jpg", title: "PEPSI", price: "1.000.000$" },
  { image: "img/1037.jpg", title: "TEPPY", price: "1.000.000$" },
  { image: "img/1021.jpg", title: "JACK", price: "1.000.000$" },
];

const productsPage2 = [
  { image: "img/1011.jpg", title: "MESSI", price: "1.000.000$" },
  { image: "img/1031.jpg", title: "RONALDO", price: "1.000.000$" },
  { image: "img/1022.jpg", title: "ROBERTO CARLOS", price: "1.000.000$" },
  { image: "img/1099.jpg", title: "RONALDINHO", price: "1.000.000$" },
  { image: "img/1098.jpg", title: "DAVID BECKHAM", price: "1.000.000$" },
  { image: "img/1086.jpg", title: "GARNACHO", price: "1.000.000$" },
  { image: "img/1085.jpg", title: "HARRY KANE", price: "1.000.000$" },
  { image: "img/1045.jpg", title: "MITOMA", price: "1.000.000$" },
];

const productsPage3 = [
  { image: "img/1013.jpg", title: "HỒ NGỌC HÀ", price: "1.000.000$" },
  { image: "img/1066.jpg", title: "SOOBIN HOÀNG SƠN", price: "1.000.000$" },
  { image: "img/1067.jpg", title: "NOO PHƯỚC THỊNH", price: "1.000.000$" },
  { image: "img/1068.jpg", title: "ĐẠT G", price: "1.000.000$" },
  { image: "img/1069.jpg", title: "BRAY", price: "1.000.000$" },
  { image: "img/1058.jpg", title: "LOWER", price: "1.000.000$" },
  { image: "img/1042.jpg", title: "TRAVISCOTT", price: "1.000.000$" },
  { image: "img/1005.jpg", title: "DRAKE", price: "1.000.000$" },
];

// Function to display products
function displayProducts(products) {
  const shopItemsContainer = document.getElementById("shop-items");
  shopItemsContainer.innerHTML = ""; // Clear existing content

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("shop-item");

    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.title;
    productImage.classList.add("shop-item-image");

    const productTitle = document.createElement("div");
    productTitle.classList.add("shop-item-title");
    productTitle.textContent = product.title;

    const productPrice = document.createElement("div");
    productPrice.classList.add("shop-item-price");
    productPrice.textContent = product.price;

    productDiv.appendChild(productImage);
    productDiv.appendChild(productTitle);
    productDiv.appendChild(productPrice);

    shopItemsContainer.appendChild(productDiv);
  });
}

displayProducts(productsPage1);
updatePagination(0);

let currentIndex = 0;

function goToPage(pageIndex) {
  let products = [productsPage1, productsPage2, productsPage3];

  updatePagination(pageIndex);
  currentIndex = pageIndex;
  displayProducts(products[pageIndex]);
}

function scrollSlider(scrollIndex) {
  currentIndex += scrollIndex;
  if (currentIndex < 0) {
    currentIndex = 2;
  }
  if (currentIndex > 2) {
    currentIndex = 0;
  }

  goToPage(currentIndex);
}

function updatePagination(index) {
  const pages = document.querySelectorAll(".page");
  if (index == 0) {
    pages[1].classList.add("pageactive");
    pages[2].classList.remove("pageactive");
    pages[3].classList.remove("pageactive");
  }
  if (index == 1) {
    pages[2].classList.add("pageactive");
    pages[1].classList.remove("pageactive");
    pages[3].classList.remove("pageactive");
  }

  if (index == 2) {
    pages[3].classList.add("pageactive");
    pages[1].classList.remove("pageactive");
    pages[2].classList.remove("pageactive");
  }
}

//Nhàn
var shopBttn = document.getElementById("CartForm-view");
shopBttn.addEventListener("click", function () {
  window.location.href = "cart/cart.html";
});

// 23/11 PHÚC
function loadProfile() {
  var s = "";
  s = `<div id="top-profile">
        <h2 id="title">THÔNG TIN KHÁCH HÀNG</h2>
        <div style="background-color: rgb(102, 212, 177)">
          <div class="rotate-icon">+</div>
        </div>
      </div>
      <div id="content">
        <div id="img-user1">
          <img src="default-avatar.png" alt="" id="avatar" />
          <i class="bx bxs-user"></i>
        </div>
        <input type="file" />
        <form id="form">
          <div class="col">
            <label for="txtName">Họ tên :</label>
            <input type="text" name="txtName" required />
            <label for="nPhone">SĐT :</label>
            <input type="tel" name="nPhone" required />
            <div style="color: red; display: none">
              SĐT không đúng định dạng
            </div>
          </div>
          <div class="col">
            <label for="txtAddress">Địa chỉ:</label>
            <input type="text" name="txtAddress" required />
            <label for="txtEmail">Email :</label>
            <input type="text" name="txtEmail" required />
            <div style="color: red; display: none">
              Email không đúng định dạng
            </div>
          </div>
          <div id="btn">
            <button type="reset" id="xoa">Xóa</button>
            <button type="submit" id="luu">Lưu</button>
          </div>
        </form>
      </div>
    </div>`;
  document.querySelector("#account-profile").innerHTML = s;
  CloseProfile();
}
const checkGmail = /^[a-z0-9]+([._]?[a-z0-9]+)*@gmail\.com$/i;
const checkPhone = /^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/;

function setupImageUpload(par1, par2, par3, par4) {
  var imgUser = document.querySelector(par1);
  var inputFile = document.querySelector(par2);
  var avatar = document.querySelector(par3);
  var icon = document.querySelector(par4);

  imgUser.addEventListener("click", () => {
    inputFile.click();
  });

  inputFile.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      avatar.src = imgURL;
      icon.style.display = "none";
    }
  });
}

function OpenProfile() {
  var eAccount = document.querySelector("#account");
  eAccount.addEventListener("click", () => {
    document.querySelector("#account-profile").style.display = "block";
    overlay.style.display = "block";
  });
}

function CloseProfile() {
  var eCloseAccount = document.querySelector(".rotate-icon");
  eCloseAccount.addEventListener("click", () => {
    document.querySelector("#account-profile").style.display = "none";
    overlay.style.display = "none";
  });
}

function validateFormProfile() {
  var hoTen = document.querySelector("input[name=txtName]");
  var address = document.querySelector("input[name=txtAddress]");
  var phone = document.querySelector("input[name=nPhone]");
  var email = document.querySelector("input[name=txtEmail]");
  if (!checkGmail.test(email.value)) {
    email.nextElementSibling.style.display = "block";
    email.focus();
    return false;
  }
  if (!checkPhone.test(phone.value)) {
    phone.nextElementSibling.style.display = "block";
    phone.focus();
    return false;
  }

  email.nextElementSibling.style.display = "none";
  phone.nextElementSibling.style.display = "none";

  var profileUser = JSON.parse(localStorage.getItem("userlogin"));

  var profile = {
    username: profileUser.username,
    password: profileUser.password,
    hoTen: hoTen.value,
    address: address.value,
    phone: phone.value,
    email: email.value,
  };
  localStorage.setItem("userlogin", JSON.stringify(profile));
  return true;
}

function clickSubmitProfile(par1) {
  submit = document.querySelector(par1);
  submit.addEventListener("click", (event) => {
    event.preventDefault();
    if (validateFormProfile()) {
      var listUser = JSON.parse(localStorage.getItem("user"));
      var user = JSON.parse(localStorage.getItem("userlogin"));
      for (var i = 0; i < listUser.length; i++) {
        if (listUser[i].username == user.username) {
          listUser[i] = user;
          localStorage.setItem("user", JSON.stringify(listUser));
          break;
        }
      }
      alert("Thêm thông tin thành công");
    }
    document.querySelector("#account-profile").style.display = "none";
    overlay.style.display = "none";
  });
}

//
