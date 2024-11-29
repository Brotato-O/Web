const openCheckoutButton = document.getElementById('open-checkout-button');
const paymentMethodBox = document.getElementById('payment-method-box');
const confirmPaymentButton = document.getElementById('confirm-payment-button');
const newAddressBox = document.getElementById('new-address-box');
const addressBox = document.getElementById('address-box');
const cardInfoBox = document.getElementById('card-info-box');
const paymentImageContainer = document.getElementById('payment-image-container');



function them() {
    const carttemp = [
        { image: 'img/1013.jpg', id: "S001", name: "Giày Adidas UltraBoost", price: 2000000, quantity: 1, size: 31 },
        { image: 'img/1066.jpg', id: "S002", name: "Giày Nike Air Max", price: 2500000, quantity: 1, size: 31 },
        { image: 'img/1067.JPG', id: "S003", name: "Giày Converse Chuck Taylor", price: 1500000, quantity: 1, size: 31 }
    ];

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert("Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng!");
        return;
    }

    const username = currentUser.username;
    const userCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
    userCarts[username] = carttemp;
    localStorage.setItem('userCarts', JSON.stringify(userCarts));
    alert("Đã thêm sản phẩm vào giỏ hàng!");
}


function xoabill() {
    localStorage.removeItem("bill");
    localStorage.removeItem("userlogin");
}

//hiển thị giỏ hàng
function cartDisplay() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        notLogin();
        return;
    }

    const username = currentUser.username;
    const userCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
    const cartArray = userCarts[username] || [];

    if (cartArray.length === 0) {
        document.getElementById('wrap-cart').innerHTML = `
            <a href="../index.html">
                <img src="../img/emty-cart.png" alt="emty-cart">
                <h2>Bạn hiện chưa có sản phẩm nào trong giỏ hàng</h2>
                <span>Quay lại trang chủ</span>
            </a>`;
        return;
    }

    const cartItemsHTML = cartArray.map(item => `
        <tr>
            <td><input type="checkbox" id="${item.id}" onchange="buy()"></td>
            <td class="cart-item-image"><img src="${item.image}" alt="product"></td>
            <td class="cart-item-name"><label for="${item.id}">${item.name}</label></td>
            <td class="cart-item-quantity">
                <div class="count-quantity">
                    <button class="bot" onclick="adjustQuantity('${item.id}', -1)">-</button>
                    <input type="text" id="sl-${item.id}" class="quantity" value="${item.quantity}" readonly>
                    <button class="them" onclick="adjustQuantity('${item.id}', 1)">+</button>
                </div>
            </td>
            <td>
                <select onchange="adjustSize(this, '${item.id}')">
                    <option value="31" ${item.size === '31' ? 'selected' : ''}>31</option>
                    <option value="32" ${item.size === '32' ? 'selected' : ''}>32</option>
                </select>
            </td>
            <td class="cart-item-price">${item.price.toLocaleString()} VND</td>
            <td><button class="delete" onclick="checkDelete('${item.id}')">X</button></td>
        </tr>`).join('');

    document.getElementById('wrap-cart').innerHTML = `
        <table class="cart-table">
            <tr>
                <td></td>
                <th class="cart-item-image">Hình ảnh</th>
                <th class="cart-item-name">Tên sản phẩm</th>
                <th class="cart-item-quantity">Số lượng</th>
                <th class="cart-item-size">Size</th>
                <th class="cart-item-price">Đơn giá</th>
                <td></td>
            </tr>
            ${cartItemsHTML}
        </table>
        <div id="total-bill">
            <div>
                <input type="checkbox" id="check-all" onchange="checkAllItems()"> 
                <label for="check-all">Chọn tất cả</label>
            </div>
            <button class="delete" onclick="deleteCheckedItems()">Xóa</button>
            <span id="total-pay">Tổng thanh toán: </span>
            <button id="open-checkout-button" onclick="openCheckout()">Thanh toán</button>
        </div>`;
    buy();
}

function cartDisplayMobile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        notLogin();
        return;
    }
    const username = currentUser.username;
    const userCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
    const cartArray = userCarts[username] || [];

    if (cartArray.length === 0) {
        document.getElementById('wrap-cart').innerHTML = `
            <a href="../index.html">
                <img src="../img/emty-cart.png" alt="emty-cart">
                <h2>Bạn hiện chưa có sản phẩm nào trong giỏ hàng</h2>
                <span>Quay lại trang chủ</span>
            </a>`;
        return;
    }

    let s = cartArray.map(item => `
        <tr>
            <td rowspan="2"><input type="checkbox" id="${item.id}" onchange="buy()"></td>
            <td rowspan="2" class="cart-item-image"><img src="${item.image}" alt="product"></td>
            <td rowspan="2" class="cart-item-name"><label for="${item.id}">${item.title}</label></td>
            <td class="cart-item-quantity">
                <div class="count-quantity">
                    <button class="bot" onclick="adjustQuantity('${item.id}', -1)" style="display: flex; justify-content: center; align-items: center;">-</button>
                    <input type="text" id="sl-${item.id}" class="quantity" value="${item.quantity}" readonly style="width: 40px; font-size: 14px; padding: 5px; text-align: center; border-width:2px 0px">
                    <button class="them" onclick="adjustQuantity('${item.id}', 1)" style="display: flex; justify-content: center; align-items: center;">+</button>
                </div>
            </td>
            <td class="cart-item-price">${item.price}</td>
        </tr>
        <tr>
            <td class="cart-item-size">
                <select onchange="adjustSize(this, '${item.id}')">
                    <option value="31" ${item.size === '31' ? 'selected' : ''}>31</option>
                    <option value="32" ${item.size === '32' ? 'selected' : ''}>32</option>
                    <option value="33" ${item.size === '33' ? 'selected' : ''}>33</option>
                    <option value="34" ${item.size === '34' ? 'selected' : ''}>34</option>
                    <option value="35" ${item.size === '35' ? 'selected' : ''}>35</option>
                    <option value="36" ${item.size === '36' ? 'selected' : ''}>36</option>
                    <option value="37" ${item.size === '37' ? 'selected' : ''}>37</option>
                </select>
            </td>
        </tr>
    `).join('');

    document.getElementById('wrap-cart').innerHTML = `
        <table class="cart-table">
            <tr>
                <td></td>
                <th class="cart-item-image">Hình ảnh</th>
                <th class="cart-item-name">Tên sản phẩm</th>
                <th class="cart-item-quantity">Tùy chỉnh</th>
                <th class="cart-item-price">Đơn giá</th>
            </tr>
            ${s}
        </table>
        <div id="total-bill">
            <div>
                <input type="checkbox" id="check-all" onchange="checkAllItems()"> 
                <label for="check-all">Chọn tất cả</label>
            </div>
            <button onclick="deleteCheckedItems()" class="delete">Xóa</button>
            <span id="total-pay">Tổng thanh toán: </span>
            <button id="open-checkout-button" onclick="openCheckout()">Thanh toán</button>
        </div>`;
}

function adjustSize(obj, id){
    var cart= JSON.parse(localStorage.getItem('cart'));
    for(var i=0; i<cart.length; i++){
        if(cart[i].id== id) {
            cart[i].size= obj.value;
        }
    }
    document.getElementById(id).checked = true;
    localStorage.setItem('cart', JSON.stringify(cart));
}

//kiểm tra sản phẩm được chọn
var carttemp=[];
function checkCart(){
    carttemp=[];  
    var cartArray= JSON.parse(localStorage.getItem('cart'));
    for(var i=0; i<cartArray.length; i++){
        var check= document.getElementById(cartArray[i].id);
        if(check.checked== true) carttemp.push(cartArray[i]);
    }
}

//chọn tất cả sản phẩm
function checkAllItems(){
    var cartArray= JSON.parse(localStorage.getItem('cart'));
    var check= document.getElementById("check-all");
    if(check.checked== true)
        for(var i=0; i<cartArray.length; i++)
            document.getElementById(cartArray[i].id).checked= true;
    else
        for(var i=0; i<cartArray.length; i++)
            document.getElementById(cartArray[i].id).checked= false;
    buy();
}

//hàm cảnh báo xóa
function warning() {
    var result = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
    if (result == true) return true; 
    return false;
}

//xóa sản phẩm được chọn
function deleteCheckedItems(){
    checkCart();
    if(carttemp.length==0 || carttemp== undefined) {
        alert("Bạn chưa chọn sản phẩm để xóa!");
        return;
    };
    if(warning()== false) return;
    for (let i=0; i < carttemp.length; i++)
        deleteCartItem(carttemp[i].id);
}

//xóa sản phẩm
function checkDelete(id){
    if (warning()== false) return;
    deleteCartItem(id);
}

function deleteCartItem(id){
    var cartArray= JSON.parse(localStorage.getItem('cart'));
    for(let i=0; i < cartArray.length; i++)
        if (cartArray[i].id==id){
            cartArray.splice(i, 1);
            break;
        }
    localStorage.setItem('cart',JSON.stringify(cartArray));
    cartDisplay();
}

//hiển thị giá tiền
function buy() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    const username = currentUser.username;
    const userCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
    const cartArray = userCarts[username] || [];

    const total = cartArray.reduce((sum, item) => sum + item.quantity * item.price, 0);
    document.getElementById("total-pay").innerHTML = `Tổng thanh toán: ${total.toLocaleString()} VND`;
    return total;
}

//cảnh báo hủy đơn
function warning1() {
    var result = window.confirm("Bạn có chắc chắn muốn hủy đơn này?");
    if (result == true) return true; 
    return false;
}

//hủy đơn
function huy(id){
    if(warning1()== false) return;
    var bill= JSON.parse(localStorage.getItem('bill'));
    for(let i=0; i< bill.length; i++){
        if(bill[i].receiptId == id){
            bill[i].status = "Đã hủy";
            break;
        }
    }
    localStorage.setItem('bill',JSON.stringify(bill));
    showBill(1);
}

//hiển thị nếu người dùng chưa đăng nhập
function notLogin(){
    document.getElementById("wrap-cart").innerHTML=`
        <a href="#">
            <img src="../img/anonymous-user.png" alt="anonymous-user">
            <h2>Bạn phải đăng nhập để xem chức năng này</h2>
            <span>Đi đến đăng nhập</span>
        </a>
    `
}

//hiển thị tình trạng đơn
function showBill(number){
    var userlogin = JSON.parse(localStorage.getItem('userlogin'));
    var bill= JSON.parse(localStorage.getItem('bill'));
    if(userlogin == undefined ) notLogin();
    else{
        var variable= "";
        if (number== 1) variable="Chờ xác nhận";
        else if (number== 2) variable="Đã xác nhận";
        else if (number== 3) variable="Đã giao";
        else variable="Đã hủy";
        var s="";
        for(var i=0; i< bill.length; i++){
            if(bill[i].customer.id == userlogin.id && bill[i].status== variable){
                    s+=`
                        <tr>
                            <td>${bill[i].receiptId}</td>
                            <td class="billname">`;
                    for(var j=0; j< bill[i].products.length; j++){
                        s+= `
                            <div>${bill[i].products[j].quantity} X ${bill[i].products[j].name}</div>
                        `;      
                    }
                    s+= `</td>
                    <td>${bill[i].orderDate}</td>
                    <td>${bill[i].totalAmount}</td>
                    <td>${bill[i].paymentMethod}</td>`
                    if (number==1)
                        s+=`<td><button onclick="huy('${bill[i].receiptId}')">Hủy đơn</button></td>`
                    s+=`</tr>`;
            }
        }
        s= `<table class="status-table">
                <tr>
                    <th>Mã hóa đơn</th>
                    <th>Sản phẩm</th>
                    <th>Ngày đặt</th>
                    <th>Tổng tiền</th>
                    <th>Phương thức</th>
                <tr> `+ s + `

            </table>
        `
        document.getElementById("wrap-cart").innerHTML=s;   
    }
}

//hàm hiển thị điện thoại
function displayMobile(){
    var temp= location.href.split("?")[1];
    if (temp ==undefined || temp=="" || temp.search("focus")==0)
        if(window.innerWidth< 768)cartDisplayMobile();
        else  cartDisplay();
}

window.addEventListener("resize",displayMobile);
            
window.addEventListener("load", function(){
    addCSS();
    var temp= location.href.split("?")[1];
    if(temp ==undefined || temp=="" || temp.search("focus")==0) {
        if(window.innerWidth< 768) cartDisplayMobile();
        else cartDisplay();
        if(temp!= undefined && temp!="" && temp.search("focus")==0 ) {
            var temp1= temp.split("&")[1];
            var tr= document.getElementById(temp1).parentNode.parentNode;
            tr.scrollIntoView();
            tr.style.animation="highlight 2s ease-in-out";
        };
    }
    else{
        if(temp== 1) showBill(1); 
        else if(temp== 2) showBill(2); 
        else if(temp== 3)showBill(3); 
        else showBill(4); 
    }
})

function addCSS(){
    var li= document.getElementsByClassName('status-li');
    var temp= location.href.split("?")[1];
    console.log(temp);
    if(temp ==undefined || temp=="" || temp.search("focus")==0) {
        li[0].style.backgroundColor="white";
        li[0].style.borderRadius="20px";
        li[0].style.border="1px solid black";
    }
    else{
        for(var i=1; i < 5; i++){
            if(temp==i){
            li[i].style.backgroundColor="white";
            li[i].style.borderRadius="20px";
            li[i].style.border="1px solid black";
            }
        }
        
    }
}

//Code của Tài
function hideAllBoxes() {
    addressBox.style.display = 'none';
    paymentMethodBox.style.display = 'none';
    cardInfoBox.style.display = 'none';
    newAddressBox.style.display = 'none';
    confirmPaymentButton.style.display = 'none';
    paymentImageContainer.style.display = 'none'; 
    document.getElementById('cash-payment-box').style.display = 'none';
}

function openCheckout() {
    checkCart();
    if (carttemp.length === 0) {
      alert('Giỏ hàng trống! Vui lòng thêm sản phẩm.');
    } else {
      overlay1.style.display = 'flex';
      showAddressBox();
    }
};

function showAddressBox() {
    hideAllBoxes(); 
    addressBox.style.display = 'block';
}

function closeCheckout() {
    overlay1.style.display = 'none';
};

function useSavedAddress() {
    hideAllBoxes();  
    paymentMethodBox.style.display = 'block';
    confirmPaymentButton.style.display = 'block'; 
}

function addNewAddress() {
    hideAllBoxes();  
    newAddressBox.style.display = 'block';
}

function goBackToAddress() {
    hideAllBoxes();  
    addressBox.style.display = 'block';
    paymentMethodBox.style.display = 'none';
    cardInfoBox.style.display = 'none';
    confirmPaymentButton.style.display = 'none'; 
}

function saveAddress() {
    const address = {
      name: document.getElementById('name').value,
      phone: document.getElementById('phone').value,
      houseNumber: document.getElementById('house-number').value,
      street: document.getElementById('street').value,
      ward: document.getElementById('ward').value,
      district: document.getElementById('district').value,
      city: document.getElementById('city').value,
    };
    console.log('Địa chỉ đã lưu:', address);
    
    newAddressBox.style.display = 'none';
    showPaymentMethodBox(); 
}

function PaymentMethodSelection() {
  const selectedMethod = document.querySelector('input[name="payment-method"]:checked');

  cardInfoBox.style.display = 'none';
  paymentImageContainer.style.display = 'none'; 
  document.getElementById('cash-payment-box').style.display = 'none'; 

  if (selectedMethod && selectedMethod.value === 'Thẻ ngân hàng') {
    cardInfoBox.style.display = 'block'; 
  } else if (selectedMethod && selectedMethod.value === 'Chuyển khoản') {
    paymentImageContainer.style.display = 'block';  
  } else if (selectedMethod && selectedMethod.value === 'Tiền mặt') {
    document.getElementById('cash-payment-box').style.display = 'block'; 
    document.getElementById('cash-payment-amount').textContent = `Số tiền cần thanh toán: ${buy()}`;
  }
}

function checkout() {
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked');  
    if (!selectedMethod) {
      alert('Vui lòng chọn phương thức thanh toán!');
      return; 
    }
    cart.length = 0; 
    updateCart(); 
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    paymentMethods.forEach((method) => method.checked = false);
    hideAllBoxes();  
    overlay1.style.display = 'none';
    alert('Thanh toán thành công!');
    closeCheckout(); 
}

function showPaymentMethodBox() {
    hideAllBoxes(); 
    paymentMethodBox.style.display = 'block';
    confirmPaymentButton.style.display = 'block';
}

//Hàm điều chỉnh số lượng 
function adjustQuantity(itemId, change) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    const username = currentUser.username;
    const userCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
    const cartArray = userCarts[username] || [];

    cartArray.forEach(item => {
        if (item.id === itemId) {
            const newQuantity = item.quantity + change;
            if (newQuantity < 1) {
                alert("Số lượng tối thiểu là 1");
                return;
            }
            item.quantity = newQuantity;
        }
    });

    userCarts[username] = cartArray;
    localStorage.setItem('userCarts', JSON.stringify(userCarts));
    cartDisplay();
}
