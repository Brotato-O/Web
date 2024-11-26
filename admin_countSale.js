window.addEventListener("load", function () {
    var temp= location.href.split("?");
    if(temp[1]== "count") {
        showCount();
    }
  })
  
  //THỐNG KÊ
  function onCustomer(){
    var bill= JSON.parse(localStorage.getItem('bill'));
    var user= JSON.parse(localStorage.getItem('user'));
    var count= [];
    for(let i=0; i< user.length; i++){
        count.push({customerId: user[i].id, billId:[], totalAmount: 0});
    }
    for(let i=0; i< count.length; i++)
      for(let j=0; j< bill.length; j++){
        if(bill[j].customer.id== count[i].customerId){
          count[i].billId.push(bill[j].receiptId);
          count[i].totalAmount+= bill[j].totalAmount;
        }
      }
    console.log(count);
    localStorage.setItem('count', JSON.stringify(count));
}

function showCount(){
    
    document.getElementById("admin").style.display="none";
    document.getElementById("count-container").style.display="block";
  var count= JSON.parse(localStorage.getItem("count"));
  var detail= document.getElementById("detail-count");
  var s="";
  for(let i=0; i<5; i++){
    s+= `<div id="${count[i].customerId}" class="row-count" onclick="detailCount(this)">
      <div>${count[i].customerId}</div>
      <div>${count[i].totalAmount}</div>
      </div>
      <div id="detail-${i}" style="none">
    </div>
      `;
  }
  s= `<div id="main-count">`+ s+ `</div>`;
  detail.innerHTML=`
    <div id="head-count">
      <div>Id khách</div>
      <div>Tổng tiền</div>
    </div> ` + s;
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