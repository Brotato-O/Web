
var currentPage = 1;
const productsPerPage = 12;
function currency(value) {
  return value.toLocaleString("vi-VN");
}

var currentPage = 1;

function hienthitatcasp1() {
  const productsPerPage = 12;
  var productArrays = JSON.parse(localStorage.getItem("all"));
  var startIndex = (currentPage - 1) * productsPerPage;
  var endIndex = startIndex + productsPerPage;
  if (endIndex > productArrays.length) {
    endIndex = productArrays.length;
  }
  var s = "";
  for (let i = startIndex; i < endIndex; i++) {
    s += `
        <div class="cot1" style="border-left: 10px gold solid; border-bottom:2px groove ;">${
          productArrays[i].productId
        }</div>
        <div class="cot1"><img src="${productArrays[i].img}" alt="" /></div>
        <div class="cot1">${productArrays[i].name}</div>
        <div class="cot1">${productArrays[i].brand}</div>
        <div class="cot1">${productArrays[i].price.toLocaleString()} VND</div>
        <div class="cotchinhsua">
          <div class="button" style="background-color: rgb(213, 75, 0);" onclick="deleteproduct('${
            productArrays[i].productId
          }')"
>
              x
          </div>
          <div class="button" style="background-color: rgba(196, 196, 20, 0.81)" onclick=showsetting(${
            productArrays[i].productId
          }); >
              sửa
          </div>
        </div>
        <div id="bao" style=" top:0;bottom:0;left: 0;;right: 0;  background: rgba(0, 0, 0, 0.7);z-index: 5000;position: fixed; display: none;">
        <div id="bao1" style="width: 60%; margin: 200px auto; border: 1px solid; background-color: white;">
            <div style="float: right; margin: 5px 10px; font-size: 50px; transform: rotate(45deg);cursor: pointer;" onclick="closesetting()">+</div>
            <div id="infor">
                <label for="txtname" style="font-size: 30px; margin-left: 15px ;">Tên sản phẩm</label>
                <input type="text" id="txtname" value="a" size="30px" style="font-size: 30px;margin:30px 10px 15px 100px ;border: none; border-bottom: 2px solid ;" /> <br/>
                <label for="txtprice" style="font-size: 30px; margin-left: 15px;">Giá (VND)</label>
                <input type="text" id="txtprice" value="b" size="30px" style="font-size: 30px; margin:0px 10px 15px 150px;border: none; border-bottom: 2px solid ;"/><br/>
                <label style="font-size: 30px; margin-left: 15px ;">Ảnh</label>
                <input type="file"  id="imgbefore"  value=" "style="font-size: 20px;margin:15px 10px 15px 250px ;">
            </div>
            <div id="xacnhan" style=" background-color: orangered; width: fit-content; padding: 10px; font-size: 36px;margin: 20px auto; cursor: pointer;"onclick="changeproduct(${
              productArrays[i].productId
            })">Xác nhận</div>
        </div> 
    </div>
              `;
  }
  var totalPages = Math.ceil(productArrays.length / productsPerPage);
  var pageNumbers = "";

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers += `
                <div class="sotrang" onclick="goToPage(${i})">
                    ${i}
                </div>
            `;
  }

  document.getElementById("maintable").innerHTML = `
 
        <div class="cot" >#ID</div>
        <div class="cot" >ẢNH</div>
        <div class="cot">TÊN SẢN PHẨM</div>
        <div class="cot">LOẠI</div>
        <div class="cot">GIÁ</div>
        <div class="cot"></div>
                      ${s}
                     
        <div class="phantrang">
       
                    ${pageNumbers}
        
        </div>
        `;
}
function goToPage(pageNumber) {
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
    }
  }
}
function changeproduct(productid) {
  document.getElementById("bao").style.display = "none";
  var productArray = JSON.parse(localStorage.getItem("all"));
  for (var i = 0; i < productArray.length; i++) {
    if (productArray[i].productId == productid) {
      productArray[i].name = document.getElementById("txtname").value;
      productArray[i].price = parseFloat(
        document.getElementById("txtprice").value
      );
      localStorage.setItem("all", JSON.stringify(productArray));
      hienthitatcasp1();
    }
  }
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
  var productArray = JSON.parse(localStorage.getItem("all"));
  var productid = "150000";
  var productname = document.getElementById("txtnamesp");
  var brand = document.getElementById("brand");
  var price = document.getElementById("txtprice");
  if (!brand.value || !productname.value || !price.value) {
    toast({ title: 'Lỗi', message: 'Vui lòng điền đầy đủ thông tin !', type: 'error', duration: 3000 });
    return false;
  }
  if (price.value < 0) {
    toast({ title: 'Lỗi', message: 'Giá không hợp lệ !', type: 'error', duration: 3000 });
    return false;
  }
  var producttemp = {
    productId: productid,
    brand: brand.value,
    img: "",
    name: productname.value,
    price: price.value,
  };
  productArray.push(producttemp);
  localStorage.setItem("all", JSON.stringify(productArray));
  hienthitatcasp1();
  productname.value = "";
  price.value = "";
  brand.value = "Giày cỏ nhân tạo";
  toast({ title: 'Thành công', message: 'Thêm thành công sản phẩm !', type: 'success', duration: 3000 });
}

// test
