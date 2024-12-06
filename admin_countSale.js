window.addEventListener("load", function () {
    var temp= location.href.split("?");
    if(temp[1]== "count") {
        document.getElementById("countContainer").style.display="flex";
        document.getElementById("bill-content").style.display="none";
        document.getElementById("SearchTDN").style.display="none";
        onCustomer();
        showCount();
        SaleProducts();
    }
  })
  
  var counttemp=[];
function onTime(from, to){
    counttemp=[];
    var count= JSON.parse(localStorage.getItem("count"));
    if(from=="" && to==""){
        for(var i=0; i<count.length; i++){
                counttemp.push(count[i]);
        }
    }
    else for(var i=0; i<count.length; i++){
        if ((count[i].orderDate>= from && count[i].orderDate<= to) || (from=="" && count[i].orderDate<=to) || (to=="" && count[i].orderDate>=from)){
            counttemp.push(count[i]);
        }
    }
    for(let i=0; i< counttemp.length; i++){
        for(let j=0; j < counttemp.length-1;j++)
            if (counttemp[j].totalAmount < counttemp[j+1].totalAmount) {
                var temp = count[j];
                counttemp[j] = counttemp[j+1];
                counttemp[j+1] = temp;
            }
    }
    detailCount(-1, 1);
 }
  //THỐNG KÊ
  function onCustomer(){
    document.getElementById("mot").style.width="100%";
    document.getElementById("mot").style.margin="0";
    document.getElementById("txtSearch1").style.display = "none";
    document.getElementById("SearchBar2").style.display = "none";
    document.getElementById("countP-container").style.display = "none";
    document.getElementById("title").innerHTML = "<h3>Thống kê theo khách</h3>"
    var bill= JSON.parse(localStorage.getItem('bill'));
    var accounts= JSON.parse(localStorage.getItem('accounts'));
    var count= [];
    for(let i=0; i< accounts.length; i++){
            count.push({customerId: accounts[i].username, orderDate:"", billId:[], totalAmount: 0});
        
    }
    for(let i=0; i< count.length; i++){
      for(let j=0; j< bill.length; j++){
        if(bill[j].username== count[i].customerId && bill[j].status=="Đã giao"){
          count[i].billId.push(bill[j].receiptId);
          count[i].totalAmount+= bill[j].totalAmount;
          count[i].orderDate= bill[j].orderDate;
        }
      }
    }
    localStorage.setItem('count', JSON.stringify(count));
}

function showCount(){
    var from = document.getElementById("countFrom").value;
    var to = document.getElementById("countTo").value;
    onTime(from, to);
    document.getElementById("countContainer").style.display="flex";
    document.getElementById("bill-content").style.display="none";
    document.getElementById("showpage").style.display="none";
    document.getElementById("container").style.display="none";
  var detail= document.getElementById("main-count");
  var s="";
  var length= counttemp.length;
  if (length>5) length=5;
  for(let i=0; i<length; i++){
    if (counttemp[i].totalAmount==0) break;
    s+= `<tr id="${counttemp[i].customerId}" class="row-count" onclick="detailCount('${counttemp[i].customerId}', 1)" >
    <td >${counttemp[i].customerId}</td>
      <td>${counttemp[i].totalAmount}</td>
    </div>
      `;
  }
  detail.innerHTML=`<tr>
                <th>Id khách</th>
                <th>Tổng tiền</th>
              </tr>` + s ;
}

function detailCount(id, index){
    checkBill(id);
    var showBill= document.getElementById("showBill");
    var div= document.getElementById("pages");
    div.innerHTML=``;
    var length= billtemp.length;
    const BPP=5;
    var pages= Math.ceil(length/BPP);
    var startIndex= (index-1)*BPP;
    var endIndex= startIndex+BPP;
    if(endIndex> length) endIndex= length;
    for(let i=0; i<pages; i++){
      div.innerHTML +=`
       <button class="page" onclick="detailCount('${id}', ${i+1})">${i+1}</button>
      `;
  }
    var s="";
    for(let i=startIndex; i<endIndex; i++){
        if(billtemp[i].username== id){
            s+=`
                <tr onclick=showDetail1('${billtemp[i].receiptId}') class="billRow">
                <td>${billtemp[i].receiptId}</td>
                <td>${billtemp[i].orderDate}</td>
                <td>${billtemp[i].totalAmount}</td>
                </tr>
            `
        }
    }
    showBill.innerHTML=`
    <th>Id đơn</th>
    <th>Ngày đặt</th>
    <th>Tổng tiền</th>` + s ;
}
var billtemp=[];
function checkBill(username){
    billtemp=[];
    var bill= JSON.parse(localStorage.getItem("bill"));
    for(var i=0; i<bill.length; i++)
        if(bill[i].username== username && bill[i].status=="Đã giao") billtemp.push(bill[i]);
}

function showDetail1(id){
    var account= JSON.parse(localStorage.getItem("accounts"));
   var profile= JSON.parse(localStorage.getItem("userProfile"));
    document.getElementById("overlay5").style.display= "block";
    for(let i=0; i< billtemp.length; i++){
      if(id== billtemp[i].receiptId){
        var name;
        if (profile== undefined || profile[billtemp[i].username]== undefined)
          for(let j=0; j< account.length; j++){
            if (billtemp[i].username== account[j].username) name= account[j].name;
          }
        else name= profile[billtemp[i].username].name;
        for(let j=0; j< account.length; j++){
            if (billtemp[i].username== account[j].username) name= account[j].name;
           document.getElementById("adminReceipt").innerHTML= billtemp[i].receiptId;
           document.getElementById("adminDate").innerHTML= billtemp[i].orderDate;
           document.getElementById("adminKey").innerHTML= billtemp[i].username;
           document.getElementById("adminName").innerHTML= billtemp[i].name;
           document.getElementById("adminAddress").innerHTML= billtemp[i].address;
           document.getElementById("adminPhone").innerHTML= billtemp[i].sdt;
           document.getElementById("adminMethod").innerHTML= billtemp[i].paymentMethod;
         
           var s="";
             for(let j=0; j< billtemp[i].product.length; j++){
               s+=`
                 <tr>
                   <td>${billtemp[i].product[j].title}</td>
                   <td>${billtemp[i].product[j].quantity}</td>
                   <td>${billtemp[i].product[j].size}</td>
                   <td>${billtemp[i].product[j].price}</td>
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
             <td>${billtemp[i].totalAmount}<t/d>
           </tr>`;
             document.getElementById("adminStatus").style.display="flex";
            document.getElementById("adminStatus").innerHTML= `
            <p>Trạng thái</p>
            <div>
             <p id="showStatus">${billtemp[i].status}</p>
             
             </div>
           `
         }
       }
     }
   }
