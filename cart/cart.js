
function them(){
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
}

function xoabill(){
    localStorage.removeItem("bill");
    localStorage.removeItem("loggeduser");
}

function thembill(){
    const users = [
        { username: "user1", password: "password1" },
        { username: "user2", password: "password2" },
        { username: "user3", password: "password3" },
    ];
    localStorage.setItem("user", JSON.stringify(users));

    const loggeduser= { username: "user1", password: "password1" };
    localStorage.setItem("loggeduser", JSON.stringify(loggeduser));

    const bills = [
        {
            receiptId: 1,
            customer: { username: "user1", password: "password1" },
            status: "Chờ xác nhận",
            orderDate: "2024-11-16",
            paymentMethod: "Chuyển khoản",
            totalAmount: 2000000,
            products: [
                { quantity: 3, name: "Giày Adidas UltraBoost" },
                { quantity: 1, name: "Giày Nike Air Max" }
            ]
        },
        {
            receiptId: 2,
            customer: { username: "user2", password: "password2" },
            status: "Đã xác nhận",
            orderDate: "2024-11-15",
            paymentMethod: "Tiền mặt",
            totalAmount: 2500000,
            products: [
                { quantity: 1, name: "Giày Converse Chuck Taylor" }
            ]
        },
        {
            receiptId: 3,
            customer: { username: "user3", password: "password3" },
            status: "Đã giao",
            orderDate: "2024-11-14",
            paymentMethod: "Chuyển khoản",
            totalAmount: 1500000,
            products: [
                { quantity: 2, name: "Giày Vans Old Skool" }
            ]
        },
        {
            receiptId: 4,
            customer: { username: "user1", password: "password1" },
            status: "Đã giao",
            orderDate: "2024-11-13",
            paymentMethod: "Tiền mặt",
            totalAmount: 1200000,
            products: [
                { quantity: 1, name: "Giày Puma Suede Classic" }
            ]
        },
        {
            receiptId: 5,
            customer: { username: "user2", password: "password2" },
            status: "Chờ xác nhận",
            orderDate: "2024-11-12",
            paymentMethod: "Chuyển khoản",
            totalAmount: 1800000,
            products: [
                { quantity: 4, name: "Giày New Balance 574" }
            ]
        },
        {
            receiptId: 6,
            customer: { username: "user3", password: "password3" },
            status: "Đã xác nhận",
            orderDate: "2024-11-11",
            paymentMethod: "Tiền mặt",
            totalAmount: 2100000,
            products: [
                { quantity: 1, name: "Giày Reebok Club C" }
            ]
        },
        {
            receiptId: 7,
            customer: { username: "user1", password: "password1" },
            status: "Đã giao",
            orderDate: "2024-11-10",
            paymentMethod: "Chuyển khoản",
            totalAmount: 1700000,
            products: [
                { quantity: 2, name: "Giày Asics Gel-Lyte III" }
            ]
        },
        {
            receiptId: 8,
            customer: { username: "user2", password: "password2" },
            status: "Đã giao",
            orderDate: "2024-11-09",
            paymentMethod: "Tiền mặt",
            totalAmount: 2200000,
            products: [
                { quantity: 1, name: "Giày Jordan 1" }
            ]
        },
        {
            receiptId: 9,
            customer: { username: "user3", password: "password3" },
            status: "Chờ xác nhận",
            orderDate: "2024-11-08",
            paymentMethod: "Chuyển khoản",
            totalAmount: 3000000,
            products: [
                { quantity: 2, name: "Giày Balenciaga Triple S" }
            ]
        },
        {
            receiptId: 10,
            customer: { username: "user1", password: "password1" },
            status: "Đã xác nhận",
            orderDate: "2024-11-07",
            paymentMethod: "Tiền mặt",
            totalAmount: 8000000,
            products: [
                { quantity: 1, name: "Giày Yeezy Boost 350" }
            ]
        }
    ];
    localStorage.setItem("bill", JSON.stringify(bills));
}

function cartDisplay(){    
    var cartArray= JSON.parse(localStorage.getItem('cart'));
    if (cartArray== undefined || cartArray.length==0){
        var s=`<a href="../index.html">
            <img src="../img/emty-cart.png" alt="emty-cart">
            <h2>Bạn hiện chưa có sản phẩm nào trong giỏ hàng</h2>
            <span>Quay lại trang chủ</span>
        </a>`;
        document.getElementById('wrap-cart').innerHTML=s;
    }
    else{
        var s ="";
        for(let i=0;i<cartArray.length;i++){
            s+= `<tr>
                    <td><input type="checkbox" id="${cartArray[i].id}" onchange="buy()"></td>
                    <td class="cart-item-image"><img src="../${cartArray[i].image}" alt="product"></td>
                    <td class="cart-item-name"><label for="${cartArray[i].id}">${cartArray[i].name}</label</td>
                    <td class="cart-item-quantity">
                        <div class="count-quantity">
                            <button class="bot">-</button>
                            <input type="text" id="sl" class="quantity" value="1">
                            <button class="them">+</button>
                        <div>
                    </td>
                    <td class="cart-item-price">${cartArray[i].price}</td>
                    <td><button onclick="deletecartitem('${cartArray[i].id}')">X</button></td>
                </tr>`
        }
        s= `<table class="cart-table">
            <tr>
                <td></td>
                <th class="cart-item-image">Hình ảnh</th>
                <th class="cart-item-name">Tên sản phẩm</th>
                <th class="cart-item-quantity">Số lượng</th>
                <th class="cart-item-price">Thành tiền</th>
                <td></td>
            </tr>` + s +
        `</table> 
        <div id="total-bill">
            <div>
                <input type="checkbox" id="check-all" onchange="checkAllItems(), buy()"> 
                <label for="check-all">Chọn tất cả</label>
            </div>
            <button onclick="deleteCheckedItems()">Xóa</button>
            <span id="total-pay">Tổng thanh toán: </span>
            <button>Thanh toán</button>
        </div>
        `;
        document.getElementById('wrap-cart').innerHTML=s;
        for(let i = 0; i <=cartArray.length; i++) {
            document.getElementsByClassName('cart-item-image')[i].style.width="20%";
            document.getElementsByClassName('cart-item-quantity')[i].style.width="20%";
            document.getElementsByClassName('cart-item-price')[i].style.width="20%";
        }
    }
}

var carttemp=[];
function checkCart(){
    carttemp=[];  
    var cartArray= JSON.parse(localStorage.getItem('cart'));
    for(var i=0; i<cartArray.length; i++){
        var check= document.getElementById(cartArray[i].id);
        if(check.checked== true) carttemp.push(cartArray[i]);
    }
}

function checkAllItems(){
    var cartArray= JSON.parse(localStorage.getItem('cart'));
    var check= document.getElementById("check-all");
    if(check.checked== true)
        for(var i=0; i<cartArray.length; i++)
            document.getElementById(cartArray[i].id).checked= true;
    else
        for(var i=0; i<cartArray.length; i++)
            document.getElementById(cartArray[i].id).checked= false;
}

function deleteCheckedItems(){
    checkCart();
    for (let i=0; i < carttemp.length; i++)
        deletecartitem(carttemp[i].id);
}

    function deletecartitem(id){
        var cartArray= JSON.parse(localStorage.getItem('cart'));
        for(let i=0; i < cartArray.length; i++)
            if (cartArray[i].id==id){
                cartArray.splice(i, 1);
                break;
            }
        localStorage.setItem('cart',JSON.stringify(cartArray));
        cartDisplay();
    }

function buy(){
    checkCart();
    var s=0;
    console.log(parseInt(document.getElementsByClassName('quantity')[0].value))
    for(let i=0; i <carttemp.length; i++)
        s+= parseInt(document.getElementsByClassName('quantity')[i].value) * carttemp[i].price;
    document.getElementById("total-pay").innerHTML="Tổng thanh toán: " + s;
}

function notLogin(){
    document.getElementById("wrap-cart").innerHTML=`
        <a href="#">
            <img src="../img/anonymous-user.png" alt="anonymous-user">
            <h2>Bạn phải đăng nhập để xem chức năng này</h2>
            <span>Đi đến đăng nhập</span>
        </a>
    `
}

function showBill(number){
    var loggeduser = JSON.parse(localStorage.getItem('loggeduser'));
    var bill= JSON.parse(localStorage.getItem('bill'));
    if(loggeduser == undefined ) notLogin();
    else{
        var variable= "";
        if (number== 1) variable="Chờ xác nhận";
        else if (number== 2) variable="Đã xác nhận";
        else variable="Đã giao";
        var s="";
        for(var i=0; i< bill.length; i++){
            if(bill[i].customer.username == loggeduser.username && bill[i].customer.password== loggeduser.password && bill[i].status== variable){
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
                    <td>${bill[i].paymentMethod}</td>
                    </tr>
                    `;
            }
        }
        s= `
                        <table>
                            <tr>
                                <th>Mã hóa đơn</th>
                                <th>Sản phẩm đã đặt</th>
                                <th>Ngày đặt</th>
                                <th>Tổng tiền</th>
                                <th>Phương thức thanh toán</th>
                            <tr> `+ s + `

                        </table>
                    `
                    document.getElementById("wrap-cart").innerHTML=s;   
    }
}

window.onload = function(){
    var temp= location.href.split("?")[1];
    if(temp ==undefined || temp=="") cartDisplay();
    else{
        temp=temp.split("&")[1];
        if(temp==0) cartDisplay();
        else if(temp== 1) showBill(1); 
        else if(temp== 2) showBill(2); 
        else showBill(3); 
    }
}