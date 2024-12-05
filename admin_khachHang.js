function dsKH(startIndex, endIndex, list) {
  var s = `<tr>
              <th>STT</th>
              <th>HỌ TÊN KH</th>
              <th>TÊN ĐĂNG NHẬP</th>
              <th>NGÀY TẠO</th>
              <th>ĐỊA CHỈ</th>
              <th>CHỨC NĂNG</th>
            </tr>`;
  for (var i = startIndex; i < endIndex; i++) {
    s += `<tr>
              <td style="text-align: center">${i + 1}</td>
              <td>${list[i].name || []}</td>
              <td>${list[i].username || []}</td>
              <td>${list[i].date || []}</td>
              <td>${list[i].address || []}</td>
              <td class="btn_">
                <button class = "xoaKH" onclick="XoaKH(${i})">X</button>
                <button class = "suaKH" onclick="FormSuaKH(${i})">Sửa</button>
              </td>
          </tr>`;
  }

  document.querySelector("#tableKH").innerHTML = s;
  // Kiểm tra kích thước màn hình và ẩn cột thứ 4 nếu nhỏ hơn 600px
  if (window.innerWidth <= 600) {
    // Sử dụng JavaScript để ẩn cột "Ngày Tạo" khi màn hình nhỏ
    var cells = document.querySelectorAll(
      "#tableKH td:nth-child(4), #tableKH th:nth-child(4)"
    );
    cells.forEach((cell) => {
      cell.style.display = "none"; // Ẩn cột thứ 4 (Ngày Tạo)
    });
  } else {
    // Nếu màn hình lớn hơn 600px, đảm bảo cột "Ngày Tạo" hiển thị
    var cells = document.querySelectorAll(
      "#tableKH td:nth-child(4), #tableKH th:nth-child(4)"
    );
    cells.forEach((cell) => {
      cell.style.display = ""; // Hiển thị cột thứ 4
    });
  }
}

var currentPage1 = 1;
const productsPerPage1 = 8;
function hienthiKH(list) {
  document.getElementById("SearchBar2").style.display = "none";
  // Lọc chỉ những khách hàng có trạng thái active nếu checkbox chưa được chọn
  var checkElement = document.querySelector("[name='checkStatus']");
  //checkElement.checked: true -> có check , false -> chưa check
  var checkStatus = checkElement ? checkElement.checked : false; // Mặc định là false nếu không tìm thấy phần tử
  var listKH = list.filter((value) =>
    checkStatus ? value.status === "block" : value.status === "active"
  );

  var totalPages = Math.ceil(listKH.length / productsPerPage1);
  var startIndex = (currentPage1 - 1) * productsPerPage1;
  var endIndex = startIndex + productsPerPage1;

  if (endIndex > listKH.length) {
    endIndex = listKH.length;
  }

  dsKH(startIndex, endIndex, listKH);

  // Tạo nút phân trang
  var pageNumbers = "";
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers += `
      <div class="sotrang" onclick="goToPage(${i})" style="cursor: pointer; ${
      i === currentPage1 ? "font-weight: bold; text-decoration: underline;" : ""
    }">
        ${i}
      </div>`;
  }
  //hiện thị hoặc không hiện thị phân trang
  var paginationDisplay1 = totalPages <= 1 ? "none" : "flex";
  const paginationElement = document.querySelector(".phantrang");
  if (paginationElement) {
    paginationElement.style.display = paginationDisplay1; // Cập nhật CSS
    paginationElement.innerHTML = pageNumbers; // Gán các nút phân trang
  }
}

function goToPage(pageNumber) {
  var arrays = JSON.parse(localStorage.getItem("accounts"));
  currentPage1 = pageNumber;
  hienthiKH(arrays);
}

//Hiển thị form tìm kiếm
function CreateFormTimKiem() {
  document.querySelector("#timkiemKH").innerHTML = `<div class="itemForm" >
          <form action=""id="form100">
          <div style="display: flex; gap: 10px; justify-content: center; align-items: center;">
            <label for="txtName" style="white-space: nowrap;">Tên khách hàng :</label>
            <input type="text" name="txtName" />
          </div>

             
              <div id="formdiachi">
              <label for="txtDC" style="white-space:nowrap;">Địa chỉ :</label>
              <input type="text" name="txtDC" />
              </div>
              <div style="display: flex; gap: 10px; justify-content: center; align-items: center;">
                <label for="tuNgay">Từ:</label>
                <input type="date" name="tuNgay">
                <label for="denNgay">Đến:</label>
                <input type="date" name="denNgay">
              </div>  
              <div id="formTKBK" style="display: flex; gap: 10px; align-items: center;">
                <label for="checkStatus"style="white-space:nowrap;">Tài khoản khóa :</label>
                <input type="checkbox" name="checkStatus" />
              </div>
              <div id="btn1" >
                <button type="reset" >Xóa</button>
                <button type="submit" name="timKiem">Tìm</button>
              </div>
            
          </form>
          
        </div>`;
}
//Xóa phần tử
function XoaKH(index) {
  if (confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
    var listKH = JSON.parse(localStorage.getItem("accounts"));
    listKH.splice(index, 1);
    localStorage.setItem("accounts", JSON.stringify(listKH));

    var totalPages = Math.ceil(listKH.length / productsPerPage1);
    // Nếu số trang hiện tại lớn hơn số trang tối đa sau khi xóa, chuyển về trang trước đó
    if (currentPage1 > totalPages && totalPages > 0) {
      currentPage1--;
    }
    hienthiKH(listKH);
  }
}
//
window.addEventListener("DOMContentLoaded", function () {
  var temp = location.href.split("?");

  if (temp[1] == "khachHang") {
    document.querySelector(".chucNang").style.display = "block";
    document.querySelector(".content div").innerHTML = "DANH SÁCH KHÁCH HÀNG";
    CreateFormTimKiem();
    document.querySelector("#container").style.display = "none";
    document.getElementById("count-container").style.display = "none";
    goToPage(1);
  }
});

//Tìm kiếm thông tin
window.addEventListener("load", () => {
  var btnTim = document.querySelector("button[name=timKiem]");
  btnTim.addEventListener("click", (e) => {
    e.preventDefault();

    var inputTKH = document.querySelector("input[name=txtName]").value.trim();
    var inputĐC = document.querySelector("input[name=txtDC]").value.trim();
    var inputTuNgay = document.querySelector("input[name=tuNgay]").value;
    var inputDenNgay = document.querySelector("input[name=denNgay]").value;
    var inputStatus = document.querySelector(
      ".itemForm input[name=checkStatus]"
    ).checked;

    var listKH = JSON.parse(localStorage.getItem("accounts")) || [];
    var listSearch = listKH.filter((value) => {
      var tempNgayTao = new Date(value.date);
      var tuNgay = new Date(inputTuNgay);
      var denNgay = new Date(inputDenNgay);

      // Kiểm tra trạng thái
      var temp = inputStatus
        ? value.status === "block"
        : value.status === "active";

      // Kiểm tra ngày
      if (tuNgay && denNgay && tempNgayTao) {
        if (tempNgayTao < tuNgay || tempNgayTao > denNgay) return false;
      }

      // Kết hợp các điều kiện
      return (
        (value.name || "").toUpperCase().includes(inputTKH.toUpperCase()) &&
        (value.address || "").toUpperCase().includes(inputĐC.toUpperCase()) &&
        temp
      );
    });

    hienthiKH(listSearch);
  });
});
//Sủa thông tin
function FormSuaKH(index) {
  var listKH = JSON.parse(localStorage.getItem("accounts"));
  var customer = listKH[index];

  var s = `
    <div id="suaTTKH">
      <div class="itemForm">
        <h2>SỬA THÔNG TIN KHÁCH HÀNG #${index + 1}</h2>
        <form id="formSuaKH" style="flex-direction:column">
          <label for="txtDC2">Địa chỉ :</label>
          <input type="text" name="txtDC2" value="${customer.address || []}" />
          <label for="txtPhone2">SĐT :</label>
          <input type="text" name="txtPhone2" value="${customer.phone || []}" />
          <label for="txtEmail2">Email :</label>
          <input type="text" name="txtEmail2" value="${customer.email || []}" />
           <div>
            <label for="checkStatus2">Khóa tài khoản :</label>
            <input type="checkbox" name="checkStatus2" value="${
              customer.status
            }"/>
          </div>
          <div id="btn1" style ="justify-content: center; margin: auto; width:60%">
            <button type="button" onclick="HuySua()">Hủy</button>
            <button type="button" onclick="LuuSua(${index})">Lưu</button>
          </div>
        </form>
      </div>
    </div>`;
  document.querySelector("#formContainer").innerHTML = s;
  document.querySelector("#suaTTKH").style.display = "block";
}
function HuySua() {
  document.querySelector("#formContainer").innerHTML = "";
}

function LuuSua(index) {
  var listKH = JSON.parse(localStorage.getItem("accounts"));
  var customer = listKH[index];

  var newAddress = document.querySelector("input[name=txtDC2]").value.trim();
  var newPhone = document.querySelector("input[name=txtPhone2]").value.trim();
  var newEmail = document.querySelector("input[name=txtEmail2]").value.trim();
  var newStatus = document.querySelector(".itemForm input[name=checkStatus2]")
    .checked
    ? "block"
    : "active";
  console.log(newStatus);
  customer.address = newAddress;
  customer.phone = newPhone;
  customer.email = newEmail;
  customer.status = newStatus;

  listKH[index] = customer;
  localStorage.setItem("accounts", JSON.stringify(listKH));

  alert("Cập nhật thông tin thành công!");
  HuySua();
  hienthiKH(listKH);
}
function blockSearch() {
  var searchBlock = document.querySelector("#timkiemKH");
  if (
    searchBlock.style.display === "none" ||
    searchBlock.style.display === ""
  ) {
    searchBlock.style.display = "flex";
  } else {
    searchBlock.style.display = "none";
  }
}

function onInputSearch() {
  var onInput = document.querySelector("#txtSearch2").value.trim();
  var list = JSON.parse(localStorage.getItem("accounts"));
  var s = `<tr>
              <th>STT</th>
              <th>HỌ TÊN KH</th>
              <th>TÊN ĐĂNG NHẬP</th>
              <th>NGÀY TẠO</th>
              <th>ĐỊA CHỈ</th>
              <th>CHỨC NĂNG</th>
           </tr>`;
  // console.log(onInput);
  if (!onInput) {
    hienthiKH(list); // Hiển thị toàn bộ danh sách nếu không nhập
    return;
  }

  // Tìm kiếm username khớp
  var found = false; // Biến kiểm tra có kết quả hay không
  for (let i = 0; i < list.length; i++) {
    if (
      list[i].username &&
      list[i].username.toLowerCase().includes(onInput.toLowerCase())
    ) {
      found = true; // Đánh dấu tìm thấy kết quả
      s += `<tr>
              <td style="text-align: center">${i + 1}</td>
              <td>${list[i].name || ""}</td>
              <td>${list[i].username || ""}</td>
              <td>${list[i].date || ""}</td>
              <td>${list[i].address || ""}</td>
              <td class="btn_">
                <button class="xoaKH" onclick="XoaKH(${i})">X</button>
                <button class="suaKH" onclick="FormSuaKH(${i})">Sửa</button>
              </td>
            </tr>`;
    }
  }

  if (!found) {
    // Không tìm thấy kết quả
    s += `<tr><td colspan="6" style="text-align: center;">Không tìm thấy kết quả</td></tr>`;
  }
  document.querySelector("#tableKH").innerHTML = s;
}
