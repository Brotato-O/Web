
  
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
fetch('/locationdata.json')
    .then(response => response.json())
    .then(data => {
        locationData = data;
        loadCitiesForNewAddress();
    })
    .catch(error => console.error('Lỗi khi tải dữ liệu:', error));
window.addEventListener("load", function () {
  var temp= location.href.split("?");
  if(temp[1]== "bill") {
    create();
    lookUpBillDisplay();
    lookUpStatus();
    lookUpBill();
    }
})
document.addEventListener("DOMContentLoaded", () => {
  fetch('/locationdata.json')
      .then(response => response.json())
      .then(data => {
          locationData = data;
          loadCitiesForNewAddress();
      })
      .catch(error => console.error('Lỗi khi tải dữ liệu:', error));
});
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
}

//hiển thị kế quả tìm kiếm dựa trên kq lọc
  function billDisplay(from, to, n){
    document.getElementById("container").style.display="none";
    var billtemp= JSON.parse(localStorage.getItem('billtemp'));
    // var div= document.getElementById("pages");
    // div.innerHTML=``;
    // var length= billtemp.length;
    // const BPP=5;
    // var pages= length/BPP;
    // for(let i=0; i<pages; i++){
    //     div.innerHTML +=`
    //      <button class="page" onclick="billDisplay('${from}','${to}','${n}', ${i+1})">${i+1}</button>
    //     `;
    // }
    // var startIndex= (index-1)*BPP;
    // var endIndex= startIndex+BPP;
    // if(endIndex> length) endIndex= length;
    var s="";
    for(var i=0;i<billtemp.length; i++){
      if((billtemp[i].sdt.includes(from) && n=="phone") || (String(billtemp[i].receiptId).includes(from) && n=="id") 
        || ((billtemp[i].totalAmount>=from && billtemp[i].totalAmount<=to) && n=="price") || 
      (from<= new Date(billtemp[i].orderDate) && to>= new Date(billtemp[i].orderDate) ) || billtemp[i].username.includes(from) && n=="username"||(n=="all")) {
          // temp.push(billtemp[i]);
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
    // billtemp= temp;
    // localStorage.setItem("billtemp",JSON.stringify(billtemp));
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
      var dateFrom = document.getElementById("dateFrom").value;
      var dateTo = document.getElementById("dateTo").value;
      var billFrom= new Date(dateFrom);
      var billTo= new Date(dateTo);
      var method= document.getElementById("method");
      if(method.value== "phone") billDisplay(billText, 0, "phone", 1);
      if(method.value== "username") billDisplay(billText, 0, "username", 1);
      if(method.value== "id") billDisplay(billText, 0, "id", 1);
      if(method.value== "price") billDisplay(from, to, "price", 1);
      if(method.value== "date") billDisplay(billFrom, billTo, "date", 1);
      if(method.value== "all") billDisplay(0, 0, "all", 1); 
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
            <select id="changeStatus" onchange="changeText(this)">
              <option value="Chờ xác nhận">Chờ xác nhận</option>
              <option value="Đã xác nhận">Đã xác nhận</option>
              <option value="Đang giao">Đang giao</option>
              <option value="Đã giao">Đã giao</option>
            </select>
          `;
            console.log(document.getElementById("changeStatus").value);
            document.getElementById("detail-bill").innerHTML+=`
              <button onclick="confirm('${billtemp[i].receiptId}')">Xác nhận</button>
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

  function changeText(obj){
    document.getElementById("innerStatus").innerHTML=obj.value;
  }
  function confirm(id){
    var billtemp= JSON.parse(localStorage.getItem("billtemp"));
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
    if (obj.id== "detail-container")
      obj.style.display="none";
  }

  function closeDetail(){
    document.getElementById("detail-container").style.display= "none";
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