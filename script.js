var Sign = document.getElementById('Sign');
var SignForm = document.getElementById('SignForm');
var RegisterForm = document.getElementById('RegisterForm');
var SignFormRegister = document.getElementById('SignForm-register');
var RegisterFormLogin = document.getElementById('RegisterForm-login');
var SignFormClose = document.getElementById('SignForm-close');
var RegisterFormClose = document.getElementById('RegisterForm-close');
var overlay = document.getElementById('overlay');
var SignSubmit = document.getElementById('SignForm-submit');
var RegisterSubmit = document.getElementById('RegisterForm-submit');
var Search = document.getElementById('search');
var Cart = document.getElementById('Cart');
// var username = document.getElementById('txtUsername').value;
// var password = document.getElementById('txtPassword').value;
// var rusername = document.getElementById('txtRUsername').value;
// var rpassword = document.getElementById('txtRPassword').value;
// var rpassword2 = document.getElementById('txtRPassword2').value;


// function showSignForm() {
//     SignForm.style.display = 'block';
//     RegisterForm.style.display = 'none';
//     CartForm.style.display = 'none';
//     overlay.style.display = 'block';
//     SearchBar.style.display = 'none';
// }

// function showRegisterForm() {
//     SignForm.style.display = 'none';
//     RegisterForm.style.display = 'block';
//     overlay.style.display = 'block';
// }

// function closeSignForm() {
//     SignForm.style.display = 'none';
//     overlay.style.display = 'none';
// }

// function closeRegisterForm() {
//     RegisterForm.style.display = 'none';
//     overlay.style.display = 'none';
// }

// function closeOverlay() {
//     overlay.style.display = 'none';
//     RegisterForm.style.display = 'none';
//     SignForm.style.display = 'none';
//     CartForm.style.display = 'none';
//     SearchBar.style.display = 'none';
// }

// function validateSignForm() {
//     var username = document.getElementById('txtUsername').value;
//     var password = document.getElementById('txtPassword').value;
//     if (username == '' || password == '') {
//         alert('Vui lòng điền đầy đủ thông tin!');
//         return false;
//     }
//     return true;
// }

// function validateRegisterForm() {
//     var rusername = document.getElementById('txtRUsername').value;
//     var rpassword = document.getElementById('txtRPassword').value;
//     var rpassword2 = document.getElementById('txtRPassword2').value;
//     if (rusername == '' || rpassword == '' || rpassword2 == '') {
//         alert('Vui lòng điền đầy đủ thông tin!');
//         return false;
//     }
//     else if (rpassword != rpassword2) {
//         alert('Mật khẩu không khớp!');
//         rpassword2 = '';
//         document.getElementById('txtRPassword2').focus();
//         return false;
//     }
//     return true;
// }

// Sign.addEventListener('click', showSignForm);
// SignFormRegister.addEventListener('click', showRegisterForm);
// RegisterFormLogin.addEventListener('click', showSignForm);
// SignFormClose.addEventListener('click', closeSignForm);
// RegisterFormClose.addEventListener('click', closeRegisterForm);
// overlay.addEventListener('click', closeOverlay);

// SignSubmit.addEventListener('click', function(event) {
//     if (validateSignForm()) {
//         event.preventDefault();
//         username = '';
//         password = '';
//         alert('Đăng nhập thành công!');

//         closeSignForm();
//     }
// });

// RegisterSubmit.addEventListener('click', function(event) {
//     if (validateRegisterForm()) {
//         event.preventDefault();

//         alert('Đăng ký thành công!');
//         rusername = '';
//         rpassword = '';
//         rpassword2 = '';
//         closeRegisterForm();
//     }
// });

// function test(){
//     alert('Chức năng đang được phát triển!');
// }


// var CartForm = document.getElementById('CartForm');

// Cart.addEventListener('click', function(event){
//     CartForm.style.display = 'block';
//     overlay.style.display = 'block';
//     SignForm.style.display = 'none';
//     RegisterForm.style.display = 'none';
//     SearchBar.style.display = 'none';
// });

// var CartFormClose = document.getElementById('CartForm-close');
// CartFormClose.addEventListener('click', function(event){
//     CartForm.style.display = 'none';
//     overlay.style.display = 'none';
// });

// Search.addEventListener('click', function(event){
//     document.getElementById('SearchBar').style.display = 'flex';
//     document.getElementById('txtSearch').value = '';
//     document.getElementById('SearchBar').focus();
//     overlay.style.display = 'block';
//     SignForm.style.display = 'none';
//     RegisterForm.style.display = 'none';
//     CartForm.style.display = 'none';
// });

// const productsPage1 = [
//     { image: 'img/1000.JPG', title: 'GIÀY XANH', price: '1.000.000$' },
//     { image: 'img/1003.JPG', title: 'GIÀY NIKE', price: '1.000.000$' },
//     { image: 'img/1007.JPG', title: 'TRAVISCOTT COLLECTION', price: '1.000.000$' },
//     { image: 'img/1009.JPG', title: 'COCACOLA', price: '1.000.000$' },
//     { image: 'img/1035.JPG', title: 'FANTA', price: '1.000.000$' },
//     { image: 'img/1036.JPG', title: 'PEPSI', price: '1.000.000$' },
//     { image: 'img/1037.JPG', title: 'TEPPY', price: '1.000.000$' },
//     { image: 'img/1021.JPG', title: 'JACK', price: '1.000.000$' }
// ];

// const productsPage2 = [
//     { image: 'img/1011.JPG', title: 'MESSI', price: '1.000.000$' },
//     { image: 'img/1031.JPG', title: 'RONALDO', price: '1.000.000$' },
//     { image: 'img/1022.JPG', title: 'ROBERTO CARLOS', price: '1.000.000$' },
//     { image: 'img/1099.JPG', title: 'RONALDINHO', price: '1.000.000$' },
//     { image: 'img/1098.JPG', title: 'DAVID BECKHAM', price: '1.000.000$' },
//     { image: 'img/1086.JPG', title: 'GARNACHO', price: '1.000.000$' },
//     { image: 'img/1085.JPG', title: 'HARRY KANE', price: '1.000.000$' },
//     { image: 'img/1045.JPG', title: 'MITOMA', price: '1.000.000$' }
// ];

// const productsPage3 = [
//     { image: 'img/1013.JPG', title: 'HỒ NGỌC HÀ', price: '1.000.000$' },
//     { image: 'img/1066.JPG', title: 'SOOBIN HOÀNG SƠN', price: '1.000.000$' },
//     { image: 'img/1067.JPG', title: 'NOO PHƯỚC THỊNH', price: '1.000.000$' },
//     { image: 'img/1068.JPG', title: 'ĐẠT G', price: '1.000.000$' },
//     { image: 'img/1069.JPG', title: 'BRAY', price: '1.000.000$' },
//     { image: 'img/1058.JPG', title: 'LOWER', price: '1.000.000$' },
//     { image: 'img/1042.JPG', title: 'TRAVISCOTT', price: '1.000.000$' },
//     { image: 'img/1005.JPG', title: 'DRAKE', price: '1.000.000$' }
// ];

// // Function to display products
// function displayProducts(products) {
//     const shopItemsContainer = document.getElementById('shop-items');
//     shopItemsContainer.innerHTML = ''; // Clear existing content

//     products.forEach(product => {
//         const productDiv = document.createElement('div');
//         productDiv.classList.add('shop-item');

//         const productImage = document.createElement('img');
//         productImage.src = product.image;
//         productImage.alt = product.title;
//         productImage.classList.add('shop-item-image');

//         const productTitle = document.createElement('div');
//         productTitle.classList.add('shop-item-title');
//         productTitle.textContent = product.title;

//         const productPrice = document.createElement('div');
//         productPrice.classList.add('shop-item-price');
//         productPrice.textContent = product.price;

//         productDiv.appendChild(productImage);
//         productDiv.appendChild(productTitle);
//         productDiv.appendChild(productPrice);

//         shopItemsContainer.appendChild(productDiv);
//     });
// }

// displayProducts(productsPage1);
// updatePagination(0);

// let currentIndex = 0;

// function goToPage(pageIndex) {
//     let products = [
//         productsPage1,
//         productsPage2,
//         productsPage3
//     ];

//     updatePagination(pageIndex);
//     currentIndex = pageIndex;
//     displayProducts(products[pageIndex]);
// }

// function scrollSlider(scrollIndex){
//     currentIndex += scrollIndex;
//     if(currentIndex < 0){
//         currentIndex = 2;
//     }
//     if(currentIndex > 2){
//         currentIndex = 0;
//     }

//     goToPage(currentIndex);
// }

// function updatePagination(index){
//     const pages = document.querySelectorAll('.page');
//     if(index == 0){
//         pages[1].classList.add('pageactive');
//         pages[2].classList.remove('pageactive');
//         pages[3].classList.remove('pageactive');
//     }
//     if(index == 1){
//         pages[2].classList.add('pageactive');
//         pages[1].classList.remove('pageactive');
//         pages[3].classList.remove('pageactive');
//     }

//     if(index == 2){
//         pages[3].classList.add('pageactive');
//         pages[1].classList.remove('pageactive');
//         pages[2].classList.remove('pageactive');
//     }
// }

//CART START
function cartDisplay(){
    var carttemp = [
        { image: 'img/1013.jpg', id: "S001", name: "Giày Adidas UltraBoost", price: 2000000 },
        { image: 'img/1066.jpg', id: "S002", name: "Giày Nike Air Max", price: 2500000 },
        { image: 'img/1067.JPG', id: "S003", name: "Giày Converse Chuck Taylor", price: 1500000 },
        { image: 'img/1068.JPG', id: "S004", name: "Giày Vans Old Skool", price: 1200000 },
        { image: 'img/1069.JPG', id: "S005", name: "Giày Puma Suede Classic", price: 1800000 },
        { image: 'img/1058.JPG', id: "S006", name: "Giày New Balance 574", price: 2100000 },
        { image: 'img/1096.JPG', id: "S007", name: "Giày Reebok Club C", price: 1700000 },
        { image: 'img/1097.JPG', id: "S008", name: "Giày Asics Gel-Lyte III", price: 2200000 },
        { image: 'img/1099.JPG', id: "S009", name: "Giày Jordan 1", price: 3000000 },
        { image: 'img/1098.JPG', id: "S010", name: "Giày Balenciaga Triple S", price: 8000000 }
    ];
    localStorage.setItem("cart", JSON.stringify(carttemp));
    
    var cartArray= JSON.parse(localStorage.getItem('cart'));
    if (cartArray== undefined || cartArray.length==0){
        var s=`<a href="index.html">
            <img src="img/emty-cart.png" alt="emty-cart">
            <h2>Bạn hiện chưa có sản phẩm nào trong giỏ hàng</h2>
            <span>Quay lại trang chủ</span>
        </a>`;
        document.getElementById('wrap-cart').innerHTML=s;
    }
    else{
        var s ="";
        var temp= location.href.split("?")[1];
        if(temp ==undefined || temp=="") temp= 0;
        for(let i=0;i<cartArray.length;i++){
            
            s+= `<tr>
                    <td class="cart-item-image"><img src="${cartArray[i].image}" alt="product"></td>
                    <td class="cart-item-name">${cartArray[i].name}</td>
                    <td class="cart-item-quantity">
                        <div class="">
                            <button class="bot">-</button>
                            <input type="text" id="sl" value="1">
                            <button class="them">+</button>
                        <div>
                    </td>
                    <td class="cart-item-price">${cartArray[i].price}</td>
                </tr>`
        }
        s= `<table class="cart-table">
            <tr>
                <td class="cart-item-image"><h3>Hình ảnh</h3></td>
                <td class="cart-item-name"><h3>Tên sản phẩm</h3></td>
                <td class="cart-item-quantity"><h3>Số lượng</h3></td>
                <td class="cart-item-price"><h3>Thành tiền</h3></td>
            </tr>` + s +
        `</table>`;
        document.getElementById('wrap-cart').innerHTML=s;
        for(let i = 0; i <=cartArray.length; i++) {
            document.getElementsByClassName('cart-item-image')[i].style.width="20%";
            document.getElementsByClassName('cart-item-quantity')[i].style.width="20%";
            document.getElementsByClassName('cart-item-price')[i].style.width="20%";
        }
    }
}

window.onload = function(){
    cartDisplay();
}

