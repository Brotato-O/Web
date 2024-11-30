window.addEventListener("load", function () {
    var temp= location.href.split("?");
    if(temp[1]== "count") {
        onCustomer();
        showCount();
    }
  })
  
  //THỐNG KÊ
  function onCustomer(){
    var bill= JSON.parse(localStorage.getItem('bill'));
    var user= JSON.parse(localStorage.getItem('accounts'));
    var count= [];
    for(let i=0; i< user.length; i++){
        count.push({customerId: user[i].username, billId:[], totalAmount: 0});
    }
    for(let i=0; i< count.length; i++){
      for(let j=0; j< bill.length; j++){
        if(bill[j].customer.username== count[i].customerId && bill[j].status== "Đã giao"){
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
    document.getElementById("container").style.display="none";
  var count= JSON.parse(localStorage.getItem("count"));
  var detail= document.getElementById("detail-count");
  var s="";
  for(let i=0; i<5; i++){
    s+= `<tr id="${count[i].customerId}" class="row-count" onclick="detailCount(this)" >
    <td >${count[i].customerId}</td>
      <td>${count[i].totalAmount}</td>
    </div>
      `;
  }
  detail.innerHTML=`<table id="main-count">
    <th>Id khách</th>
    <th>Tổng tiền</th>` + s + `</table>`;
}

function detailCount(obj){
    var bill= JSON.parse(localStorage.getItem("bill"));
    var showBill= document.getElementById("showBill");
    var s="";
    for(let i=0; i<bill.length; i++){
        if(bill[i].customer.username== obj.id){
            s+=`
                <tr>
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
