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
}

var currentPage1 = 1;
const productsPerPage1 = 8;
function hienthiKH(list) {
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

  document.querySelector(".phantrang").innerHTML = pageNumbers;
}

function goToPage(pageNumber) {
  var arrays = JSON.parse(localStorage.getItem("accounts"));
  currentPage1 = pageNumber;
  hienthiKH(arrays);
}

//Hiển thị form tìm kiếm
function CreateFormTimKiem() {
  document.querySelector("#timkiemKH").innerHTML = `<div class="itemForm">
          <h2>TÌM KIẾM KHÁCH HÀNG</h2>
          <form action="">
            <label for="txtTĐN">Tên đăng nhập :</label>
            <input type="text" name="txtTĐN" />
            <label for="txtName">Tên khách hàng :</label>
            <input type="text" name="txtName" />
            <label for="txtDC">Ngày tạo :</label>
            <div style="padding-left:100px">
              <label for="tuNgay">Từ:</label>
              <input type="date" name="tuNgay">
              <label for="denNgay">Đến:</label>
              <input type="date" name="denNgay">
            </div>
            <label for="txtDC">Địa chỉ :</label>
            <input type="text" name="txtDC" />
            <div>
              <label for="checkStatus">Tài khoản bị khóa :</label>
              <input type="checkbox" name="checkStatus" />
            </div>
            <div id="btn">
              <button type="reset">Xóa</button>
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
    document.querySelector(".chucNang").style.display = "flex";
    document.querySelector(".content div").innerHTML = "DANH SÁCH KHÁCH HÀNG";
    document.querySelector("#container").style.display = "none";
    document.getElementById("count-container").style.display = "none";
    goToPage(1);
    CreateFormTimKiem();
  }
});

//Tìm kiếm thông tin
window.addEventListener("load", () => {
  var btnTim = document.querySelector("button[name=timKiem]");
  btnTim.addEventListener("click", (e) => {
    e.preventDefault();
    var inputTĐN = document.querySelector("input[name=txtTĐN]").value;
    var inputTKH = document.querySelector("input[name=txtName]").value;
    var inputĐC = document.querySelector("input[name=txtDC]").value;
    var inputTuNgay = document.querySelector("input[name=tuNgay]").value;
    var inputDenNgay = document.querySelector("input[name=denNgay]").value;

    var inputStatus = document.querySelector(
      ".itemForm input[name=checkStatus]"
    ).checked;

    var listKH = JSON.parse(localStorage.getItem("accounts"));
    var listSearch = listKH.filter((value) => {
      var temp = true;
      var tempNgayTao;
      var tuNgay;
      var denNgay;

      if (inputStatus) {
        temp = value.status === "block";
      } else {
        temp = value.status === "active";
      }

      if (value.ngayTao || inputTuNgay || inputDenNgay) {
        tempNgayTao = new Date(value.ngayTao);
        tuNgay = new Date(inputTuNgay);
        denNgay = new Date(inputDenNgay);
      }

      return (
        value.username.toUpperCase().includes(inputTĐN.toUpperCase()) &&
        value.hoTen.toUpperCase().includes(inputTKH.toUpperCase()) &&
        value.address.toUpperCase().includes(inputĐC.toUpperCase()) &&
        tuNgay <= tempNgayTao &&
        tempNgayTao <= denNgay &&
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
        <form id="formSuaKH">
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
          <div id="btn">
            <button type="button" onclick="HuySua()">Hủy</button>
            <button type="button" onclick="LuuSua(${index})">Lưu</button>
          </div>
        </form>
      </div>
    </div>`;
  document.querySelector("#formContainer").innerHTML = s;
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
