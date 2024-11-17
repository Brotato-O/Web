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

function cartDisplay(){    
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
        for(let i=0;i<cartArray.length;i++){
            
            s+= `<tr>
                    <td><input type="checkbox" id="${cartArray[i].id}" onchange="buy()"></td>
                    <td class="cart-item-image"><img src="${cartArray[i].image}" alt="product"></td>
                    <td class="cart-item-name"><label for="${cartArray[i].id}">${cartArray[i].name}</label</td>
                    <td class="cart-item-quantity">
                        <div class="count-quantity">
                            <button class="bot">-</button>
                            <input type="text" id="sl" class="quantity" value="1">
                            <button class="them">+</button>
                        <div>
                    </td>
                    <td class="cart-item-price">${cartArray[i].price}</td>
                    <td><button onclick="deletecartitem(${cartArray[i].id})">X</button></td>
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
                <input type="checkbox" id="check-all" onchange="checkallitems()"> 
                <label for="check-all">Chọn tất cả</label>
            </div>
            <button onclick="deletecheckeditems()">Xóa</button>
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

function mm() {}

var carttemp=[];
function checkcart(){
    carttemp=[];  
    var cartArray= JSON.parse(localStorage.getItem('cart'));
    for(var i=0; i<cartArray.length; i++){
        var check= document.getElementById(cartArray[i].id);
        if(check.checked== true) carttemp.push(cartArray[i]);
    }
}

function checkallitems(){
    var cartArray= JSON.parse(localStorage.getItem('cart'));
    var check= document.getElementById("check-all");
    if(check.checked== true)
        for(var i=0; i<cartArray.length; i++)
            document.getElementById(cartArray[i].id).checked= true;
    else
        for(var i=0; i<cartArray.length; i++)
            document.getElementById(cartArray[i].id).checked= false;
}

function deletecheckeditems(){
    checkcart();
    for (let i=0; i < carttemp.length; i++)
        deletecartitem(carttemp[i].id);
}

function deletecartitem(id){
    var cartArray= JSON.parse(localStorage.getItem('cart'));
    for(let i=0; i < cartArray.length; i++)
    if (cartArray[i].id==id)
        cartArray.splice(i, 1);
    localStorage.setItem('cart',JSON.stringify(cartArray));
    cartDisplay();
}

function buy(){
    checkcart();
    var s=0;
    console.log(parseInt(document.getElementsByClassName('quantity')[0].value))
    for(let i=0; i <carttemp.length; i++)
        s+= parseInt(document.getElementsByClassName('quantity')[i].value) * carttemp[i].price;
    document.getElementById("total-pay").innerHTML="Tổng thanh toán: " + s;
}

window.onload = function(){
    var temp= location.href.split("?")[1];
    if(temp ==undefined || temp=="") cartDisplay();
    else{
        temp=temp.split("&")[1];
        if(temp==0) cartDisplay();
        else if(temp==1){}
        else if(temp==2){}
        else if(temp==3){}
    }
}