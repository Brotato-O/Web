function SaleProducts(){
    var countP= [];
    var products= JSON.parse(localStorage.getItem("products"));
    for(var i=0; i< products.length; i++){
        countP.push({productId: products[i].productId, productName: products[i].name ,totalAmount: 0, quantity: 0});
    }
    var bill= JSON.parse(localStorage.getItem("bill"));
    for(var i=0; i< bill.length; i++){
        if(bill[i].status=="Đã giao"){
            for(var j=0; j< bill[i].product.length; j++){
                for(var k=0; k< countP.length; k++){
                    if(countP[k].productId==bill[i].product[j].id){
                        countP[k].totalAmount+=Number(bill[i].product[j].price)* Number(bill[i].product[j].quantity);
                        countP[k].quantity+=Number(bill[i].product[j].quantity);
                        break;
                    }
                }
            }
        }
    }
    console.log(countP);
    localStorage.setItem("countP", JSON.stringify(countP));
}

function onQuantity(){
    var countP= JSON.parse(localStorage.getItem("countP"));
    for(var i=0; i< countP.length; i++){
        for(var j=0; j<countP.length-1; j++){
            if(Number(countP[j].quantity) < Number(countP[j+1].quantity)){
                var temp = countP[j];
                countP[j] = countP[j + 1];
                countP[j + 1] = temp;
            }
        }
    }
    localStorage.setItem("countP", JSON.stringify(countP));
}

function onMoney(){
    var countP= JSON.parse(localStorage.getItem("countP"));
    for(var i=0; i< countP.length; i++){
        for(var j=0; j<countP.length-1; j++){
            if(Number(countP[j].totalAmount) < Number(countP[j+1].totalAmount)){
                var temp = countP[j];
                countP[j] = countP[j + 1];
                countP[j + 1] = temp;
            }
        }
    }
    localStorage.setItem("countP", JSON.stringify(countP));
}

function showSaleProducts(index){
    var countP= JSON.parse(localStorage.getItem("countP"));
    var div= document.getElementById("pages");
    var s= "";
    div.innerHTML=``;
    var length= countP.length;
    const BPP=5;
    var pages= Math.ceil(length/BPP);
    var startIndex= (index-1)*BPP;
    var endIndex= startIndex+BPP;
    if(endIndex> length) endIndex= length;
    for(let i=0; i<pages; i++){
      div.innerHTML +=`
       <button class="page" onclick="showSaleProducts('${i+1}')">${i+1}</button>
      `;
  }
    for(var i=startIndex; i< endIndex; i++){
        s+= `
            <tr>
            <td>${i+1}</td>
            <td>${countP[i].productId}</td>
            <td>${countP[i].quantity}</td>
            <td>${countP[i].totalAmount}</td>
            </tr>
        `;
    }
    document.getElementById("countP-wrap").innerHTML=`<table id="showCountP">
        <tr>
          <th>Số thứ tự</th>
          <th>Mã sản phẩm</th>
          <th>Số lượng</th>
          <th>Tổng tiền</th>
        </tr>` + s+ 
      `</table>`;
}