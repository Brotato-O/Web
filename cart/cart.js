const openCheckoutButton = document.getElementById('open-checkout-button');
const paymentMethodBox = document.getElementById('payment-method-box');
const confirmPaymentButton = document.getElementById('confirm-payment-button');
const newAddressBox = document.getElementById('new-address-box');
const addressBox = document.getElementById('address-box');
const cardInfoBox = document.getElementById('card-info-box');
const paymentImageContainer = document.getElementById('payment-image-container');

function them(){
    var carttemp = [
        { image: 'img/1013.jpg', id: "S001", name: "Giày Adidas UltraBoost", price: 2000000, quantity: 1, size: 31},
        { image: 'img/1066.jpg', id: "S002", name: "Giày Nike Air Max", price: 2500000, quantity: 1, size: 31 },
        { image: 'img/1067.JPG', id: "S003", name: "Giày Converse Chuck Taylor", price: 1500000, quantity: 1, size: 31 },
        { image: 'img/1068.JPG', id: "S004", name: "Giày Vans Old Skool", price: 1200000, quantity: 1, size: 31 },
        { image: 'img/1069.JPG', id: "S005", name: "Giày Puma Suede Classic", price: 1800000, quantity: 1, size: 31 },
        { image: 'img/1058.JPG', id: "S006", name: "Giày New Balance 574", price: 2100000, quantity: 1, size: 31 },
        { image: 'img/1096.JPG', id: "S007", name: "Giày Reebok Club C", price: 1700000, quantity: 1, size: 31 },
        { image: 'img/1097.JPG', id: "S008", name: "Giày Asics Gel-Lyte III", price: 2200000, quantity: 1,size: 31 },
        { image: 'img/1099.JPG', id: "S009", name: "Giày Jordan 1", price: 3000000, quantity: 1 ,size: 31 },
        { image: 'img/1098.JPG', id: "S010", name: "Giày Balenciaga Triple S", price: 8000000, quantity: 1,size: 31 }
    ];
    localStorage.setItem("cart", JSON.stringify(carttemp));
}

function xoabill(){
    localStorage.removeItem("bill");
    localStorage.removeItem("userlogin");
}

//hiển thị giỏ hàng
function cartDisplay(){    
    var cartArray = JSON.parse(localStorage.getItem('cart'));
    if (cartArray == undefined || cartArray.length == 0) {
        var s = `<a href="../index.html">
            <img src="../img/emty-cart.png" alt="emty-cart">
            <h2>Bạn hiện chưa có sản phẩm nào trong giỏ hàng</h2>
            <span>Quay lại trang chủ</span>
        </a>`;
        document.getElementById('wrap-cart').innerHTML = s;
    } else {
        var s = "";
        for (let i = 0; i < cartArray.length; i++) {
            s += `<tr>
                    <td><input type="checkbox" id="${cartArray[i].id}" onchange="buy()"></td>
                    <td class="cart-item-image"><img src="../${cartArray[i].image}" alt="product"></td>
                    <td class="cart-item-name"><label for="${cartArray[i].id}">${cartArray[i].name}</label></td>
                    <td class="cart-item-quantity">
                        <div class="count-quantity">
                            <button class="bot" onclick="adjustQuantity('${cartArray[i].id}', -1)"style="display: flex; justify-content: center; align-items: center;">-</button>
                            <input type="text" id="sl-${cartArray[i].id}" class="quantity" value="${cartArray[i].quantity}" readonly style="width: 40px; font-size: 14px; padding: 5px; text-align: center; border-width:2px 0px">
                            <button class="them" onclick="adjustQuantity('${cartArray[i].id}', 1)"style="display: flex; justify-content: center; align-items: center;">+</button>
                        </div>
                    </td>
                    <td>
                    <select onchange="adjustSize(this, '${cartArray[i].id}')">
                        <option value="31" ${cartArray[i].size === '31' ? 'selected' : ''}>31</option>
                        <option value="32" ${cartArray[i].size === '32' ? 'selected' : ''}>32</option>
                        <option value="33" ${cartArray[i].size === '33' ? 'selected' : ''}>33</option>
                        <option value="34" ${cartArray[i].size === '34' ? 'selected' : ''}>34</option>
                        <option value="35" ${cartArray[i].size === '35' ? 'selected' : ''}>35</option>
                        <option value="36" ${cartArray[i].size === '36' ? 'selected' : ''}>36</option>
                        <option value="37" ${cartArray[i].size === '37' ? 'selected' : ''}>37</option>
                </select>
            </td>
                    <td class="cart-item-price">${cartArray[i].price}</td>
                    <td><button class="delete" onclick="checkDelete('${cartArray[i].id}')">X</button></td>
                </tr>`;
        }
        s = `<table class="cart-table">
            <tr>
                <td></td>
                <th class="cart-item-image">Hình ảnh</th>
                <th class="cart-item-name">Tên sản phẩm</th>
                <th class="cart-item-quantity">Số lượng</th>
                <th class="cart-item-size">Size</th>
                <th class="cart-item-price">Đơn giá</th>
                <td></td>
            </tr>` + s +
        `</table> 
        <div id="total-bill">
            <div>
                <input type="checkbox" id="check-all" onchange="checkAllItems()"> 
                <label for="check-all">Chọn tất cả</label>
            </div>
            <button class="delete" onclick="deleteCheckedItems()">Xóa</button>
            <span id="total-pay">Tổng thanh toán: </span>
            <button id="open-checkout-button" onclick="openCheckout()">Thanh toán</button>
        </div>`;
        document.getElementById('wrap-cart').innerHTML = s;
    }
}

function cartDisplayMobile(){    
    var cartArray = JSON.parse(localStorage.getItem('cart'));
    if (cartArray == undefined || cartArray.length == 0) {
        var s = `<a href="../index.html">
            <img src="../img/emty-cart.png" alt="emty-cart">
            <h2>Bạn hiện chưa có sản phẩm nào trong giỏ hàng</h2>
            <span>Quay lại trang chủ</span>
        </a>`;
        document.getElementById('wrap-cart').innerHTML = s;
    } else {
        var s = "";
        for (let i = 0; i < cartArray.length; i++) {
            s += `<tr>
                    <td rowspan="2"><input type="checkbox" id="${cartArray[i].id}" onchange="buy()"></td>
                    <td rowspan="2" class="cart-item-image"><img src="../${cartArray[i].image}" alt="product"></td>
                    <td rowspan="2" class="cart-item-name"><label for="${cartArray[i].id}">${cartArray[i].name}</label></td>
                    <td class="cart-item-quantity">
                        <div class="count-quantity">
                            <button class="bot" onclick="adjustQuantity('${cartArray[i].id}', -1)"style="display: flex; justify-content: center; align-items: center;">-</button>
                            <input type="text" id="sl-${cartArray[i].id}" class="quantity" value="${cartArray[i].quantity}" readonly style="width: 40px; font-size: 14px; padding: 5px; text-align: center; border-width:2px 0px">
                            <button class="them" onclick="adjustQuantity('${cartArray[i].id}', 1)"style="display: flex; justify-content: center; align-items: center;">+</button>
                        </div>
                    </td>
                    <td class="cart-item-price">${cartArray[i].price}</td>
                </tr>
                <td class="cart-item-size">
                <select onchange="adjustSize(this, '${cartArray[i].id}')">
                    <option value="31" ${cartArray[i].size === '31' ? 'selected' : ''}>31</option>
                    <option value="32" ${cartArray[i].size === '32' ? 'selected' : ''}>32</option>
                    <option value="33" ${cartArray[i].size === '33' ? 'selected' : ''}>33</option>
                    <option value="34" ${cartArray[i].size === '34' ? 'selected' : ''}>34</option>
                    <option value="35" ${cartArray[i].size === '35' ? 'selected' : ''}>35</option>
                    <option value="36" ${cartArray[i].size === '36' ? 'selected' : ''}>36</option>
                    <option value="37" ${cartArray[i].size === '37' ? 'selected' : ''}>37</option>
                </select>
            </td>`;
        }
        s = `<table class="cart-table">
            <tr>
                <td></td>
                <th class="cart-item-image">Hình ảnh</th>
                <th class="cart-item-name">Tên sản phẩm</th>
                <th class="cart-item-quantity">Tùy chỉnh</th>
                <th class="cart-item-price">Đơn giá</th>
                <td></td>
            </tr>` + s +
        `</table> 
        <div id="total-bill">
            <div>
                <input type="checkbox" id="check-all" onchange="checkAllItems()"> 
                <label for="check-all">Chọn tất cả</label>
            </div>
            <button onclick="deleteCheckedItems()" class="delete">Xóa</button>
            <span id="total-pay">Tổng thanh toán: </span>
            <button id="open-checkout-button" onclick="openCheckout()">Thanh toán</button>
        </div>`;
        document.getElementById('wrap-cart').innerHTML = s;
    }
}

function adjustSize(obj, id){
    var cart= JSON.parse(localStorage.getItem('cart'));
    for(var i=0; i<cart.length; i++){
        if(cart[i].id== id) {
            cart[i].size= obj.value;
            obj.value= cart[i].size;
        }
    }
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
    console.log(carttemp);
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
function buy(){
    checkCart();
    var s = 0;
    for (let i = 0; i < carttemp.length; i++) {
        var quantity = parseInt(document.getElementById(`sl-${carttemp[i].id}`).value); 
        s += quantity * carttemp[i].price;
    }
    document.getElementById("total-pay").innerHTML = "Tổng thanh toán: " + s;
    return s;
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
            
window.onload = function(){
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
      overlay.style.display = 'flex';
      showAddressBox();
    }
};

function showAddressBox() {
    hideAllBoxes(); 
    addressBox.style.display = 'block';
}

function closeCheckout() {
    overlay.style.display = 'none';
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
    overlay.style.display = 'none';
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
    var cartArray = JSON.parse(localStorage.getItem('cart'));
    for (let i = 0; i < cartArray.length; i++) {
        if (cartArray[i].id === itemId) {
            let quantityInput = document.getElementById(`sl-${itemId}`);
            let currentQuantity = parseInt(quantityInput.value);
            let newQuantity = currentQuantity + change;
            if (newQuantity < 1) {
                alert('Số lượng tối thiểu là 1');
                return;
            }
            quantityInput.value = newQuantity;
            cartArray[i].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cartArray));
            break;
        }
    }
    buy();
}