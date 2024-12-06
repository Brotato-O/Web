const openCheckoutButton = document.getElementById('open-checkout-button');
const paymentMethodBox = document.getElementById('payment-method-box');
const confirmPaymentButton = document.getElementById('confirm-payment-button');
const newAddressBox = document.getElementById('new-address-box');
const addressBox = document.getElementById('address-box');
const cardInfoBox = document.getElementById('card-info-box');
const paymentImageContainer = document.getElementById('payment-image-container');
var cf=0; 
var address= null;

let locationData;

fetch('/locationdata.json')
    .then(response => response.json())
    .then(data => {
        locationData = data; 
        loadCitiesForNewAddress(); 
    })
    .catch(error => console.error('Lỗi khi tải dữ liệu:', error));

function xoabill(){
    localStorage.removeItem("bill");
    localStorage.removeItem("userlogin");
}

//hiển thị giỏ hàng
function cartDisplay(){    
    var cartArray = JSON.parse(localStorage.getItem('userCarts'));
    var username = JSON.parse(localStorage.getItem('currentUser')).username;
    if (cartArray == undefined|| cartArray[username] == undefined || cartArray[username].length == 0 ) {
        var s = `<a href="../index.html">
            <img src="../img/emty-cart.png" alt="emty-cart">
            <h2>Bạn hiện chưa có sản phẩm nào trong giỏ hàng</h2>
            <span>Quay lại trang chủ</span>
        </a>`;
        document.getElementById('wrap-cart').innerHTML = s;
    } else {
        var s = "";
        for (let i = 0; i < cartArray[username].length; i++) {
            var quantity = Number(cartArray[username][i].quantity); 
            s += `<tr>
                    <td><input type="checkbox" id="${i}" onchange="buy()"></td>
                    <td class="cart-item-image"><img src="../${cartArray[username][i].image}" alt="product"></td>
                    <td class="cart-item-name"><label for="${i}">${cartArray[username][i].title}</label></td>
                    <td class="cart-item-quantity">
                        <div class="count-quantity">
                            <button class="bot" onclick="adjustQuantity('${i}', -1)"style="display: flex; justify-content: center; align-items: center;margin-left:0px">-</button> 
                            <input type="text" id="sl-${i}" class="quantity" value="${quantity}" onchange="checkNum(this, ${i})" style="width: 40px; font-size: 14px; padding: 5px; text-align: center; border-width:2px 0px">
                            <button class="them" onclick="adjustQuantity('${i}', 1)"style="display: flex; justify-content: center; align-items: center;">+</button>
                        </div>
                    </td>
                    <td>
                    <select onchange="adjustSize(this, '${i}')">
                        <option value="31" ${cartArray[username][i].size == '31' ? 'selected' : ''}>31</option>
                        <option value="32" ${cartArray[username][i].size == '32' ? 'selected' : ''}>32</option>
                        <option value="33" ${cartArray[username][i].size == '33' ? 'selected' : ''}>33</option>
                        <option value="34" ${cartArray[username][i].size == '34' ? 'selected' : ''}>34</option>
                        <option value="35" ${cartArray[username][i].size == '35' ? 'selected' : ''}>35</option>
                        <option value="36" ${cartArray[username][i].size == '36' ? 'selected' : ''}>36</option>
                        <option value="37" ${cartArray[username][i].size == '37' ? 'selected' : ''}>37</option>
                </select>
            </td>
                    <td class="cart-item-price">${cartArray[username][i].price.toLocaleString()} VND</td>
                    <td><button class="delete" onclick="checkDelete('${i}')">X</button></td>
                </tr>`;
        }
        s = `<table id="cart-table">
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

function checkNum(obj, id){
    document.getElementById(id).checked = true;
    var cartArray = JSON.parse(localStorage.getItem('userCarts'));
    var username = JSON.parse(localStorage.getItem('currentUser')).username;
    var check=/^[1-9][0-9]*$/;
    const length= cartArray[username].length;
    if(obj.value!= 0 && !check.test(obj.value)) {
        toast({ title: 'Thất bại', message: 'Số lượng không hợp lệ', type: 'error', duration: 3000 });
        obj.value= 1;
    }
    else if(obj.value==0){ 
        checkDelete(id);
        var cartArray1 = JSON.parse(localStorage.getItem('userCarts'));
        if (cartArray1[username].length < length) return;
        else obj.value= 1;
    }  
    
        
            cartArray[username][id].quantity= obj.value;
        

        
    localStorage.setItem('userCarts', JSON.stringify(cartArray));
    buy();
}

function cartDisplayMobile(){    
    cartDisplay();
    var table = document.getElementById('cart-table');
    var change= document.getElementsByClassName("cart-item-quantity");
    var cartArray = JSON.parse(localStorage.getItem('userCarts'));
    var username = JSON.parse(localStorage.getItem('currentUser')).username;
    var row= table.rows;
    for(var i=0; i< row.length; i++){
        row[i].deleteCell(6);  
        row[i].deleteCell(4);  
    }
    for(var i=0 ; i< cartArray[username].length ; i++){
    change[i+1].innerHTML +=`
    <select onchange="adjustSize(this, '${i}')">
        <option value="31" ${cartArray[username][i].size == '31' ? 'selected' : ''}>31</option>
        <option value="32" ${cartArray[username][i].size == '32' ? 'selected' : ''}>32</option>
        <option value="33" ${cartArray[username][i].size == '33' ? 'selected' : ''}>33</option>
        <option value="34" ${cartArray[username][i].size == '34' ? 'selected' : ''}>34</option>
        <option value="35" ${cartArray[username][i].size == '35' ? 'selected' : ''}>35</option>
        <option value="36" ${cartArray[username][i].size == '36' ? 'selected' : ''}>36</option>
        <option value="37" ${cartArray[username][i].size == '37' ? 'selected' : ''}>37</option>
    </select>`
    }
}

function adjustSize(obj, id){
    var cartArray = JSON.parse(localStorage.getItem('userCarts'));
    var username = JSON.parse(localStorage.getItem('currentUser')).username;
            cartArray[username][id].size= Number(obj.value);
      
    document.getElementById(id).checked = true;
    localStorage.setItem('userCarts', JSON.stringify(cartArray));
    buy();
}


//Hàm điều chỉnh số lượng 
function adjustQuantity(id, change) {
    document.getElementById(id).checked = true;
    var cartArray = JSON.parse(localStorage.getItem('userCarts'));
    var username = JSON.parse(localStorage.getItem('currentUser')).username;
    var newQuantity = Number(cartArray[username][id].quantity) + change;
    const length= cartArray[username].length;
    if (newQuantity < 1) {
        checkDelete(id);
        var cartArray1 = JSON.parse(localStorage.getItem('userCarts'));
        if (cartArray1[username].length < length) return;
        else newQuantity = 1;
    }
    var quantityInput = document.getElementById(`sl-${id}`);
    quantityInput.value = newQuantity;
    
    cartArray[username][id].quantity = Number(quantityInput.value);
    localStorage.setItem('userCarts', JSON.stringify(cartArray));
    buy();
}

//kiểm tra sản phẩm được chọn
var carttemp=[];
function checkCart(){
    carttemp=[];  
    var cartArray= JSON.parse(localStorage.getItem('userCarts'));
    var username= JSON.parse(localStorage.getItem('currentUser')).username;
    
    for(var i=0; i<cartArray[username].length; i++){
        var check= document.getElementById(i);
        if(check.checked== true) {
            carttemp.push(cartArray[username][i]);
            carttemp[carttemp.length-1].cartId= check.id;
        }
    }
}

//chọn tất cả sản phẩm
function checkAllItems(){
    var cartArray = JSON.parse(localStorage.getItem('userCarts'));
    var username = JSON.parse(localStorage.getItem('currentUser')).username;
    var check= document.getElementById("check-all");
    if(check.checked== true)
        for(var i=0; i<cartArray[username].length; i++)
            document.getElementById(i).checked= true;
    else
        for(var i=0; i<cartArray[username].length; i++)
            document.getElementById(i).checked= false;
    buy();
}

//hàm đổi
//function currency(value) { return value.toLocaleString('vi-VN'); }

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
        toast({ title: 'Thất bại', message: 'Bạn chưa chọn sản phẩm để xóa', type: 'error', duration: 3000 });
        return;
    };
    if(warning()== false) return;
    for(let i=carttemp.length-1 ; i> -1; i--){
        deleteCartItem(carttemp[i].cartId);
    }
    cartDisplay();
}
function deleteItems(){
    checkCart();
    for(let i=carttemp.length-1 ; i> -1; i--){
        deleteCartItem(carttemp[i].cartId);
    }
    cartDisplay();
}
//xóa sản phẩm
function checkDelete(id){
    if (warning()== false) return;
    deleteCartItem(id);
}

function deleteCartItem(id){
    var cartArray = JSON.parse(localStorage.getItem('userCarts'));
    var username = JSON.parse(localStorage.getItem('currentUser')).username;
    cartArray[username].splice(id, 1);
    console.log(cartArray[username]);
    localStorage.setItem('userCarts',JSON.stringify(cartArray));
    cartDisplay();
}

//hiển thị giá tiền
function buy(){
    checkCart();
    var s = 0;
    for (let i = 0; i < carttemp.length; i++) 
        
            s+= Number(carttemp[i].quantity) * Number(carttemp[i].price);
        
    document.getElementById("total-pay").innerHTML = "Tổng thanh toán: " + s.toLocaleString() +"VND";
    return s;
}

//hủy đơn
function huy(id){
    document.getElementById("overlay2").style.display="block";
    document.getElementById("cancel2").setAttribute("value", id);
}
function huydon(obj){
    if (obj.innerHTML=="Gửi"){
        var bill= JSON.parse(localStorage.getItem("bill"));
        for(let i=0; i< bill.length; i++){
            if(bill[i].receiptId == obj.value){
                bill[i].status = "Đã hủy";
                bill[i].reason= document.getElementById("reason").value;
                break;
            }
        }
        localStorage.setItem('bill',JSON.stringify(bill));
        document.getElementById("overlay2").style.display= "none";
        showBill(1);
        toast({ title: 'Hủy đơn thành công', message: 'Cảm ơn sự đóng góp của bạn', type: 'success', duration: 3000 });
    }
    else document.getElementById("overlay2").style.display= "none";
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

function showPaid(id){
    var bill= JSON.parse(localStorage.getItem('bill'));
    document.getElementById("overlay3").style.display="block";
    document.getElementById("ava1").src="img/logo.jpg";
    for(var i=0; i< bill.length; i++){
        if(bill[i].receiptId == id){
            document.getElementById("keyPaid").innerHTML = bill[i].receiptId;
            document.getElementById("datePaid").innerHTML = bill[i].orderDate;
            document.getElementById("statusPaid").innerHTML = bill[i].status;
            document.getElementById("addressPaid").innerHTML = bill[i].address;
            document.getElementById("customerPaid").innerHTML = bill[i].username;
            document.getElementById("phonePaid").innerHTML = bill[i].sdt;
            var s="";
            for(var j=0; j< bill[i].product.length; j++){
                s+=`<tr>
                    <td>${bill[i].product[j].title}</td>
                    <td>${bill[i].product[j].size}</td>
                    <td>${(Number(bill[i].product[j].quantity)).toLocaleString()}</td>
                    <td>${(Number(bill[i].product[j].price)).toLocaleString()}</td>
                </tr>`;
            }
            document.getElementById("showP").innerHTML=`<tr id="dong1"> 
            <th>Sản phẩm</th>
            <th>Size</th>
            <th>Số lượng</th>
            <th>Đơn giá</th>
        </tr>` + s + `<tr>
            <td colspan="3" class="title1">Tổng tiền</td>
            <td>${(bill[i].totalAmount).toLocaleString()} VNĐ</td>
        </tr>`;
            document.getElementById("methodPaid").innerHTML = bill[i].paymentMethod;
        }
    }
}

//hiển thị tình trạng đơn
function showBill(number){
    var username = JSON.parse(localStorage.getItem('currentUser')).username;
    var bill= JSON.parse(localStorage.getItem('bill'));
    if(username == undefined ) notLogin();
    else if(bill==undefined){
        var s= "";
        document.getElementById("wrap-cart").innerHTML=`
        <a href="../shop.html">
            <img src="../img/emty-cart.png" alt="emty-cart">
            <h2>Bạn hiện chưa có đơn hàng nào</h2>
            <span>Đến khu mua sắm</span>
        </a>
    `
    }
    else{
        var variable= "";
        if (number== 1) variable="Chờ xác nhận";
        else if (number== 2) variable="Đã xác nhận";
        else if (number== 3) variable="Đang giao";
        else if(number==4) variable="Đã giao";
        else variable="Đã hủy";
        var s="";
        for(var i=0; i< bill.length; i++){
            if(username== bill[i].username){
                if(bill[i].status== variable){
                        s+=`
                            <tr class="row1" id=${bill[i].receiptId}>
                                <td>${bill[i].receiptId}</td>
                                <td>${bill[i].orderDate}</td>
                                <td>${bill[i].totalAmount}</td>
                                <td>${bill[i].paymentMethod}</td>
                                <td><button onclick="showPaid('${bill[i].receiptId}')">Xem chi tiết</button></td>
                            </tr>`;
                }
            }
        }
        s= `<table class="status-table">
                <tr>
                    <th>Mã hóa đơn</th>
                    <th>Ngày đặt</th>
                    <th>Tổng tiền</th>
                    <th>Phương thức</th>
                    <th id="rong" style="width: 15%; "></th>
                <tr>`+s+`</table>`;
        document.getElementById("wrap-cart").innerHTML=s;   
        if (number==1){
            var rows= document.getElementsByClassName("row1");
            for(let i=0; i< rows.length; i++){
                rows[i].innerHTML+=`
                <td><button onclick="huy('${rows[i].id}')">Hủy đơn</button></td>`;
                document.getElementById("rong").setAttribute("colspan", "2");
                }
            }
    }
}

var device= "desktop";
//hàm hiển thị điện thoại
function displayMobile(){

    var temp= location.href.split("?")[1];
    if (temp ==undefined || temp==""){
        if(window.innerWidth< 768 && device!= "mobile"){
            cartDisplayMobile();
            device= "mobile";
        } 
        else if(window.innerWidth>= 768 && device!= "desktop"){
            cartDisplay();
            device= "desktop";
        }
    }
}

window.addEventListener("resize", displayMobile);
            
window.addEventListener("load", function(){
    addCSS();
    var temp= location.href.split("?")[1];
    if(temp ==undefined || temp=="") {
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
        else if(temp==4) showBill(4); 
        else showBill(5); 
    }
})

function addCSS(){
    var li= document.getElementsByClassName('status-li');
    var temp= location.href.split("?")[1];
    if(temp ==undefined || temp=="" ) {
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

function addToBill(){
    var username= JSON.parse(localStorage.getItem('currentUser')).username;
    var account= JSON.parse(localStorage.getItem('accounts'));
    var bill= JSON.parse(localStorage.getItem('bill')) || [];
    var profile= JSON.parse(localStorage.getItem('userProfile'));
    checkCart();
    var length=bill.length;
    bill[length]= {};
    if( profile== undefined || profile[username]==undefined ) {
        for(var i=0; i < account.length; i++)
            if(account[i].username==username) bill[length].name= account[i].name;}
    else
        

        bill[username]=profile[username].name;
    bill[length].receiptId= length;
    bill[length].username= username;
    bill[length].product= [];
    for(let i=0; i< carttemp.length; i++){
        bill[length].product.push(carttemp[i]);
    }
    bill[length].totalAmount = buy();
    var date= new Date();
    var month= date.getMonth()+1;
    if (month<=9) month= "0"+month;
    var day= date.getDate();
    if (day<=9) day= "0"+day;
    bill[length].orderDate= `${date.getFullYear()}-${month}-${day}`;
    var radio= document.getElementsByName("payment-method");
    var temp;
    for(var i=0; i<radio.length; i++)
        if(radio[i].checked) temp=radio[i].value;
    bill[length].paymentMethod=temp;
    bill[length].status = "Chờ xác nhận";
    if(cf==1){
        bill[length].address= `Số nhà: ${address.houseNumber}, Đường: ${address.street}, Phường: ${address.ward}, Quận: ${address.district}, Thành phố: ${address.city}`;
        bill[length].sdt= address.phone;
    }   
     else {
        bill[length].address= profile[username].address;
        bill[length].sdt=  profile[username].phone;
    }
    localStorage.setItem('bill',JSON.stringify(bill));

    deleteItems();
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
      toast({ title: 'Thất bại', message: 'Vui lòng chọn sản phẩm thanh toán !', type: 'error', duration: 3000 });
    } else {
      overlay1.style.display = 'flex';
      showAddressBox();
    }
};

function cfP(){
    //check phương thức thanh toán
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked');  
    if (!selectedMethod) {
        toast({ title: 'Thất bại', message: 'Vui lòng chọn sản phẩm', type: 'error', duration: 3000 });
      return; 
    }
    else if(selectedMethod.value === 'Thẻ ngân hàng' && validateCard()== false){
        return;
    }
    //ket thuc
    closeCheckout();
    document.getElementById("overlay4").style.display = 'block';
    checkCart();
    if(cf==1){
        document.getElementById("customerPay").innerHTML= address.name;
        document.getElementById("phonePay").innerHTML= address.phone;
        document.getElementById("addressPay").innerHTML= `Số nhà: ${address.houseNumber}, Đường: ${address.street}, Phường: ${address.ward}, Quận: ${address.district}, Thành phố: ${address.city}`;
    } 
    else{
        var profile= JSON.parse(localStorage.getItem("userProfile"));
    var username= JSON.parse(localStorage.getItem("currentUser")).username;
    var customer= profile[username];
        document.getElementById("customerPay").innerHTML= customer.name;
        document.getElementById("phonePay").innerHTML= customer.phone;
        document.getElementById("addressPay").innerHTML= customer.address;
    }
    var s="";
    var date= new Date();
    var month= date.getMonth()+1;
    if (month<=9) month= "0"+month;
    var day= date.getDate();
    if (day<=9) day= "0"+day;
    document.getElementById("datePay").innerHTML=`${date.getFullYear()}-${month}-${day}`;
    document.getElementById("ava").src="img/logo.jpg";
    document.getElementById("methodPay").innerHTML= selectedMethod.value;
      for(var i=0; i< carttemp.length; i++){
                s+=`<tr>
                    <td>${carttemp[i].title}</td>
                    <td>${carttemp[i].size}</td>
                    <td>${(Number(carttemp[i].quantity)).toLocaleString()}</td>
                    <td>${(Number(carttemp[i].price)).toLocaleString()}</td>
                </tr>`;
            }
            document.getElementById("showP1").innerHTML=`<tr id="dong1"> 
            <th>Sản phẩm</th>
            <th>Size</th>
            <th>Số lượng</th>
            <th>Đơn giá</th>
        </tr>` + s + `<tr>
            <td colspan="3" class="title1">Tổng tiền</td>
            <td>${buy().toLocaleString()} VNĐ</td>
        </tr>`;
    
}

function back(){
    document.getElementById("overlay4").style.display="none";
    document.getElementById("overlay1").style.display="flex";
    document.getElementById("payment-method-box").style.display="block";
    PaymentMethodSelection();
}
function showAddressBox() {
    hideAllBoxes(); 
    addressBox.style.display = 'block';
}

function closeCheckout() {
    overlay1.style.display = 'none';
};

function close2(event){
    if(event.target.id=="overlay2" || event.target.id=="overlay3"){
        document.getElementById("overlay2").style.display="none";
        document.getElementById("overlay3").style.display="none";
    }
}

function useSavedAddress() {
    //nhàn
    var username= JSON.parse(localStorage.getItem('currentUser')).username;
    var profile= JSON.parse(localStorage.getItem("userProfile"));
    if(profile == null || profile[username] ==null||  Object.keys(profile[username]).length ==0) {
        toast({ title: 'Thất bại', message: 'Bạn chưa cập nhật địa chỉ !', type: 'error', duration: 3000 });
        return;
    }
    else if(profile[username].address== undefined){
        toast({ title: 'Thất bại', message: 'Bạn chưa cập nhật địa chỉ !', type: 'error', duration: 3000 });
        return;
    }
    cf=0;
    //nhàn
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

function PaymentMethodSelection() {
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked');

    cardInfoBox.style.display = 'none';
    paymentImageContainer.style.display = 'none';
    document.getElementById('cash-payment-box').style.display = 'none';

    if (selectedMethod && selectedMethod.value === 'Thẻ ngân hàng') {
        cardInfoBox.style.display = 'block';
    } else if (selectedMethod && selectedMethod.value === 'Chuyển khoản') {
        paymentImageContainer.style.display = 'flex';
        document.getElementById('payment-image').src = "../img/Chuyenkhoan.jpg"; 
    } else if (selectedMethod && selectedMethod.value === 'Tiền mặt') {
        document.getElementById('cash-payment-box').style.display = 'block';
        document.getElementById('cash-payment-amount').textContent = `Số tiền cần thanh toán: ${buy()} VND`;
    }
}

function checkout() {
    // const selectedMethod = document.querySelector('input[name="payment-method"]:checked');  
    // if (!selectedMethod) {
    //   alert('Vui lòng chọn phương thức thanh toán!');
    //   return; 
    // }
    
    addToBill();
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    paymentMethods.forEach((method) => method.checked = false);
    hideAllBoxes();  
    overlay1.style.display = 'none';
    toast({ title: 'Thành công', message: 'Sản phẩm đã được thanh toán !', type: 'success', duration: 3000 });
    
    closeCheckout(); 
    document.getElementById("overlay4").style.display = 'none';
}

function showPaymentMethodBox() {
    hideAllBoxes(); 
    paymentMethodBox.style.display = 'block';
    confirmPaymentButton.style.display = 'block';
}

// thêm điều kiện cho nhập địa chỉ
function validateNewAddress() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const houseNumber = document.getElementById('house-number').value.trim();
    const street = document.getElementById('street').value.trim();
    const ward = document.getElementById("ward-select-new").value;
    const district = document.getElementById("district-select-new").value;
    const city = document.getElementById("city-select-new").value;

    if (!name || !phone || !houseNumber || !street || !ward || !district || !city) {
        toast({ title: 'Thất bại', message: 'Vui lòng nhập đủ thông tin!', type: 'error', duration: 3000 });
        return false;
    }

    const phoneRegex = /^0[0-9]{9}$/; 
    if (!phoneRegex.test(phone)) {
        toast({ title: 'Thất bại', message: 'Vui lòng nhập số điện thoại đúng định dạng (0xx)!', type: 'error', duration: 3000 });
        return false;
    }

    return true;
}
function loadCitiesForNewAddress() {
    const citySelectNew = document.getElementById("city-select-new");
    for (const city in locationData) {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        citySelectNew.appendChild(option);
    }
}
function loadDistrictsForNewAddress() {
    const citySelectNew = document.getElementById("city-select-new");
    const districtSelectNew = document.getElementById("district-select-new");

    districtSelectNew.innerHTML = '<option value="">Chọn quận/huyện</option>';
    document.getElementById("ward-select-new").innerHTML = '<option value="">Chọn phường/xã</option>';

    const selectedCity = citySelectNew.value;
    if (selectedCity && locationData[selectedCity]) {
        Object.keys(locationData[selectedCity]).forEach(district => {
            const option = document.createElement("option");
            option.value = district;
            option.textContent = district;
            districtSelectNew.appendChild(option);
        });
    }
}

function loadWardsForNewAddress() {
    const citySelectNew = document.getElementById("city-select-new");
    const districtSelectNew = document.getElementById("district-select-new");
    const wardSelectNew = document.getElementById("ward-select-new");

    wardSelectNew.innerHTML = '<option value="">Chọn phường/xã</option>';

    const selectedCity = citySelectNew.value;
    const selectedDistrict = districtSelectNew.value;

    if (selectedCity && selectedDistrict && locationData[selectedCity][selectedDistrict]) {
        locationData[selectedCity][selectedDistrict].forEach(ward => {
            const option = document.createElement("option");
            option.value = ward;
            option.textContent = ward;
            wardSelectNew.appendChild(option);
        });
    }
}

function checkAddressCompletion() {
    const citySelectNew = document.getElementById("city-select-new").value;
    const districtSelectNew = document.getElementById("district-select-new").value;
    const wardSelectNew = document.getElementById("ward-select-new").value;
    const streetInput = document.getElementById("street");

    if (citySelectNew && districtSelectNew && wardSelectNew) {
        streetInput.style.display = "block"; 
    } else {
        streetInput.style.display = "none"; 
    }
}
function saveAddress() {
    address = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        houseNumber: document.getElementById("house-number").value,
        street: document.getElementById("street").value,
        ward: document.getElementById("ward-select-new").value,
        district: document.getElementById("district-select-new").value,
        city: document.getElementById("city-select-new").value,
    };

    if (!validateNewAddress()) {
        cf=0;
        return;
    }
    cf=1;
    newAddressBox.style.display = "none";
    showPaymentMethodBox();
}

document.addEventListener("DOMContentLoaded", () => {
    fetch('/locationdata.json')
        .then(response => response.json())
        .then(data => {
            locationData = data;
            loadCitiesForNewAddress();
        })
        .catch(error => console.error('Lỗi khi tải dữ liệu:', error));
});
// thêm điều kiện cho nhập thông tin thẻ nội địa
function validateCard() {
    const cardowner = document.getElementById('card-holder').value.trim();
    const cardnumber = document.getElementById('card-number').value.trim();
    const phonenumber = document.getElementById('card-phone').value.trim();
    const date = document.getElementById('card-expiry').value;

    if (!cardowner || !cardnumber || !phonenumber || !date) {
        toast({ title: 'Thất bại', message: 'Vui lòng nhập đủ thông tin!', type: 'error', duration: 3000 });
        return false;
    }
    
    const phoneRegex = /^0[0-9]{9}$/; 
    if (!phoneRegex.test(phonenumber)) {
        toast({ title: 'Thất bại', message: 'Vui lòng nhập số điện thoại đúng định dạng (0xx)!', type: 'error', duration: 3000 });
        return false;
    }


    const cardnumRegex = /^[0-9]{16,19}$/; 
    if (!cardnumRegex.test(cardnumber)) {
        toast({ title: 'Thất bại', message: 'Vui lòng nhập số thẻ đúng định dạng (16-19 chữ số)!', type: 'error', duration: 3000 });
        return false;
    }

    const cardownerRegex = /^[A-Z\s]+$/; 
    if (!cardownerRegex.test(cardowner)) {
        toast({ title: 'Thất bại', message: 'Vui lòng nhập tên chủ thẻ in hoa không dấu!', type: 'error', duration: 3000 });
        return false;
    }

    const today = new Date();
    const selectedDate = new Date(date);

    if (selectedDate <= today) { 
        toast({ title: 'Thất bại', message: 'Vui lòng chọn ngày hợp lệ và lớn hơn ngày hiện tại!', type: 'error', duration: 3000 });
        return false;
    }

    return true;
}