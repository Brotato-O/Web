
var currentPage = 1;
const productsPerPage = 12;
function currency(value) {
  return value.toLocaleString("vi-VN");
}

var currentPage = 1;

function hienthitatcasp1() {
  document.getElementById('SearchBar').style.display="block";
  const productsPerPage = 12;
  var productArrays = JSON.parse(localStorage.getItem("all"));
  var startIndex = (currentPage - 1) * productsPerPage;
  var endIndex = startIndex + productsPerPage;
  if (endIndex > productArrays.length) {
    endIndex = productArrays.length;
  }
  var s = `<tr>
              <th>ID</th>
              <th>ẢNH</th>
              <th>TÊN SẢN PHẨM</th>
              <th>LOẠI</th>
              <th>GIÁ</th>
              <th>CHỨC NĂNG</th>
            </tr>`;
  for (var i = startIndex; i < endIndex; i++) {
    s += `<tr>
              <td style="text-align: center">${productArrays[i].productId}</td>
              <td><img src="${productArrays[i].img}" alt="Ảnh" style="width: 100px; height: auto;"></td>
              <td>${productArrays[i].name}</td>
              <td>${productArrays[i].brand}</td>
              <td>${productArrays[i].price.toLocaleString()}</td>
              <td class="btn_">
                <button class = "xoaKH" onclick="deleteproduct('${productArrays[i].productId}')">X</button>
                <button class = "suaKH" onclick="showsetting('${productArrays[i].productId}')">Sửa</button>
              </td>
          </tr>
          
          <div id="bao" style=" top:0;bottom:0;left: 0;;right: 0;  background: rgba(0, 0, 0, 0.7);z-index: 5000;position: fixed; display: none;">
        <div id="bao1" style="width: 60%; margin: 200px auto; border: 1px solid; background-color: white;">
            <div style="float: right; margin: 5px 10px; font-size: 50px; transform: rotate(45deg);cursor: pointer;" onclick="closesetting()">+</div>
            <div id="infor">
                <label for="txtname" style="font-size: 30px; margin-left: 15px ;">Tên sản phẩm:</label><br>
                <input type="text" id="txtname" value="a" size="30px" style="font-size: 25px;width:80%;" /> <br/><br>
                <label for="txtprice" style="font-size: 30px; margin-left: 15px;">Giá:</label><br>
                <input type="text" id="txtprice" value="b" size="30px" style="font-size: 25px; width: 80%;"/>(VND)<br/><br>
                <label style="font-size: 30px; margin-left: 15px;">Ảnh:</label>
                <input type="file" id="imgadd" style="font-size: 25px; width: 80%;">
               

            </div>
            <div id="xacnhan" style=" background-color: orangered; width: fit-content; padding: 10px; font-size: 36px;margin: 20px auto; cursor: pointer;"onclick="changeproduct()">Xác nhận</div>
        </div> 
`;
  }
  var totalPages = Math.ceil(productArrays.length / productsPerPage);
  var pageNumbers = "";

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers += `
                <div class="sotrang" onclick="goToPage1(${i})">
                    ${i}
                </div>
            `;
  }
  var paginationDisplay = totalPages <= 1 ? "none" : "flex";
  document.getElementById("maintable").innerHTML = `
   <table id="tablesp"> ${s}</table>
                              
        <div class="phantrang" style="display: ${paginationDisplay};">
       
                    ${pageNumbers}
        
        </div>
        `;
}
function goToPage1(pageNumber) {
  currentPage = pageNumber;
  hienthitatcasp1();
}
window.addEventListener("load", function () {
  var temp = location.href.split("?");
  if (temp[1] == undefined) {
    hienthitatcasp1();
  }
});
function showmenu() {
  document.getElementById("hai").style.display = "block";
}

function closemenu() {
  document.getElementById("hai").style.display = "none";
}

function showsetting(productid) {
  document.getElementById("bao").style.display = "block";
  var productArray = JSON.parse(localStorage.getItem("all"));
  for (var i = 0; i < productArray.length; i++) {
    if (productArray[i].productId == productid) {
      document.getElementById("txtname").value = productArray[i].name;
      document.getElementById("txtprice").value = productArray[i].price;
      document.getElementById("xacnhan").setAttribute("data-id", productid); // Gắn productId
      break;
    }
  }
}
function changeproduct() {
  var productId = document.getElementById("xacnhan").getAttribute("data-id"); // Lấy ID từ data-id
  var productArray = JSON.parse(localStorage.getItem("all"));
  var imgInput = document.getElementById("imgadd");

  for (var i = 0; i < productArray.length; i++) {
    if (productArray[i].productId == productId) {
      productArray[i].name = document.getElementById("txtname").value;
      productArray[i].price = parseFloat(document.getElementById("txtprice").value);
      if (!productArray[i].name || !productArray[i].price) {
        alert('Vui lòng điền đầy đủ thông tin')
        return false;
      }
      
      if (productArray[i].price < 0) {
        alert('Giá không hợp lệ!')
        return false;
      }
      

      if (imgInput.files.length > 0) { // Chỉ cập nhật ảnh nếu người dùng chọn
        var reader = new FileReader();
        reader.onload = function (e) {
          productArray[i].img = e.target.result;
          localStorage.setItem("all", JSON.stringify(productArray));
          hienthitatcasp1();
          alert("CẬP NHẬT THÀNH CÔNG");
        };
        reader.readAsDataURL(imgInput.files[0]);
        return; // Thoát sớm để đợi ảnh tải xong
      }
    }
  }

  // Lưu lại khi không có thay đổi ảnh
  localStorage.setItem("all", JSON.stringify(productArray));
  hienthitatcasp1();
  alert("CẬP NHẬT THÀNH CÔNG");
}
function closesetting() {
  document.getElementById("bao").style.display = "none";
}
function deleteproduct(productIddelete) {
  var productArrays = JSON.parse(localStorage.getItem("all"));
  for (var i = 0; i < productArrays.length; i++) {
    if (productArrays[i].productId == productIddelete) {
      if (confirm("Bạn có muốn xóa sản phẩm này?")) {
        productArrays.splice(i, 1);
      }
    }
  }
  localStorage.setItem("all", JSON.stringify(productArrays));
  hienthitatcasp1();
}
function addProduct() {
  var productArray = JSON.parse(localStorage.getItem("all")) || [];
  var productid = productArray.length+1;
  var productname = document.getElementById("txtnamesp");
  var brand = document.getElementById("brand");
  var price = document.getElementById("txtprice1");
  var imgInput = document.getElementById("imgUpload");

  if (!brand.value || !productname.value || !price.value || !imgInput.files.length) {
    toast({ title: 'Lỗi', message: 'Vui lòng điền đầy đủ thông tin và tải ảnh!', type: 'error', duration: 3000 });
    return false;
  }
  
  if (price.value < 0) {
    toast({ title: 'Lỗi', message: 'Giá không hợp lệ!', type: 'error', duration: 3000 });
    return false;
  }

  var reader = new FileReader();
  reader.onload = function (e) {
    var producttemp = {
      productId: productid,
      brand: brand.value,
      img: e.target.result, // Lưu URL của ảnh vào sản phẩm
      name: productname.value,
      price: price.value,
    };

    productArray.push(producttemp);
    localStorage.setItem("all", JSON.stringify(productArray));
    hienthitatcasp1();
    toast({ title: 'Thành công', message: 'Thêm thành công sản phẩm!', type: 'success', duration: 3000 });
  };

  reader.readAsDataURL(imgInput.files[0]); // Đọc tệp ảnh
}

function search2() {
  var productsearch = document.getElementById('txtSearch1').value.toLowerCase();
  var productsearch1 = document.getElementById('txtSearch1').value
  var productArrays = JSON.parse(localStorage.getItem('all')); // Lấy danh sách sản phẩm
  var s = '';
  if (!productsearch) {
  hienthitatcasp1();
  return;
  }     // Tìm kiếm cơ bản
  var s = `<tr>
              <th>ID</th>
              <th>ẢNH</th>
              <th>TÊN SẢN PHẨM</th>
              <th>LOẠI</th>
              <th>GIÁ</th>
              <th>CHỨC NĂNG</th>
            </tr>`;
  for (var i = 0; i < productArrays.length; i++) {
      if ((productArrays[i].name.toLowerCase().search(productsearch)!=-1||productArrays[i].productId==productsearch1 ||productArrays[i].brand.toLowerCase().search(productsearch) != -1) && productsearch != '' ) {
        s += `<tr>
              <td style="text-align: center">${productArrays[i].productId}</td>
              <td><img src="${productArrays[i].img}" alt="Ảnh" style="width: 100px; height: auto;"></td>
              <td>${productArrays[i].name}</td>
              <td>${productArrays[i].brand}</td>
              <td>${productArrays[i].price.toLocaleString()}</td>
              <td class="btn_">
                <button class = "xoaKH" onclick="deleteproduct('${productArrays[i].productId}')">X</button>
                <button class = "suaKH" onclick="showsetting('${productArrays[i].productId}')">Sửa</button>
              </td>
          </tr>
    
            <div id="bao" style=" top:0;bottom:0;left: 0;;right: 0;  background: rgba(0, 0, 0, 0.7);z-index: 5000;position: fixed; display: none;">
            <div id="bao1" style="width: 60%; margin: 200px auto; border: 1px solid; background-color: white;">
              <div style="float: right; margin: 5px 10px; font-size: 50px; transform: rotate(45deg);cursor: pointer;" onclick="closesetting()">+</div>
              <div id="infor">
                  <label for="txtname" style="font-size: 30px; margin-left: 15px ;">Tên sản phẩm</label>
                  <input type="text" id="txtname" value="a" size="30px" style="font-size: 30px;margin:30px 10px 15px 100px ;border: none; border-bottom: 2px solid ;" /> <br/>
                  <label for="txtprice" style="font-size: 30px; margin-left: 15px;">Giá (VND)</label>
                  <input type="text" id="txtprice" value="b" size="30px" style="font-size: 30px; margin:0px 10px 15px 150px;border: none; border-bottom: 2px solid ;"/><br/>
                  <label style="font-size: 30px; margin-left: 15px;">Ảnh</label>
                  <input type="file" id="imgadd" style="font-size: 20px; margin: 15px 10px 15px 250px;">
                

              </div>
              <div id="xacnhan" style=" background-color: orangered; width: fit-content; padding: 10px; font-size: 36px;margin: 20px auto; cursor: pointer;"onclick="changeproduct(${productArrays[i].productId})">Xác nhận</div>
          </div> 
`;
      }
  } 
  
  if (s === `<tr>
              <th>ID</th>
              <th>ẢNH</th>
              <th>TÊN SẢN PHẨM</th>
              <th>LOẠI</th>
              <th>GIÁ</th>
              <th>CHỨC NĂNG</th>
            </tr>`) {
document.getElementById('maintable').innerHTML = '<p>Không tìm thấy sản phẩm nào phù hợp.</p>';
}  else {
   document.getElementById('maintable').innerHTML = ` <table id="tablesp"> ${s}</table> `; 
    }
  }
// test
function changeimgadd(input){
  var reader = new FileReader();
  reader.onload = function (e) {
      document.getElementById('imgadd').src = e.target.result;
  };
  reader.readAsDataURL(input.files[0]);
}