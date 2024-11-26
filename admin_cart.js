

function xoabill(){
    localStorage.removeItem("bill");
  }
  
  function thembill(){
    const bills = [
      {
          receiptId: 1,
          customer: { id: 1, username: "user1", password: "password1", sdt: "0123456789" },
          status: "Chờ xác nhận",
          orderDate: "2024-11-16",
          paymentMethod: "Chuyển khoản",
          totalAmount: 2000000,
          products: [
              { quantity: 3, name: "Giày Adidas UltraBoost" },
              { quantity: 1, name: "Giày Nike Air Max" }
          ]
      },
      {
          receiptId: 2,
          customer: {id: 1, username: "user2", password: "password2", sdt: "0987654321" },
          status: "Đã xác nhận",
          orderDate: "2024-11-15",
          paymentMethod: "Tiền mặt",
          totalAmount: 2500000,
          products: [
              { quantity: 1, name: "Giày Converse Chuck Taylor" }
          ]
      },
      {
          receiptId: 3,
          customer: { id: 1, username: "user3", password: "password3", sdt: "0912345678" },
          status: "Đã giao",
          orderDate: "2024-11-14",
          paymentMethod: "Chuyển khoản",
          totalAmount: 1500000,
          products: [
              { quantity: 2, name: "Giày Vans Old Skool" }
          ]
      },
      {
          receiptId: 4,
          customer: {id: 2,  username: "user1", password: "password1", sdt: "0123456789" },
          status: "Đã giao",
          orderDate: "2024-11-13",
          paymentMethod: "Tiền mặt",
          totalAmount: 1200000,
          products: [
              { quantity: 1, name: "Giày Puma Suede Classic" }
          ]
      },
      {
          receiptId: 5,
          customer: {id: 2,  username: "user2", password: "password2", sdt: "0987654321" },
          status: "Chờ xác nhận",
          orderDate: "2024-11-12",
          paymentMethod: "Chuyển khoản",
          totalAmount: 1800000,
          products: [
              { quantity: 4, name: "Giày New Balance 574" }
          ]
      },
      {
          receiptId: 6,
          customer: {id: 3, username: "user3", password: "password3", sdt: "0912345678" },
          status: "Đã xác nhận",
          orderDate: "2024-11-11",
          paymentMethod: "Tiền mặt",
          totalAmount: 2100000,
          products: [
              { quantity: 1, name: "Giày Reebok Club C" }
          ]
      },
      {
          receiptId: 7,
          customer: {id: 2, username: "user1", password: "password1", sdt: "0123456789" },
          status: "Đã giao",
          orderDate: "2024-11-10",
          paymentMethod: "Chuyển khoản",
          totalAmount: 1700000,
          products: [
              { quantity: 2, name: "Giày Asics Gel-Lyte III" }
          ]
      },
      {
          receiptId: 8,
          customer: {id: 4,  username: "user2", password: "password2", sdt: "0987654321" },
          status: "Đã giao",
          orderDate: "2024-11-09",
          paymentMethod: "Tiền mặt",
          totalAmount: 2200000,
          products: [
              { quantity: 1, name: "Giày Jordan 1" }
          ]
      },
      {
          receiptId: 9,
          customer: {id: 1, username: "user3", password: "password3", sdt: "0912345678" },
          status: "Chờ xác nhận",
          orderDate: "2024-11-08",
          paymentMethod: "Chuyển khoản",
          totalAmount: 3000000,
          products: [
              { quantity: 2, name: "Giày Balenciaga Triple S" }
          ]
      },
      {
          receiptId: 10,
          customer: {id:1, username: "user1", password: "password1", sdt:"0123456789" },
          status: "Đã xác nhận",
          orderDate: "2024-11-07",
          paymentMethod: "Tiền mặt",
          totalAmount: 8000000,
          products: [
              { quantity: 1, name: "Giày Yeezy Boost 350" }
          ]
      }
      ]
  
    localStorage.setItem("bill", JSON.stringify(bills));
  }
const temp= document.getElementById("maintable");
const temp2= document.getElementById("themsp");
 
//BẮT ĐẦU TÌM KIẾM HÓA ĐƠN
//hiển thị bảng tìm kiếm
function create(){
    var temp= document.createElement("div");
      temp.setAttribute("id", "select-bill");
      temp.innerHTML= `
            <div><h3>Tìm kiếm hóa đơn</h3></div>

            <div>
              <form oninput=change() onchange=change()>
                <input type="search" id="textMethod">
                <div>
                  <span>Tìm kiếm theo</span>

                  <select id="method" onchange="lookUpBillDisplay()">
                    <option value="all" selected>Tất cả</option>
                    <option value="id">Mã đơn hàng</option>
                    <option value="phone">Sdt</option>
                    <option value="price">Khoảng giá</option>
                    <option value="date">Ngày đặt</option>
                  </select>

                  <div id="dateMethod">
                    <div>
                      <span>Từ ngày</span>
                      <input type="date" id="dateFrom" />
                    </div>
                    <div>
                      <span>Đến ngày</span>
                      <input type="date" id="dateTo" />
                    </div>
                  </div>

                  <div id="priceMethod">
                    <div>
                      <span>Từ</span>
                      <input type="number" id="pricefrom"/>
                    </div>
                    <div>
                      <span>Đến</span>
                      <input type="number" id="priceto"/>
                    </div>
                  </div>
                </div>
                <div> 
                  <h2>Tình trạng hóa đơn</h2>
                  <select id="status">
                      <option value="Chờ xác nhận">Chờ xác nhận</option>
                      <option value="Đã xác nhận">Đã xác nhận</option>
                      <option value="Đã giao">Đã giao</option>
                      <option value="all" selected>Tất cả</option>
                  </select>
                </div>
              </form>
            </div>
`;
    document.getElementById('themsp').innerHTML ="";
    document.getElementById("themsp").appendChild(temp);
}

window.addEventListener("load", function () {
  var temp= location.href.split("?");
  if(temp[1]== "bill") {
    create();
    lookUpBillDisplay();
    lookUpStatus();
    lookUpBill();
    onCustomer();
    }
})

function change(){
  lookUpStatus();
  lookUpBill();
}

//lọc trạng thái bill
function lookUpStatus() {
  var obj=document.getElementById("status");
  var billtemp=[];
  console.log(obj.value);
    var bill= JSON.parse(localStorage.getItem("bill"));
    if(obj.value !="all")
    for (var i = 0; i < bill.length; i++) {
      if (bill[i].status === obj.value) {
        billtemp.push(bill[i]);
      }
    }
    else{
      for (var i = 0; i < bill.length; i++) {
        billtemp.push(bill[i]);
      }
    }
    localStorage.setItem("billtemp",JSON.stringify(billtemp));
}

//hiển thị kế quả tìm kiếm dựa trên kq lọc
  function billDisplay(from, to, n){
    var billtemp= JSON.parse(localStorage.getItem('billtemp'));
    var temp= [];
    var s="";
    for(var i=0;i<billtemp.length; i++){
      if((billtemp[i].customer.sdt.includes(from) && n=="phone") || (String(billtemp[i].receiptId).includes(from) && n=="id") 
        || ((billtemp[i].totalAmount>=from && billtemp[i].totalAmount<=to) && n=="price") || (from<= new Date(billtemp[i].orderDate) && to>= new Date(billtemp[i].orderDate) ) || (n=="all")) {
          temp.push(billtemp[i]);
          s+=`<tr id="${billtemp[i].receiptId}" onclick="showDetail(this)" class="billRow">
            <td>${billtemp[i].orderDate}</td>
            <td>${billtemp[i].receiptId}</td>
            <td>${billtemp[i].customer.sdt}</td>
            <td>${billtemp[i].totalAmount}</td>
            <td>${billtemp[i].status}</td>
        </tr>
        `;
      }
    }
    billtemp= temp;
    localStorage.setItem("billtemp",JSON.stringify(billtemp));
    document.getElementById("maintable").innerHTML=`<table id="billTable"><tr>
            <th>Ngày đặt</th>
            <th>Mã hóa đơn</th>
            <th>Sdt</th>
            <th>Giá tiền</th>
            <th>Trạng thái</th>
            </tr>` + s + `</table>`;
  }

  //hiển thị ô nhập liệu tìm kiếm
  function lookUpBillDisplay(){
    const billText= document.getElementById("textMethod");
    const billDate= document.getElementById("dateMethod");
    const billPrice= document.getElementById("priceMethod");
    const method= document.getElementById("method");
    if (method.value== "id" || method.value== "phone"){
      billText.style.display="block";
      billDate.style.display="none";
      billPrice.style.display="none";
    }
    else if (method.value== "date"){
      billText.style.display="none";
      billDate.style.display="flex";
      billPrice.style.display="none";
    }
    else if (method.value== "all"){
        billText.style.display="none";
        billDate.style.display="none";
        billPrice.style.display="none";
      }
    else {
      billText.style.display="none";
      billDate.style.display="none";
      billPrice.style.display="flex";
    }
  }
  
  //xác định phương thức tìm
  function lookUpBill(){
      var billText= document.getElementById("textMethod").value;
      var from = document.getElementById("pricefrom").value;
      var to = document.getElementById("priceto").value;
      var dateFrom = document.getElementById("dateFrom").value;
      var dateTo = document.getElementById("dateTo").value;
      var billFrom= new Date(dateFrom);
      var billTo= new Date(dateTo);
      var method= document.getElementById("method");
      if(method.value== "phone") billDisplay(billText, 0, "phone");
      if(method.value== "id") billDisplay(billText, 0, "id");
      if(method.value== "price") billDisplay(from, to, "price");
      if(method.value== "date") billDisplay(billFrom, billTo, "date");
      if(method.value== "all") billDisplay(0, 0, "all"); 
  }
  //KẾT THÚC TÌM KIẾM HÓA ĐƠN


  //SHOW CHI TIẾT HÓA ĐƠN
  function showDetail(obj){
   console.log(obj);
   var billtemp= JSON.parse(localStorage.getItem("billtemp"));
    document.getElementById("detail-container").style.display= "block";
    for(let i=0; i< billtemp.length; i++){
      if(obj.id== billtemp[i].receiptId){
        document.getElementById("detail-bill").innerHTML=`
          <div>
            <h2 >Thông tin hóa đơn</h2>
            <button id="closeDetail" onclick="closeDetail()">X</button>
          </div>
          <div class="infor-wrap">
            <p>Mã hóa đơn</p>
            <p>${obj.id}</p>
          </div>
          <div class="infor-wrap">
            <p>Ngày lập hóa đơn</p>
            <p>${billtemp[i].orderDate}</p>
          </div>
          
          `;
            for(let j=0; j< billtemp[i].products.length; j++){
              var s=`<p>${billtemp[i].products[j].name}</p>`;
              
            }
          document.getElementById("detail-bill").innerHTML+= `
            <div class="infor-wrap">
             <p>Sản phẩm</p>
             <div>` + s + `</div>
            </div>
          <div class="infor-wrap">
            <p>Mã khách hàng</p>
            <p>${billtemp[i].customer.id}</p>
          </div>
          <div class="infor-wrap">
            <p>Tên khách hàng</p>
            <p>${billtemp[i].customer.username}</p>
          </div>
          <div class="infor-wrap">
            <p>Số điện thoại</p>
            <p>${billtemp[i].customer.sdt}</p>
          </div>
          <div class="infor-wrap">
            <p>Trạng thái</p>
            <p>${billtemp[i].status}</p>
          </div>`
          if (billtemp[i].status =="Đã xác nhận" || billtemp[i].status=="Chờ xác nhận")
           document.getElementById("detail-bill").innerHTML+= `<button value="${obj.id}" onclick="changeStatus(this)">AAAAAAAAAA</button>`;
        }
    }
  }

  function changeStatus(obj){
    var bill= JSON.parse(localStorage.getItem('bill'));
    for(let i=0; i <bill.length; i++){
      if (obj.value== bill[i].receiptId){
        if(bill[i].status=="Chờ xác nhận") bill[i].status="Đã xác nhận";
        else if(bill[i].status=="Đã xác nhận") bill[i].status="Chờ xác nhận";
      }
    }
    localStorage.setItem('bill', JSON.stringify(bill));
    var p= document.getElementById(obj.value);
    console.log(p);
    change();
    showDetail(p);
  }

  function an(event){
    var obj= event.target;
    if (obj.id== "detail-container")
      obj.style.display="none";
  }

  function closeDetail(){
    document.getElementById("detail-container").style.display= "none";
  }
