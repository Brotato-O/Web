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
    var bill= JSON.parse(localStorage.getItem("bill"));
    var showBill= document.getElementById("showBill");
    var div= document.getElementById("pages");
    div.innerHTML=``;
    var length= bill.length;
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
        if(bill[i].username== id && bill[i].status=="Đã giao"){
            s+=`
                <tr onclick=showDetail1('${bill[i].receiptId}') class="billRow">
                <td>${bill[i].receiptId}</td>
                <td>${bill[i].orderDate}</td>
                <td>${bill[i].totalAmount}</td>
                </tr>
            `
        }
    }
    showBill.innerHTML=`
    <th>Id đơn</th>
    <th>Ngày đặt</th>
    <th>Tổng tiền</th>` + s ;
}
function showDetail1(id){
    var bill= JSON.parse(localStorage.getItem("bill"));
    var account= JSON.parse(localStorage.getItem("accounts"));
     document.getElementById("detail-container").style.display= "block";
     for(let i=0; i< bill.length; i++){
       if(id== bill[i].receiptId){
         var name;
         for(let j=0; j< account.length; j++)
             if (bill[i].username== account[j].username) name= account[j].name;
         document.getElementById("detail-bill").innerHTML=`
           <div>
             <h2 >Thông tin hóa đơn</h2>
             <button id="closeDetail" onclick="closeDetail()">X</button>
           </div>
           <div class="infor-wrap">
             <p>Mã hóa đơn</p>
             <p>${bill[i].receiptId}</p>
           </div>
           <div class="infor-wrap">
             <p>Ngày lập hóa đơn</p>
             <p>${bill[i].orderDate}</p>
           </div>
           
           `;
           var s="";
             for(let j=0; j< bill[i].product.length; j++){
               s+=`<p class="bill-product">${bill[i].product[j].quantity} X Size ${bill[i].product[j].size}: ${bill[i].product[j].title}</p>`;
               
             }
           document.getElementById("detail-bill").innerHTML+= `
             <div class="infor-wrap">
              <p>Sản phẩm</p>
              <div>` + s + `</div>
             </div>
           <div class="infor-wrap">
             <p>Mã khách hàng</p>
             <p>${bill[i].username}</p>
           </div>
           <div class="infor-wrap">
             <p>Tên khách hàng</p>
             <p>${name}</p>
           </div>
           <div class="infor-wrap">
             <p>Địa chỉ giao hàng</p>
             <p>${bill[i].address}</p>
           </div>
           <div class="infor-wrap">
             <p>Số điện thoại</p>
             <p>${bill[i].sdt}</p>
           </div>
           <div class="infor-wrap">
             <p>Trạng thái</p>
             <div id="outsideStatus">
               <p id="innerStatus">${bill[i].status}</p>
             </div>
           </div>`
         }
     }
   }
