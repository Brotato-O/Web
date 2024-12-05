
  
//BẮT ĐẦU TÌM KIẾM HÓA ĐƠN
//hiển thị bảng tìm kiếm
function create(){
  document.getElementById("mot").style.width="100%";
    document.getElementById("mot").style.margin="0";
    document.getElementById("txtSearch1").style.display = "none";
    document.getElementById("SearchBar2").style.display = "none";
  document.getElementById("title").innerHTML = "<h3>DANH SÁCH ĐƠN HÀNG</h3>"
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
                    <option value="address">Địa điểm</option>
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

                  <div id="addressMethod">
                    <label for="city-select-new">Tỉnh/Thành phố:</label>
                    <select id="city-select-new" onchange="loadDistrictsForNewAddress()" required>
                        <option value="">Chọn tỉnh/thành phố</option>
                    </select>
                    
                    <label for="district-select-new">Quận/Huyện:</label>
                    <select id="district-select-new" onchange="loadWardsForNewAddress()" required>
                        <option value="">Chọn quận/huyện</option>
                    </select>
                    
                    <label for="ward-select-new">Phường/Xã:</label>
                    <select id="ward-select-new" required>
                        <option value="">Chọn phường/xã</option>
                    </select>
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
    fetch('/locationdata.json')
    .then(response => response.json())
    .then(data => {
        locationData = data;
        loadCitiesForNewAddress();
    })
    .catch(error => console.error('Lỗi khi tải dữ liệu:', error));
    document.addEventListener("DOMContentLoaded", () => {
      fetch('/locationdata.json')
          .then(response => response.json())
          .then(data => {
              locationData = data;
              loadCitiesForNewAddress();
          })
          .catch(error => console.error('Lỗi khi tải dữ liệu:', error));
    });
        }
})

function change(){
  lookUpStatus();
  lookUpBill();
}

var billtemp=[];
//lọc trạng thái bill
function lookUpStatus() {
  billtemp=[];
  var obj=document.getElementById("status");
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
}

//hiển thị kế quả tìm kiếm dựa trên kq lọc
  function billDisplay(from, to, n){
    document.getElementById("container").style.display="none";
    var s="";
    console.log((from));
    for(var i=0;i<billtemp.length; i++){
      if((billtemp[i].sdt.includes(from) && n=="phone") || (String(billtemp[i].receiptId).includes(from) && n=="id") 
        || ( ((billtemp[i].totalAmount>=from && billtemp[i].totalAmount<=to) || (billtemp[i].totalAmount>=Number(from) && Number(to)==0) || 
      (Number(from)==0 && billtemp[i].totalAmount<=Number(to))) && n=="price") || (((new Date(from)<= new Date(billtemp[i].orderDate) && new Date(to)>= new Date(billtemp[i].orderDate)) 
      || new Date(from)<= new Date(billtemp[i].orderDate) && to=="" || from=="" && new Date(billtemp[i].orderDate) <= new Date(to)) && n=="date") || billtemp[i].address.includes(from) && n=="address"
      || billtemp[i].username.includes(from) && n=="username"||(n=="all")) {
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
    const billAddress= document.getElementById("addressMethod");
    const method= document.getElementById("method");
    if (method.value== "id" || method.value== "phone" || method.value== "username"){
      billText.style.display="block";
      billDate.style.display="none";
      billPrice.style.display="none";
      billAddress.style.display="none";
    }
    else if (method.value== "date"){
      billText.style.display="none";
      billDate.style.display="flex";
      billAddress.style.display="none";
      billPrice.style.display="none";
    }
    else if (method.value== "all"){
        billText.style.display="none";
        billDate.style.display="none";
        billPrice.style.display="none";
        billAddress.style.display="none";
      }
    else if (method.value== "address"){
        billText.style.display="none";
        billDate.style.display="none";
        billPrice.style.display="none";
        billAddress.style.display="flex";
      }
    else {
      billText.style.display="none";
      billDate.style.display="none";
      billPrice.style.display="flex";
      billAddress.style.display="none";
    }
  }
  
  //xác định phương thức tìm
  function lookUpBill(){
      var billText= document.getElementById("textMethod").value;
      var from = document.getElementById("pricefrom").value;
      var to = document.getElementById("priceto").value;
      var billFrom = document.getElementById("dateFrom").value;
      var billTo = document.getElementById("dateTo").value;
      var city= document.getElementById("city-select-new").value;
      var district= document.getElementById("district-select-new").value;
      var ward= document.getElementById("ward-select-new").value;
      var combine= "Phường: " + ward+ ", Quận: " + district + ", Thành phố: " + city;
      var method= document.getElementById("method");
      if(method.value== "phone") billDisplay(billText, 0, "phone");
      if(method.value== "username") billDisplay(billText, 0, "username");
      if(method.value== "id") billDisplay(billText, 0, "id");
      if(method.value== "price") billDisplay(from, to, "price");
      if(method.value== "date") billDisplay(billFrom, billTo, "date");
      if(method.value== "address") billDisplay(combine, 0, "address");
      if(method.value== "all") billDisplay(0, 0, "all"); 
  }
  //KẾT THÚC TÌM KIẾM HÓA ĐƠN
  function closeDetail(){
    document.getElementById("overlay5").style.display="none";
  }

  //SHOW CHI TIẾT HÓA ĐƠN
  function showDetail(obj){
   var account= JSON.parse(localStorage.getItem("accounts"));
    document.getElementById("overlay5").style.display= "block";
    for(let i=0; i< billtemp.length; i++){
      if(obj.id== billtemp[i].receiptId){
        var name;
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
          if (billtemp[i].status !="Đã hủy"){
            document.getElementById("adminStatus").style.display="flex";
           document.getElementById("adminStatus").innerHTML= `
           <p>Trạng thái</p>
           <div>
            <p id="showStatus">${billtemp[i].status}</p>
            <select id="changeStatus" onchange="changeText(this)">
              <option value="Chờ xác nhận">Chờ xác nhận</option>
              <option value="Đã xác nhận">Đã xác nhận</option>
              <option value="Đang giao">Đang giao</option>
              <option value="Đã giao">Đã giao</option>
            </select>
            </div>
          `;
            document.getElementById("cfB").innerHTML=`
              <button onclick="confirm1('${billtemp[i].receiptId}')">Xác nhận</button>
            `;
            document.getElementById("changeStatus").value=billtemp[i].status;
          }
          else{
            document.getElementById("adminStatus").style.display="none";
            document.getElementById("cfB").innerHTML=`
              <div id="db2">
                <p class="title2" style="font-size: 18px">Lý do hủy: &nbsp;</p>
                <p>${billtemp[i].reason}</p>
              </div>
            `;
          }
        }
      }
    }
  }

  function changeText(obj){
    document.getElementById("showStatus").innerHTML=obj.value;
  }
  function confirm1(id){
    var bill= JSON.parse(localStorage.getItem('bill'));
    for(let i=0; i <bill.length; i++){
      
      if (id== bill[i].receiptId){ 
          bill[id].status=document.getElementById("changeStatus").value;
      }
    }
    localStorage.setItem('bill', JSON.stringify(bill));
    var p= document.getElementById(id);
    toast({ title: 'Thành công', message: 'Đã cập nhật trạng thái đơn!', type: 'success', duration: 3000 });
    change();
    if (p != null) showDetail(id);
  }

  function an(event){
    var obj= event.target;
    if (obj.id== "overlay5"){
      obj.style.display="none";
    }
  }

  function loadCitiesForNewAddress() {
    const citySelectNew = document.getElementById("city-select-new");
    for (const city in locationData) {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        citySelectNew.appendChild(option);
    }
}
function loadDistrictsForNewAddress() {
    const citySelectNew = document.getElementById("city-select-new");
    const districtSelectNew = document.getElementById("district-select-new");

    districtSelectNew.innerHTML = '<option value="">Chọn quận/huyện</option>';
    document.getElementById("ward-select-new").innerHTML = '<option value="">Chọn phường/xã</option>';

    const selectedCity = citySelectNew.value;
    if (selectedCity && locationData[selectedCity]) {
        Object.keys(locationData[selectedCity]).forEach(district => {
            const option = document.createElement("option");
            option.value = district;
            option.textContent = district;
            districtSelectNew.appendChild(option);
        });
    }
}

function loadWardsForNewAddress() {
    const citySelectNew = document.getElementById("city-select-new");
    const districtSelectNew = document.getElementById("district-select-new");
    const wardSelectNew = document.getElementById("ward-select-new");

    wardSelectNew.innerHTML = '<option value="">Chọn phường/xã</option>';

    const selectedCity = citySelectNew.value;
    const selectedDistrict = districtSelectNew.value;

    if (selectedCity && selectedDistrict && locationData[selectedCity][selectedDistrict]) {
        locationData[selectedCity][selectedDistrict].forEach(ward => {
            const option = document.createElement("option");
            option.value = ward;
            option.textContent = ward;
            wardSelectNew.appendChild(option);
        });
    }
}

function checkAddressCompletion() {
    const citySelectNew = document.getElementById("city-select-new").value;
    const districtSelectNew = document.getElementById("district-select-new").value;
    const wardSelectNew = document.getElementById("ward-select-new").value;
    const streetInput = document.getElementById("street");

    if (citySelectNew && districtSelectNew && wardSelectNew) {
        streetInput.style.display = "block"; 
    } else {
        streetInput.style.display = "none"; 
    }
}