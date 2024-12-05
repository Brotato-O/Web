function SaleProducts(){
    var countP= [];
    var from= document.getElementById("countPFrom").value;
    var to= document.getElementById("countPTo").value;
    var products= JSON.parse(localStorage.getItem("products"));
    checkBill1(from,to);
    for(var i=0; i< products.length; i++){
        countP.push({productId: products[i].productId, bill:[] ,totalAmount: 0, quantity: 0});
    }
    for(var i=0; i< billtemp1.length; i++){
            for(var j=0; j< billtemp1[i].product.length; j++){
                for(var k=0; k< countP.length; k++){
                    if(countP[k].productId==billtemp1[i].product[j].id){
                        countP[k].totalAmount+=Number(billtemp1[i].product[j].price)* Number(billtemp1[i].product[j].quantity);
                        countP[k].quantity+=Number(billtemp1[i].product[j].quantity);
                        countP[k].bill.push(billtemp1[i]);
                        break;
                    }
                }
            }
        
    }
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
    var div1= document.getElementById("pages");
    var div= document.getElementById("countP-container").style.display="flex";
    var s= "";
    div1.innerHTML=``;
    var length= countP.length;
    const BPP=5;
    var pages= Math.ceil(length/BPP);
    var startIndex= (index-1)*BPP;
    var endIndex= startIndex+BPP;
    if(endIndex> length) endIndex= length;
    for(let i=0; i<pages; i++){
      div1.innerHTML +=`
       <button class="page" onclick="showSaleProducts('${i+1}')">${i+1}</button>
      `;
  }
  console.log(div1);
    for(var i=startIndex; i< endIndex; i++){
        s+= `
            <tr onclick=showDetail2()>
            <td>${i+1}</td>
            <td>${countP[i].productId}</td>
            <td>${countP[i].quantity}</td>
            <td>${countP[i].totalAmount}</td>
            </tr>
        `;
    }
    document.getElementById("main-countP").innerHTML=`
        <tr>
          <th>Số thứ tự</th>
          <th>Mã sản phẩm</th>
          <th>Số lượng</th>
          <th>Tổng tiền</th>
        </tr>` + s
      ;
}

var billtemp1=[];
function checkBill1(from, to){
    billtemp1=[];
    var bill= JSON.parse(localStorage.getItem("bill"));
    for(var i=0; i<bill.length; i++)
        if((bill[i].orderDate>= from && bill[i].orderDate<=to || from=="" && bill[i].orderDate<=to || to=="" && bill[i].orderDate>=from) && bill[i].status=="Đã giao")
             billtemp1.push(bill[i]);
    console.log(billtemp1);
}