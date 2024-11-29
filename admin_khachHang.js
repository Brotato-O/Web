var customers = [
  {
    key: "KH001",
    username: "NHP",
    password: "NHP",
    hoTen: "Nguyễn Hữu Phúc",
    address: "Cà Mau, Đầm Dơi",
    phone: "0964347343",
    email: "phucnguyen2005@gmail.com",
  },
  {
    key: "KH002",
    username: "TTD",
    password: "123456",
    hoTen: "Trần Thị Diễm",
    address: "Hà Nội, Thanh Xuân",
    phone: "0987654321",
    email: "diemtran@gmail.com",
  },
  {
    key: "KH003",
    username: "NVH",
    password: "password123",
    hoTen: "Nguyễn Văn Hùng",
    address: "TP.HCM, Quận 1",
    phone: "0932123456",
    email: "hungnguyen@gmail.com",
  },
  {
    key: "KH004",
    username: "LTQ",
    password: "qwerty",
    hoTen: "Lê Thị Quỳnh",
    address: "Đà Nẵng, Hải Châu",
    phone: "0901234567",
    email: "quynhle@gmail.com",
  },
  {
    key: "KH005",
    username: "PTT",
    password: "password789",
    hoTen: "Phạm Thanh Tùng",
    address: "Cần Thơ, Ninh Kiều",
    phone: "0919876543",
    email: "tungpham@gmail.com",
  },
  {
    key: "KH006",
    username: "LVT",
    password: "123abc",
    hoTen: "Lý Văn Tuấn",
    address: "Hải Phòng, Lê Chân",
    phone: "0912345678",
    email: "tuanly@gmail.com",
  },
  {
    key: "KH007",
    username: "NTM",
    password: "mypass",
    hoTen: "Ngô Thị Minh",
    address: "Quảng Ninh, Cẩm Phả",
    phone: "0908765432",
    email: "minhngo@gmail.com",
  },
  {
    key: "KH008",
    username: "DTA",
    password: "dtapass",
    hoTen: "Đào Thế Anh",
    address: "Lâm Đồng, Bảo Lộc",
    phone: "0934567890",
    email: "anhdao@gmail.com",
  },
  {
    key: "KH009",
    username: "BNT",
    password: "bnt789",
    hoTen: "Bùi Ngọc Thanh",
    address: "Huế, Phú Nhuận",
    phone: "0945678901",
    email: "thanhbui@gmail.com",
  },
  {
    key: "KH010",
    username: "PKD",
    password: "pkdpass",
    hoTen: "Phan Kim Đồng",
    address: "Nghệ An, Vinh",
    phone: "0981122334",
    email: "dongphan@gmail.com",
  },
];
localStorage.setItem("customers", JSON.stringify(customers));

function dsKH(startIndex, endIndex) {
  var temp = JSON.parse(localStorage.getItem("customers"));
  var s = `<tr>
              <th>STT</th>
              <th>HỌ TÊN KH</th>
              <th>TÊN ĐĂNG NHẬP</th>
              <th>ĐỊA CHỈ</th>
              <th>CHỨC NĂNG</th>
            </tr>`;
  for (var i = startIndex; i < endIndex; i++) {
    s += `<tr>
              <td style="text-align: center">${i + 1}</td>
              <td>${temp[i].hoTen}</td>
              <td>${temp[i].username}</td>
              <td>${temp[i].address}</td>
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
  // var arrays = JSON.parse(localStorage.getItem("customers"));
  var totalPages = Math.ceil(list.length / productsPerPage1);
  var startIndex = (currentPage1 - 1) * productsPerPage1;
  var endIndex = startIndex + productsPerPage1;

  if (endIndex > list.length) {
    endIndex = list.length;
  }

  dsKH(startIndex, endIndex);

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
  var arrays = JSON.parse(localStorage.getItem("customers"));
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
            <label for="txtDC">Địa chỉ :</label>
            <input type="text" name="txtDC" />
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
    var listKH = JSON.parse(localStorage.getItem("customers"));
    listKH.splice(index, 1);
    localStorage.setItem("customers", JSON.stringify(listKH));

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
  var listKH = JSON.parse(localStorage.getItem("customers"));
  btnTim.addEventListener("click", (e) => {
    e.preventDefault();
    var inputTĐN = document.querySelector("input[name=txtTĐN]").value;
    var inputTKH = document.querySelector("input[name=txtName]").value;
    var inputĐC = document.querySelector("input[name=txtDC]").value;
    var listSearch = listKH.filter((value) => {
      return (
        value.username.toUpperCase().includes(inputTĐN.toUpperCase()) &&
        value.hoTen.toUpperCase().includes(inputTKH.toUpperCase()) &&
        value.address.toUpperCase().includes(inputĐC.toUpperCase())
      );
    });
    console.log(inputTKH);
    hienthiKH(listSearch);
    document.querySelector("#container").style.display = "none";
  });
});

//Sủa thông tin
function FormSuaKH(index) {
  var listKH = JSON.parse(localStorage.getItem("customers"));
  var customer = listKH[index];

  var s = `
    <div id="suaTTKH">
      <div class="itemForm">
        <h2>SỬA THÔNG TIN KHÁCH HÀNG #${index + 1}</h2>
        <form id="formSuaKH">
          <label for="txtDC2">Địa chỉ :</label>
          <input type="text" name="txtDC2" value="${customer.address}" />
          <label for="txtPhone2">SĐT :</label>
          <input type="text" name="txtPhone2" value="${customer.phone}" />
          <label for="txtEmail2">Email :</label>
          <input type="text" name="txtEmail2" value="${customer.email}" />
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
  var listKH = JSON.parse(localStorage.getItem("customers"));
  var customer = listKH[index];

  var newAddress = document.querySelector("input[name=txtDC2]").value.trim();
  var newPhone = document.querySelector("input[name=txtPhone2]").value.trim();
  var newEmail = document.querySelector("input[name=txtEmail2]").value.trim();

  // console.log(newAddress);
  customer.address = newAddress;
  customer.phone = newPhone;
  customer.email = newEmail;

  listKH[index] = customer;
  localStorage.setItem("customers", JSON.stringify(listKH));

  alert("Cập nhật thông tin thành công!");
  HuySua();
  hienthiKH(listKH);
}
//
