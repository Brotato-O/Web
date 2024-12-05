window.addEventListener("load", function () {
    var temp= location.href.split("?");
    if(temp[1]== "count") {
        onCustomer();
        showCount();
        SaleProducts();
    }
  })
  
  //THỐNG KÊ
  function onCustomer(){
    document.getElementById("mot").style.width="100%";
    document.getElementById("mot").style.margin="0";
    document.getElementById("txtSearch1").style.display = "none";
    document.getElementById("title").innerHTML = "<h3>Thống kê theo khách</h3>"
    var bill= JSON.parse(localStorage.getItem('bill'));
    var accounts= JSON.parse(localStorage.getItem('accounts'));
    var count= [];
    for(let i=0; i< accounts.length; i++){
            count.push({customerId: accounts[i].username, billId:[], totalAmount: 0});
        
    }
    for(let i=0; i< count.length; i++){
      for(let j=0; j< bill.length; j++){
        if(bill[j].username== count[i].customerId && bill[j].status=="Đã giao"){
          count[i].billId.push(bill[j].receiptId);
          count[i].totalAmount+= bill[j].totalAmount;
        }
      }
    }
    for(let i=0; i< count.length; i++){
        for(let j=0; j < count.length-1;j++)
            if (count[j].totalAmount < count[j+1].totalAmount) {
                var temp = count[j];
                count[j] = count[j+1];
                count[j+1] = temp;
            }
    
    }
    console.log(count);
    localStorage.setItem('count', JSON.stringify(count));
}

function showCount(){
    document.getElementById("count-container").style.display="flex";
    document.getElementById("bill-content").style.display="none";
    document.getElementById("container").style.display="none";
  var count= JSON.parse(localStorage.getItem("count"));
  var detail= document.getElementById("detail-count");
  var s="";
  var length= count.length;
  if (length>5) length=5;
  for(let i=0; i<length; i++){
    s+= `<tr id="${count[i].customerId}" class="row-count" onclick="detailCount('${count[i].customerId}', 1)" >
    <td >${count[i].customerId}</td>
      <td>${count[i].totalAmount}</td>
    </div>
      `;
  }
  detail.innerHTML+=`<table id="main-count">
    <th>Id khách</th>
    <th>Tổng tiền</th>` + s + `</table>`;
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
        if(bill[i].status=="Đã giao" && bill[i].username== username) billtemp.push(bill[i]);
}

function showDetail1(id){
    console.log(id, billtemp);
    var account= JSON.parse(localStorage.getItem("accounts"));
     document.getElementById("overlay5").style.display= "block";
     for(let i=0; i< billtemp.length; i++){
       if(id== billtemp[i].receiptId){
         var name;
         for(let j=0; j< account.length; j++)
             if (billtemp[i].username== account[j].username) name= account[j].name;
           document.getElementById("adminReceipt").innerHTML= billtemp[i].receiptId;
           document.getElementById("adminDate").innerHTML= billtemp[i].orderDate;
           document.getElementById("adminKey").innerHTML= billtemp[i].username;
           document.getElementById("adminName").innerHTML= billtemp[i].name;
           document.getElementById("adminAddress").innerHTML= billtemp[i].address;
           document.getElementById("adminPhone").innerHTML= billtemp[i].sdt;
           document.getElementById("adminTotal").innerHTML= billtemp[i].totalAmount;
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
           document.getElementById("adminTable").innerHTML= `<tr>
             <th>Sản phẩm</th>
             <th>Số lượng</th>
             <th>Size</th>
             <th>Đơn giá</th>
           </tr>`+s;
           if (billtemp[i].status !="Đã hủy"){
            document.getElementById("adminStatus").innerHTML= `
            <p>Trạng thái</p>
            
             <p id="showStatus">${billtemp[i].status}</p>
             
           `;
             
           } 
         }
     }
   }
