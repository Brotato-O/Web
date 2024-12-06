window.addEventListener("load", function(){
    if (window.location.href.split("?")[1]=="countP"){
      document.getElementById("countP-container").style.display="flex";
        SaleProducts();
    }
})

function SaleProducts(){
    var countP= [];
    var from= document.getElementById("countPFrom").value;
    var to= document.getElementById("countPTo").value;
    var products= JSON.parse(localStorage.getItem("products"));
    checkBill1(from,to);
    console.log(billtemp1.length);
    if (billtemp1.length== 0) {
        countP=[];
        localStorage.setItem("countP", JSON.stringify(countP));
        showSaleProducts(1);
        document.getElementById("showBill2").innerHTML=``;
        return;
    }
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
    showSaleProducts(1);
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
    showSaleProducts(1);
}
function onQuantity1(){
  var countP= JSON.parse(localStorage.getItem("countP"));
  for(var i=0; i< countP.length; i++){
      for(var j=0; j<countP.length-1; j++){
          if(Number(countP[j].quantity) > Number(countP[j+1].quantity)){
              var temp = countP[j];
              countP[j] = countP[j + 1];
              countP[j + 1] = temp;
          }
      }
  }
  localStorage.setItem("countP", JSON.stringify(countP));
  showSaleProducts(1);
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
    showSaleProducts(1);
}
function onMoney1(){
  var countP= JSON.parse(localStorage.getItem("countP"));
  for(var i=0; i< countP.length; i++){
      for(var j=0; j<countP.length-1; j++){
          if(Number(countP[j].totalAmount) > Number(countP[j+1].totalAmount)){
              var temp = countP[j];
              countP[j] = countP[j + 1];
              countP[j + 1] = temp;
          }
      }
  }
  localStorage.setItem("countP", JSON.stringify(countP));
  showSaleProducts(1);
}

function showSaleProducts(index){
    var countP= JSON.parse(localStorage.getItem("countP"));
    var div1= document.getElementById("pages");
    div1.parentElement.style.display="flex";
    document.getElementById("count-container").style.display="none";
    document.getElementById("SearchTDN").style.display="none";
    document.getElementById("SearchBar2").style.display="none";
    document.getElementById("bill-content").style.display="none";
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
    for(var i=startIndex; i< endIndex; i++){
        s+= `
            <tr onclick=showBill2(${i})>
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

function showBill2(id){
    var countP= JSON.parse(localStorage.getItem("countP"));
    var s="";
    for(var i=0; i< countP[id].bill.length; i++){
        s+= `
            <tr onclick="showDetail2(${countP[id].bill[i].receiptId})">
                <td>${countP[id].bill[i].receiptId}</td>
                <td>${countP[id].bill[i].totalAmount}</td>
                <td>${countP[id].bill[i].orderDate}</td>
        `;
    }
    
    document.getElementById("showBill2").innerHTML=`
        <tr>
          <th>Id đơn</th>
          <th>Tổng tiền</th>
          <th>Ngày đặt</th>` + s;
}

function showDetail2(id){
    var account= JSON.parse(localStorage.getItem("accounts"));
   var profile= JSON.parse(localStorage.getItem("userProfile"));
    document.getElementById("overlay5").style.display= "block";
    var bill= JSON.parse(localStorage.getItem("bill"));
    console.log(bill);
    for(let i=0; i< bill.length; i++){
      if(id== bill[i].receiptId){
        var name;
        if (profile== undefined || profile[bill[i].username]== undefined)
          for(let j=0; j< account.length; j++){
            if (bill[i].username== account[j].username) name= account[j].name;
          }
        else name= profile[bill[i].username].name;
        for(let j=0; j< account.length; j++){
            if (bill[i].username== account[j].username) name= account[j].name;
          document.getElementById("adminReceipt").innerHTML= bill[i].receiptId;
          document.getElementById("adminDate").innerHTML= bill[i].orderDate;
          document.getElementById("adminKey").innerHTML= bill[i].username;
          document.getElementById("adminName").innerHTML= name;
          document.getElementById("adminAddress").innerHTML= bill[i].address;
          document.getElementById("adminPhone").innerHTML= bill[i].sdt;
          document.getElementById("adminMethod").innerHTML= bill[i].paymentMethod;
        
          var s="";
            for(let j=0; j< bill[i].product.length; j++){
              s+=`
                <tr>
                  <td>${bill[i].product[j].title}</td>
                  <td>${bill[i].product[j].quantity}</td>
                  <td>${bill[i].product[j].size}</td>
                  <td>${bill[i].product[j].price}</td>
                </tr>
              `;
            }
          document.getElementById("adminTable").innerHTML= `<tr class="hehe">
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Size</th>
            <th>Đơn giá</th>
          </tr>`+s +  `<tr>
            <td colspan="3" class="title2" style="font-size: 18px">Tổng tiền</td>
            <td>${bill[i].totalAmount}<t/d>
          </tr>`;
          if (bill[i].status !="Đã hủy"){
            document.getElementById("adminStatus").style.display="flex";
           document.getElementById("adminStatus").innerHTML= `
           <p>Trạng thái</p>
           <div>
            <p id="showStatus">${bill[i].status}</p>
            
            </div>
          `;
           
            
          }
        }
      }
    }
}

var billtemp1=[];
function checkBill1(from, to){
    billtemp1=[];
    var bill= JSON.parse(localStorage.getItem("bill"));
    if(from=="" && to==""){
      for(var i=0; i<bill.length; i++)
        if(bill[i].status=="Đã giao")
             {billtemp1.push(bill[i])};
      return;
    }
    else {
      for(var i=0; i<bill.length; i++)
        if((bill[i].orderDate>= from && bill[i].orderDate<=to || from=="" && bill[i].orderDate<=to || to=="" && bill[i].orderDate>=from) && bill[i].status=="Đã giao")
             {billtemp1.push(bill[i])};
    }
    
    console.log(billtemp1);
}