//Khai báo biến
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
var username = document.getElementById("txtUsername").value;
var password = document.getElementById("txtPassword").value;
var rusername = document.getElementById("txtRUsername").value;
var rpassword = document.getElementById("txtRPassword").value;
var rpassword2 = document.getElementById("txtRPassword2").value;

// <---------------<DANG NHAP/DANG KY>----------------->

//Khai báo
var accountStatus = localStorage.getItem("accountStatus");
var afterSign = document.getElementById("afterSign");
var afterSignAdmin = document.getElementById("afterSignAdmin");
var afterSignClose = document.getElementById("afterSign-close");
var afterSignAdminClose = document.getElementById("afterSign-admin-close");

//Đăng nhập đăng kí click event
afterSignClose.addEventListener("click", hideAfterSign);
afterSignAdminClose.addEventListener("click", hideAfterSign);
Sign.addEventListener("click", showSignForm);
SignFormRegister.addEventListener("click", showRegisterForm);
RegisterFormLogin.addEventListener("click", showSignForm);
SignFormClose.addEventListener("click", closeSignForm);
RegisterFormClose.addEventListener("click", closeRegisterForm);

//Đăng nhập, đăng ký tất tần tật
function showSignForm() {
  SignForm.style.display = "block";
  RegisterForm.style.display = "none";
  CartForm.style.display = "none";
  overlay.style.display = "block";
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

function validateSignForm() {
  var username = document.getElementById("txtUsername").value;
  var password = document.getElementById("txtPassword").value;
  if (username == "" || password == "") {
    toast({
      title: "Thất bại",
      message: "Vui lòng điền đầy đủ thông tin !",
      type: "warning",
      duration: 3000,
    });
    return false;
  }
  return true;
}

function validateRegisterForm() {
  var rname = document.getElementById("txtRName").value;
  var rusername = document.getElementById("txtRUsername").value;
  var rpassword = document.getElementById("txtRPassword").value;
  var rpassword2 = document.getElementById("txtRPassword2").value;
  var rcheckbox = document.getElementById("checkbox-signup").checked;
  if (rname == "" || rusername == "" || rpassword == "" || rpassword2 == "") {
    toast({
      title: "Thất bại",
      message: "Vui lòng điền đầy đủ thông tin !",
      type: "warning",
      duration: 3000,
    });
    return false;
  } else if (rpassword.length < 6) {
    toast({
      title: "Thất bại",
      message: "Mật khẩu phải có ít nhất 6 ký tự !",
      type: "error",
      duration: 3000,
    });
    rpassword = "";
    document.getElementById("txtRPassword").focus();
    return false;
  } else if (rpassword != rpassword2) {
    toast({
      title: "Thất bại",
      message: "Mật khẩu không khớp !",
      type: "error",
      duration: 3000,
    });
    rpassword2 = "";
    document.getElementById("txtRPassword2").focus();
    return false;
  } else if (!rcheckbox) {
    toast({
      title: "Thất bại",
      message: "Vui lòng đồng ý điều khoản !",
      type: "error",
      duration: 3000,
    });
    return false;
  }
  return true;
}

//Lưu tài khoản vào mảng accounts trên local storage
function saveAccountToLocalStorage(name, username, password, date) {
  let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  accounts.push({
    name,
    username,
    password,
    role: "user",
    status: "active",
    date,
  });
  localStorage.setItem("accounts", JSON.stringify(accounts));
}

function checkLogin(username, password) {
  let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  if (!accounts.some((account) => account.username === username)) {
    toast({
      title: "Thất bại",
      message: "Tài khoản không tồn tại !",
      type: "error",
      duration: 3000,
    });
  } else if (
    accounts.some(
      (account) =>
        account.username === username && account.password === password
    )
  ) {
    return true;
  } else {
    toast({
      title: "Thất bại",
      message: "Sai mật khẩu !",
      type: "error",
      duration: 3000,
    });
  }
}

RegisterSubmit.addEventListener("click", function (event) {
  if (validateRegisterForm()) {
    event.preventDefault();
    let rname = document.getElementById("txtRName").value;
    let rusername = document.getElementById("txtRUsername").value;
    let rpassword = document.getElementById("txtRPassword").value;
    let date = new Date();
    let temp =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    if (isAccountExist(rusername)) {
      toast({
        title: "Thất bại",
        message: "Tài khoản đã tồn tại !",
        type: "error",
        duration: 3000,
      });
      document.getElementById("txtRUsername").value = "";
      document.getElementById("txtRPassword").value = "";
      document.getElementById("txtRPassword2").value = "";
      document.getElementById("txtRUsername").focus();
    } else {
      saveAccountToLocalStorage(rname, rusername, rpassword, temp);
      toast({
        title: "Thành công",
        message: "Tạo tài khoản thành công !",
        type: "success",
        duration: 3000,
      });
      closeRegisterForm();
      console.log("date");
    }
  }
});

SignSubmit.addEventListener("click", function (event) {
  if (validateSignForm()) {
    event.preventDefault();
    let username = document.getElementById("txtUsername").value;
    let password = document.getElementById("txtPassword").value;
    let role = getAccountRole(username);
    if (checkLogin(username, password)) {
      if (getAccountStatus(username) == "active") {
        if (getAccountRole(username) == "admin") {
          toast({
            title: "Thành công",
            message: "Đăng nhập thành công !",
            type: "success",
            duration: 3000,
          });
          closeSignForm();
          setCurrentUser(username, password, role);
          Sign.removeEventListener("click", showSignForm);
          SignReS.removeEventListener("click", showSignForm);
          Sign.addEventListener("click", showAfterSignAdmin);
          SignReS.addEventListener("click", showAfterSignAdmin);
          window.location.href = "admin.html";
          //Cap nhat profile
          loadProfile();
          let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
          let name = accounts.find(
            (account) => account.username === username
          ).name;
          document.getElementById("afterSign-admin-username").textContent =
            name;
        } else if (getAccountRole(username) == "user") {
          toast({
            title: "Thành công",
            message: "Đăng nhập thành công !",
            type: "success",
            duration: 3000,
          });
          closeSignForm();
          setCurrentUser(username, password, role);
          Sign.removeEventListener("click", showSignForm);
          SignReS.removeEventListener("click", showSignForm);
          Sign.addEventListener("click", showAfterSign);
          SignReS.addEventListener("click", showAfterSign);
          //Cap nhat profile
          loadProfile();
          let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
          let name = accounts.find(
            (account) => account.username === username
          ).name;
          document.getElementById("afterSign-username").textContent = name;
        }
      } else if (getAccountStatus(username) == "block") {
        toast({
          title: "Thất bại",
          message: "Tài khoản đã bị khóa !",
          type: "error",
          duration: 3000,
        });
      }
    }
    username = "";
    password = "";
    //nhàn
    document.getElementsByTagName("body")[0].style.overflow = "visible"; // fix lỗi đăng nhập xong ko lướt màn hình dc trên mobile
  }
});

//Hàm check role
function getAccountRole(username) {
  let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  let account = accounts.find((account) => account.username === username);
  return account ? account.role : null;
}

//Hàm check status
function getAccountStatus(username) {
  let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  let account = accounts.find((account) => account.username === username);
  return account ? account.status : null;
}

//Hiển thị thông tin (User) sau khi đăng nhập
function showAfterSign() {
  if (afterSign.style.display === "block") {
    hideAfterSign();
    return;
  }
  afterSign.style.display = "block";
  SignForm.style.display = "none";
  RegisterForm.style.display = "none";
  overlay.style.display = "block";
  CartForm.style.display = "none";
}

//Hiển thị thông tin (Admin) sau khi đăng nhập
function showAfterSignAdmin() {
  if (afterSignAdmin.style.display === "block") {
    hideAfterSign();
    return;
  }
  afterSignAdmin.style.display = "block";
  SignForm.style.display = "none";
  RegisterForm.style.display = "none";
  overlay.style.display = "block";
  CartForm.style.display = "none";
}

function hideAfterSign() {
  afterSign.style.display = "none";
  overlay.style.display = "none";
  afterSignAdmin.style.display = "none";
}

function isAccountExist(username) {
  let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  return accounts.some((account) => account.username === username);
}

//---------------KIỂM TRA ĐĂNG NHẬP------------------//
function checkOnLogin() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let username = currentUser ? currentUser.username : "";
  if (currentUser) {
    if (getAccountRole(username) == "admin") {
      Sign.removeEventListener("click", showSignForm);
      SignReS.removeEventListener("click", showSignForm);
      Sign.addEventListener("click", showAfterSignAdmin);
      SignReS.addEventListener("click", showAfterSignAdmin);
      //Cap nhat profile
      loadProfile();
      let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
      let name = accounts.find((account) => account.username === username).name;
      document.getElementById("afterSign-admin-username").textContent = name;
    } else if (getAccountRole(username) == "user") {
      Sign.removeEventListener("click", showSignForm);
      SignReS.removeEventListener("click", showSignForm);
      Sign.addEventListener("click", showAfterSign);
      SignReS.addEventListener("click", showAfterSign);
      //Cap nhat profile
      loadProfile();
      let accounts = JSON.parse(localStorage.getItem("accounts")) || [];
      let name = accounts.find((account) => account.username === username).name;
      document.getElementById("afterSign-username").textContent = name;
    }
  }
  return false;
}

window.onload = checkOnLogin();

//---------------KIỂM TRA ĐĂNG NHẬP------------------//

//Hàm lưu tài khoản đang đăng nhập vào currentUser
function setCurrentUser(username, password, role) {
  let currentUser = { username, password, role };
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

//Nút đăng xuất
function logOutAll() {
  localStorage.removeItem("currentUser");
  afterSign.style.display = "none";
  afterSignAdmin.style.display = "none";
  overlay.style.display = "none";
  CartForm.style.display = "none";
  Sign.removeEventListener("click", showAfterSign);
  SignReS.removeEventListener("click", showAfterSign);
  Sign.removeEventListener("click", showAfterSignAdmin);
  SignReS.removeEventListener("click", showAfterSignAdmin);
  Sign.addEventListener("click", showSignForm);
  SignReS.addEventListener("click", showSignForm);
  toast({
    title: "Thành công",
    message: "Đã đăng xuất !",
    type: "info",
    duration: 3000,
  });
  setTimeout(function () {
    var path = location.pathname; // Chỉ lấy đường dẫn (vd: /cart/cart.html)
    if (path.search("/cart") == 0) {
      location.href = "../index.html";
    } else {
      window.location.href = "index.html";
    }
  }, 1000);
};

function loadProfile() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let accounts = JSON.parse(localStorage.getItem("accounts"));
  let name = accounts.find(
    (account) => account.username === currentUser.username
  ).name;
  let userProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
  if (userProfile && userProfile[currentUser.username]) {
    name = userProfile[currentUser.username].name;
    phone = userProfile[currentUser.username].phone;
    address = userProfile[currentUser.username].address;
    email = userProfile[currentUser.username].email;
    avatar = userProfile[currentUser.username].avatar;
    let account = accounts.find(
      (account) => account.username === currentUser.username
    );
    if (account) {
      account.name = name;
      localStorage.setItem("accounts", JSON.stringify(accounts));
    }
  } else {
    phone = "";
    address = "";
    email = "";
    avatar = "";
  }
  var s = "";
  s = `<div id="top-profile">
        <h2 id="title">THÔNG TIN KHÁCH HÀNG</h2>
        <div>
            <div class="rotate-icon">+</div>
        </div>
        </div>
        <div id="content">
        <div id="img-user1">
            <i class="bx bxs-user"></i>
            <img src="${avatar}" alt="" id="avatar" style="z-index:10"/>
        </div>
        <input type="file" style="display: none"/>
        <form id="form">
            <div class="col">
                <label for="txtName">Họ tên :</label>
                <input type="text" name="txtName" value="${name}">
                <label for="nPhone">SĐT :</label>
                <input type="tel" name="nPhone" value="${phone}">
                <div style="color: red; display: none">
                    SĐT không đúng định dạng
                </div>
            </div>
            <div class="col">
                <label for="txtAddress">Địa chỉ:</label>
                <input type="text" name="txtAddress" value="${address}">
                <div style="color: red; display: none;">
                    Địa chỉ phải có dạng: Tỉnh/Thành phố,Quận/Huyện,Phường/Xã
                </div>
                <label for="txtEmail">Email :</label>
                <input type="text" name="txtEmail" value="${email}">
                <div style="color: red; display: none">
                    Email không đúng định dạng
                </div>
            </div>
            <div id="btn">
                <button type="reset" id="xoa">Xóa</button>
                <button id="luu">Lưu</button>
            </div>
            </form>
        </div>
    </div>`;
  document.querySelector("#account-profile").innerHTML = s;
  CloseProfile();
  ProfileSubmit();
  ProfileClear();
  setupImageUpload("#img-user1", 'input[type="file"]', "#avatar", ".bxs-user");
}

function CloseProfile() {
  let x = document.querySelector(".rotate-icon");
  let y = document.getElementById("account-profile");
  x.addEventListener("click", function () {
    y.style.display = "none";
    overlay.style.display = "none";
    window.location.reload();
  });
}

function OpenProfile() {
  document.getElementById("account-profile").style.display = "block";
  overlay.style.display = "block";
  afterSignAdmin.style.display = "none";
  afterSign.style.display = "none";
}

document
  .getElementById("afterSign-infor")
  .addEventListener("click", OpenProfile);
document
  .getElementById("afterSign-admin-infor")
  .addEventListener("click", OpenProfile);

const checkPhone = /^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/;
const checkGmail =/^[a-z0-9]+([._]?[a-z0-9]+)*@(gmail\.com|gmail\.edu|yahoo\.com|outlook\.com|hotmail\.com|icloud\.com|edu.vn|sgu\.edu\.vn)$/i;
const checkAddress = /^[^,]+,\s*[^,]+,\s*[^,]+$/;

function validateProfile() {
  let name = document.querySelector('input[name="txtName"]').value;
  let phone = document.querySelector('input[name="nPhone"]');
  let address = document.querySelector('input[name="txtAddress"]');
  let email = document.querySelector('input[name="txtEmail"]');

  if (name == "" || phone == "" || address == "" || email == "") {
    toast({
      title: "Thất bại",
      message: "Vui lòng điền đầy đủ thông tin !",
      type: "warning",
      duration: 3000,
    });
    return false;
  }

  if (!checkAddress.test(address.value)) {
    address.nextElementSibling.style.display = "block";
    return false;
  }
  address.nextElementSibling.style.display = "none";

  if (!checkPhone.test(phone.value)) {
    phone.nextElementSibling.style.display = "block";
    return false;
  }
  phone.nextElementSibling.style.display = "none";

  if (!checkGmail.test(email.value)) {
    email.nextElementSibling.style.display = "block";
    return false;
  }
  email.nextElementSibling.style.display = "none";

  saveProfileToLocalStorage();
  toast({
    title: "Thành công",
    message: "Cập nhật thông tin thành công !",
    type: "success",
    duration: 3000,
  });
  
  overlay.style.display = "none";
  document.getElementById("account-profile").style.display = "none";
  window.location.reload();
  return true;
}

function ProfileSubmit() {
  let submit = document.getElementById("luu");
  submit.addEventListener("click", function (e) {
    if (!validateProfile()) {
      e.preventDefault();
    }
    e.preventDefault();
  });
}

function ProfileClear() {
  let clear = document.getElementById("xoa");
  clear.addEventListener("click", function (e) {
      document.getElementById("avatar").src = "";
      document.querySelector('input[name="txtName"]').value = "";
      document.querySelector('input[name="nPhone"]').value = "";
      document.querySelector('input[name="txtAddress"]').value = "";
      document.querySelector('input[name="txtEmail"]').value = "";
      e.preventDefault();
    
  });
}

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

function saveProfileToLocalStorage() {
  let name = document.querySelector('input[name="txtName"]').value;
  let phone = document.querySelector('input[name="nPhone"]').value;
  let address = document.querySelector('input[name="txtAddress"]').value.toString();
  let email = document.querySelector('input[name="txtEmail"]').value;
  let avatar = document.getElementById("avatar").src;

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let userProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
  userProfile[currentUser.username] = { name, phone, address, email, avatar };
  localStorage.setItem("userProfile", JSON.stringify(userProfile));
  let listAcount = JSON.parse(localStorage.getItem("accounts"));
  for (let i = 0; i < listAcount.length; i++) {
    if (listAcount[i].username == currentUser.username) {
      //Sao chép tất cả giá trị thuộc tính
      Object.assign(listAcount[i], userProfile[currentUser.username]);
      localStorage.setItem("accounts", JSON.stringify(listAcount));
      console.log("hello");
      break;
    }
  }
}

// <---------------<DANG NHAP/DANG KY>----------------->

// <---------------<OVERLAY>----------------->

//Overlay
function closeOverlay() {
  overlay.style.display = "none";
  RegisterForm.style.display = "none";
  SignForm.style.display = "none";
  CartForm.style.display = "none";
  afterSign.style.display = "none";
  afterSignAdmin.style.display = "none";
  navRes.style.transform = "translateX(100%)";
  navbar.style.transform = "translateY(-100%)";
  document.body.style.overflow = "visible";
  document.getElementById("account-profile").style.display = "none";
}
overlay.addEventListener("click", closeOverlay);

//Cái này để test thôi chớ không có gì
function test() {
  alert("Chức năng đang được phát triển!");
}

// <---------------<OVERLAY>----------------->

// <---------------<Products>----------------->

//Sản phẩm trong phần trang chính
let products = JSON.parse(localStorage.getItem("products")) || [];
let tmp = JSON.parse(localStorage.getItem("all")) || [];

function displayProducts(products) {
  const productContainer = document.getElementById("productContainer");
  productContainer.innerHTML = "";
  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.className = "product";
    productElement.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price.toLocaleString()} VND</p>
            `;
    productContainer.appendChild(productElement);
    productElement.addEventListener("click", () => show2(product.productId));
  });
}

//hien thi chi tiet san pham o trang chinh
function show2(ID) {
  var product = tmp.find((item) => item.productId == ID);
  if (product) {
    document.getElementById("img-sp").src = product.img;
    document.getElementById("name-sp").innerHTML = product.name;
    document.getElementById("ma-sp").innerHTML = `${
      product.productId || "N/A"
    }`;
    document.getElementById("price").innerHTML = `${(product.price).toLocaleString()} VNĐ`;
    document.getElementById("sanpham-chitiet").style.display = "block";
  } else {
    console.error("Sản phẩm không tồn tại!");
  }
}
function closesp() {
  document.getElementById("size").value = "31";
  document.getElementById("sl").value = 1;
  document.getElementById("sanpham-chitiet").style.display = "none";
}
function giamsl() {
  if (document.getElementById("sl").value > 1) {
    document.getElementById("sl").value--;
  }
}

function tangsl() {
  document.getElementById("sl").value++;
}

// <---------------<Products>----------------->

// <---------------<CART>----------------->

//Giỏ hàng và tất tần tật
var CartForm = document.getElementById("CartForm");

// Hàm kiểm tra đăng nhập để xem giỏ hàng
// currentUser là mảng ở local storage chứa thông tin tài khoản đang đăng nhập
function checkLoginCart() {
  if (localStorage.getItem("currentUser")) {
    return true;
  }
  return false;
}

//Đóng giỏ hàng
var CartFormClose = document.getElementById("CartForm-close");
CartFormClose.addEventListener("click", function (event) {
  CartForm.style.display = "none";
  overlay.style.display = "none";
});

//Nủt giỏ hàng trên thanh navbar
Cart.addEventListener("click", function (event) {
  if (checkLoginCart()) {
    CartForm.style.display = "block";
    overlay.style.display = "block";
    SignForm.style.display = "none";
    RegisterForm.style.display = "none";
    afterSign.style.display = "none";
    afterSignAdmin.style.display = "none";
    displayCart(JSON.parse(localStorage.getItem("currentUser")).username);
  } else {
    toast({
      title: "Thất bại",
      message: "Vui lòng đăng nhập để xem giỏ hàng !",
      type: "error",
      duration: 3000,
    });
  }
});

// Thêm sản phẩm vào giỏ hàng
//Hàm thêm sản phẩm vào giỏ hàng cho mỗi user kèm theo hàm check sản phẩm trùng sẽ chỉ xuất hiện 1 lần
//Giỏ hàng chi tiết sẽ được thể hiện ở Cart.html

//Event click thêm sản phẩm vào giỏ hàng
function addToCartForUser(username, product) {
  let userCarts = JSON.parse(localStorage.getItem("userCarts")) || {};
  if (!userCarts[username]) {
    userCarts[username] = [];
  }
  userCarts[username].push(product);
  localStorage.setItem("userCarts", JSON.stringify(userCarts));
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("add-to-cart")) {
    if (checkLoginCart()) {
      const id = document.getElementById("ma-sp").innerHTML;
      const quantity = document.getElementById("sl").value;
      const size = document.getElementById("size").value;
      let allProducts = JSON.parse(localStorage.getItem("all")) || [];
      if(quantity<=0){
        document.getElementById("sl").value = "1";
        alert("Số lượng sai!");
        return false;
      }
      if (isNaN(quantity) || quantity.trim() === "") {
        document.getElementById("sl").value = "1";
        alert("Số lượng phải là một số hợp lệ, vui lòng nhập lại!");
        return false;
    }
      allProducts.forEach((product) => {
        if (product.productId == id) {
          image = product.img;
          title = product.name;
          price = product.price;
        }
      });
      const cartItem = { id, image, title, price, quantity, size };
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      addToCartForUser(currentUser.username, cartItem);
      toast({
        title: "Thành công",
        message: "Đã thêm sản phẩm vào giỏ hàng !",
        type: "success",
        duration: 3000,
      });
      displayCart(currentUser.username);
      document.getElementById("size").value = "31";
      document.getElementById("sl").value = 1;
    } else {
      toast({
        title: "Thất bại",
        message: "Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng !",
        type: "error",
        duration: 3000,
      });
      return;
    }
  }
});

// Hiển thị sản phẩm được thêm vào CartForm
function displayCart(username) {
  const userCarts = JSON.parse(localStorage.getItem("userCarts"));
  const cartItems = userCarts[username];
  const cartContainer = document.getElementById("cartContainer");
  cartContainer.innerHTML = "";
  const displayedProducts = new Set();
  cartItems.forEach((item) => {
    if (!displayedProducts.has(item.title)) {
      const cartElement = document.createElement("div");
      cartElement.className = "cart-item";
      cartElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>${item.price.toLocaleString()} VND</p>
                <button class="remove-from-cart">Xóa</button>
            `;
      cartContainer.appendChild(cartElement);
      displayedProducts.add(item.title);

      const removeButton = cartElement.querySelector(".remove-from-cart");
      removeButton.addEventListener("click", function () {
        removeFromCart(username, item.title);
        displayCart(username);
        toast({
          title: "Thành công",
          message: "Đã xóa sản phẩm khỏi giỏ hàng !",
          type: "success",
          duration: 3000,
        });
      });
    }
  });
}

function removeFromCart(username, productTitle) {
  let userCarts = JSON.parse(localStorage.getItem("userCarts"));
  if (userCarts[username]) {
    userCarts[username] = userCarts[username].filter(
      (item) => item.title !== productTitle
    );
    localStorage.setItem("userCarts", JSON.stringify(userCarts));
  }
}

// <---------------<CART>----------------->

// <---------------<SEARCH>----------------->

//Thanh tìm kiếm
Search.addEventListener("click", function () {
  document.getElementById("txtSearch").value = "";
  document.getElementById("SearchBar").focus();
  SignForm.style.display = "none";
  RegisterForm.style.display = "none";
  CartForm.style.display = "none";
  afterSign.style.display = "none";
  afterSignAdmin.style.display = "none";
  overlay.style.display = "none";
});

// <---------------<SEARCH>----------------->

// Back to top
window.onscroll = () => {
  let backtopTop = document.querySelector(".back-to-top");
  if (document.documentElement.scrollTop > 100) {
    backtopTop.classList.add("active");
  } else {
    backtopTop.classList.remove("active");
  }
};

// window.onload = localStorage.removeItem('currentUser');

//nhàn
function hide(event) {
  if (event.target.id == "sanpham-chitiet") {
    document.getElementById("sanpham-chitiet").style.display = "none";
  }
}
