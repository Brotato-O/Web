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
    for(let i=0; i< count.length; i++)
      for(let j=0; j< bill.length; j++){
        if(bill[j].customer.username== count[i].customerId){
          count[i].billId.push(bill[j].receiptId);
          count[i].totalAmount+= bill[j].totalAmount;
        }
      }
    console.log(count);
    localStorage.setItem('count', JSON.stringify(count));
}

function showCount(){
    
    document.getElementById("container").style.display="none";
    document.getElementById("count-container").style.display="block";
  var count= JSON.parse(localStorage.getItem("count"));
  var detail= document.getElementById("detail-count");
  var s="";
  for(let i=0; i<5; i++){
    s+= `<tr>
    <td id="${count[i].customerId}" class="row-count" onclick="detailCount(this)">${count[i].customerId}</td>
      <td>${count[i].totalAmount}</td>
      <div id="detail-${i}" style="none">
    </div>
      `;
  }
  detail.innerHTML=`<table id="main-count">
    <th>Id khách</th>
    <th>Tổng tiền</th>` + s + `</table>`;
}

function detailCount(obj){
    var count= JSON.parse(localStorage.getItem("count"));
  var detail;
  var s="";
  for(let i=0; i<5; i++){
    if(count[i].customerId==obj.id){
        detail= document.getElementById(`detail-${i}`);
        for(let j=0; j<count[i].billId.length; j++){
        s+= `
                <div class="count-wrap">
                    <div>Mã hóa đơn</div>
                    <div>${count[i].billId[j]}</div>
                </div>
            
            `;
        }
        break;
    }
  }
  detail.innerHTML=s;
}