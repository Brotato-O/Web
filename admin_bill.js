

function xoabill(){
    localStorage.removeItem("bill");
  }
  
  
//BẮT ĐẦU TÌM KIẾM HÓA ĐƠN
//hiển thị bảng tìm kiếm
function create(){
  document.getElementById("mot").style.width="100%";
    document.getElementById("mot").style.margin="0";
    document.getElementById("txtSearch1").style.display = "none";
  document.getElementById("title").innerHTML = "<h3>Danh sách đơn hàng</h3>"
    var temp= document.createElement("div");
      temp.setAttribute("id", "select-bill");
      temp.innerHTML= `
            <div><h3>TÌM KIẾM HÓA ĐƠN</h3></div>

            <div>
              <form oninput=change() onchange=change()>
                
                <div>
                  <div style="display: flex; margin: 20px 0px;">
                    <div style="margin-right: 100px">Tìm kiếm theo</div>

                  <select style="width:50%" id="method" onchange="lookUpBillDisplay()">
                    <option value="all" selected>Tất cả</option>
                    <option value="id">Mã đơn hàng</option>
                    <option value="username">Tên đăng nhập</option>
                    <option value="phone">Số điện thoại</option>
                    <option value="price">Khoảng giá</option>
                    <option value="date">Ngày đặt</option>
                  </select>
                  </div>
                  <input type="search" class="detailMethod" id="textMethod" placeholder="Nhập giá trị cần tìm">

                  <div id="dateMethod" class="detailMethod">
                    <div>
                      <span>Từ ngày</span>
                      <input type="date" id="dateFrom" />
                    </div>
                    <div>
                      <span>Đến ngày</span>
                      <input type="date" id="dateTo" />
                    </div>
                  </div>

                  <div id="priceMethod" class="detailMethod">
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
                <div class="detailMethod" style="display:flex"> 
                  <div style="margin-right:20px">Tình trạng hóa đơn</div>
                  <select id="status">
                      <option value="Chờ xác nhận">Chờ xác nhận</option>
                      <option value="Đã xác nhận">Đã xác nhận</option>
                      <option value="Đang giao">Đang giao</option>
                      <option value="Đã giao">Đã giao</option>
                      <option value="Đã hủy">Đã hủy</option>
                      <option value="all" selected>Tất cả</option>
                  </select>
                </div>
              </form>
            </div>
`;
    document.getElementById('themsp').innerHTML ="";
    document.getElementById("searchBill").appendChild(temp);
}

window.addEventListener("load", function () {
  var temp= location.href.split("?");
  if(temp[1]== "bill") {
    create();
    lookUpBillDisplay();
    lookUpStatus();
    lookUpBill();
    
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
    console.log("AA");
}

//hiển thị kế quả tìm kiếm dựa trên kq lọc
  function billDisplay(from, to, n){
    document.getElementById("container").style.display="none";
    var billtemp= JSON.parse(localStorage.getItem('billtemp'));
    var temp= [];
    var s="";
    for(var i=0;i<billtemp.length; i++){
      if((billtemp[i].sdt.includes(from) && n=="phone") || (String(billtemp[i].receiptId).includes(from) && n=="id") 
        || ((billtemp[i].totalAmount>=from && billtemp[i].totalAmount<=to) && n=="price") || 
      (from<= new Date(billtemp[i].orderDate) && to>= new Date(billtemp[i].orderDate) ) || billtemp[i].username.includes(from) && n=="username"||(n=="all")) {
          temp.push(billtemp[i]);
          s+=`<tr id="${billtemp[i].receiptId}" onclick="showDetail(this)" class="billRow">
            <td>${billtemp[i].orderDate}</td>
            <td>${billtemp[i].receiptId}</td>
            <td>${billtemp[i].username}</td>
            <td>${billtemp[i].totalAmount.toLocaleString()}</td>
            <td>${billtemp[i].status}</td>
        </tr>
        `;
      }
    }
    billtemp= temp;
    localStorage.setItem("billtemp",JSON.stringify(billtemp));
    document.getElementById("billTable").innerHTML=`<tr>
            <th>Ngày đặt</th>
            <th>Mã hóa đơn</th>
            <th>Mã khách</th>
            <th>Giá tiền</th>
            <th>Trạng thái</th>
            </tr>` + s ;
  }

  //hiển thị ô nhập liệu tìm kiếm
  function lookUpBillDisplay(){
    const billText= document.getElementById("textMethod");
    const billDate= document.getElementById("dateMethod");
    const billPrice= document.getElementById("priceMethod");
    const method= document.getElementById("method");
    if (method.value== "id" || method.value== "phone" || method.value== "username"){
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
      if(method.value== "username") billDisplay(billText, 0, "username");
      if(method.value== "id") billDisplay(billText, 0, "id");
      if(method.value== "price") billDisplay(from, to, "price");
      if(method.value== "date") billDisplay(billFrom, billTo, "date");
      if(method.value== "all") billDisplay(0, 0, "all"); 
  }
  //KẾT THÚC TÌM KIẾM HÓA ĐƠN


  //SHOW CHI TIẾT HÓA ĐƠN
  function showDetail(obj){
   var billtemp= JSON.parse(localStorage.getItem("billtemp"));
   var account= JSON.parse(localStorage.getItem("accounts"));
    document.getElementById("detail-container").style.display= "block";
    for(let i=0; i< billtemp.length; i++){
      if(obj.id== billtemp[i].receiptId){
        var name;
        for(let j=0; j< account.length; j++)
            if (billtemp[i].username== account[j].username) name= account[j].name;
        console.log(name);
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
          var s="";
            for(let j=0; j< billtemp[i].product.length; j++){
              s+=`<p class="bill-product">${billtemp[i].product[j].quantity} X Size ${billtemp[i].product[j].size}: ${billtemp[i].product[j].title}</p>`;
              
            }
          document.getElementById("detail-bill").innerHTML+= `
            <div class="infor-wrap">
             <p>Sản phẩm</p>
             <div>` + s + `</div>
            </div>
          <div class="infor-wrap">
            <p>Mã khách hàng</p>
            <p>${billtemp[i].username}</p>
          </div>
          <div class="infor-wrap">
            <p>Tên khách hàng</p>
            <p>${name}</p>
          </div>
          <div class="infor-wrap">
            <p>Địa chỉ giao hàng</p>
            <p>${billtemp[i].address}</p>
          </div>
          <div class="infor-wrap">
            <p>Số điện thoại</p>
            <p>${billtemp[i].sdt}</p>
          </div>
          <div class="infor-wrap">
            <p>Trạng thái</p>
            <div id="outsideStatus">
              <p id="innerStatus">${billtemp[i].status}</p>
            </div>
          </div>`
          if (billtemp[i].status !="Đã hủy"){
           document.getElementById("outsideStatus").innerHTML+= `
            <select id="changeStatus" onchange="changeStatus(${billtemp[i].receiptId}, this)">
              <option value="Chờ xác nhận">Chờ xác nhận</option>
              <option value="Đã xác nhận">Đã xác nhận</option>
              <option value="Đang giao">Đang giao</option>
              <option value="Đã giao">Đã giao</option>
            </select>
          `;
            document.getElementById("changeStatus").value=billtemp[i].status;
          }
          else{
            document.getElementById("detail-bill").innerHTML+=`
              <div class="infor-wrap">
                <p>Lý do hủy</p>
                <p>${billtemp[i].reason}</p>
              </div>
            `;
          }
        }
    }
  }

  function changeStatus(id, obj){
    var bill= JSON.parse(localStorage.getItem('bill'));
    for(let i=0; i <bill.length; i++){
      if (id== bill[i].receiptId){
        
          document.getElementById("innerStatus").innerHTML=obj.value;
          bill[id].status=obj.value;
      }
    }
    localStorage.setItem('bill', JSON.stringify(bill));
    var p= document.getElementById(id);
    change();
    if (p != null) showDetail(id);
  }

  function an(event){
    var obj= event.target;
    if (obj.id== "detail-container")
      obj.style.display="none";
  }

  function closeDetail(){
    document.getElementById("detail-container").style.display= "none";
  }
