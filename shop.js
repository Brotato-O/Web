
var currentPage = 1;
const productsPerPage = 12;


function closesp() {
    document.getElementById("sanpham-chitiet").style.display = "none";
    hienthisanpham1();
  }

function hienthisanpham1(){
  var tmp=JSON.parse(localStorage.getItem('all'));
    var url=window.location.href;
    var bien=url.split("?")[1];
    var tmp1=[];
   
    if(bien=="shoes"){
      for(i=0;i<tmp.length;i++){
        if((tmp[i].brand=="Giày cỏ tự nhiên") || (tmp[i].brand=="Giày cỏ nhân tạo")){
        tmp1.push(tmp[i]);
        }
   }
    }else if (bien=="phukien") {
      for(i=0;i<tmp.length;i++){
        if(tmp[i].brand=="Phụ kiện"){
        tmp1.push(tmp[i]);
        }
   }
    }else if(bien=="quanao"){
      for(i=0;i<tmp.length;i++){
        if(tmp[i].brand=="Quần áo"){
        tmp1.push(tmp[i]);
        }
    }
  }else if(bien=="giaynt"){
    for(i=0;i<tmp.length;i++){
      if(tmp[i].brand=="Giày cỏ nhân tạo"){
      tmp1.push(tmp[i]);
      }
  }
  }else if(bien=="giaytn"){
    for(i=0;i<tmp.length;i++){
      if(tmp[i].brand=="Giày cỏ tự nhiên"){
      tmp1.push(tmp[i]);
      }
  }
}
    var selectArrays=tmp1;
    if (!bien) {
      return;
    }
        var s = "";
  var startIndex = (currentPage - 1) * productsPerPage;
  var endIndex = startIndex + productsPerPage;
  if (endIndex > selectArrays.length) {
    endIndex = selectArrays.length;
  }

  for (var i = startIndex; i < endIndex; i++) {
    s += `
              <div class="product" onclick="show2(${selectArrays[i].productId})">
                    <img src="${selectArrays[i].img}" alt="${selectArrays[i].name}">
                    <h3>${selectArrays[i].name}</h3>
                    <p>${(selectArrays[i].price).toLocaleString()} VND</p>
                      
                </div>
            `;
  }

  var totalPages = Math.ceil(selectArrays.length / productsPerPage);
  var pageNumbers = "";

  for (var i = 1; i <= totalPages; i++) {
    pageNumbers += `
                <div class="sotrang" onclick="goToPage(${i})">
                    ${i}
                </div>
            `;
  }
  var paginationDisplay = totalPages <= 1 ? "none" : "flex";
  document.getElementById("search").style.display="block";
  document.getElementById("toan1").innerHTML = `
            <div class="menu-sanpham" id="menu-sanpham1">
                <div class="danhsach-sanpham" id="danhsach-sanpham1">${s}</div>

                <div class="phantrang" style="display: ${paginationDisplay};">
                    ${pageNumbers}
                </div>
                <div id="sanpham-chitiet" onclick="hide1(event)">
                  <div class="mota-sanpham">
                    <button type="button" class="exit" onclick="closesp();">x</button>
                    <div class="mota-trai">
                      <img id="img-sp" src="1000.jpg" />
                    </div>
                    <div class="mota-phai">
                      <h1 id="name-sp">chua co</h1>
                      <h6>
                        <span>
                          Mã sản phẩm:
                          <strong id="ma-sp">chua co</strong>
                        </span>
                      </h6>
                      <h4 id="price">chua co </h4>
                      <div class="line"></div>
                      <div class="row">
                        <div class="kichco">
                          <h4>SIZE</h4>
                          <select id="size">
                            <option value="31" selected>31</option>
                            <option value="32">32</option>
                            <option value="33">33</option>
                            <option value="34">34</option>
                            <option value="35">35</option>
                            <option value="36">36</option>
                            <option value="37">37</option>
                          </select>
                        </div>
                        <div class="soluong">
                          <h4>Số lượng</h4>
                          <button class="bot" onclick="giamsl()">-</button>
                          <input type="text" id="sl" value="1">
                          <button class="them" onclick=tangsl()>+</button>
                        </div>
                      </div>
                      <div style="text-align: center">
                       <button class="add-to-cart">THÊM VÀO GIỎ HÀNG</button>

                      </div>
                      <div>
                        
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        `;
          }

function giamsl(){
      if(document.getElementById("sl").value>1){
        document.getElementById("sl").value--;
      }
    }
function tangsl(){
      document.getElementById("sl").value++;
    }
  
  function show2(ID) {
    var tmp=JSON.parse(localStorage.getItem('all'));
    var product = tmp.find(item => item.productId == ID);
    if (product) {
        
        document.getElementById("img-sp").src = product.img;
        document.getElementById("name-sp").innerHTML = product.name;
        document.getElementById("ma-sp").innerHTML = `${product.productId || "N/A"}`;
        document.getElementById("price").innerHTML = `${product.price}`;
        document.getElementById("sanpham-chitiet").style.display = "block";
    } else {
        console.error("Sản phẩm không tồn tại!");
    }
}

var all = JSON.parse(localStorage.getItem('all'));
localStorage.setItem('producttmp', JSON.stringify(all));
localStorage.setItem('producttmp1', JSON.stringify(all));
localStorage.setItem('producttmp2', JSON.stringify(all));

function hienthitatcasp(){
  var tmp=JSON.parse(localStorage.getItem('producttmp2'));
  var startIndex=(currentPage-1)*productsPerPage;
  var endIndex=startIndex+productsPerPage;
  if(endIndex>tmp.length){
    endIndex=tmp.length;
  }

  var s="";
  for (var i = startIndex; i < endIndex; i++) {
    s += `
                <div class="product" onclick="show2(${tmp[i].productId})">
                    <img src="${tmp[i].img}" alt="${tmp[i].name}">
                    <h3>${tmp[i].name}</h3>
                    <p>${(tmp[i].price).toLocaleString()} VND</p>
                </div>
            `;
}
var totalPages = Math.ceil(tmp.length / productsPerPage);
var pageNumbers = "";

for (var i = 1; i <= totalPages; i++) {
  pageNumbers += `
              <div class="sotrang" onclick="goToPage(${i})">
                  ${i}
              </div>
          `;
}
var paginationDisplay = totalPages <= 1 ? "none" : "flex";
document.getElementById("allsp").innerHTML = `
          <div class="menu-sanpham" id="menu-sanpham1">
              <div class="danhsach-sanpham" id="danhsach-sanpham1">${s}</div>

              <div class="phantrang" style="display: ${paginationDisplay};">
                  ${pageNumbers}
              </div>
              <div id="sanpham-chitiet" onclick="hide1(event)">
                <div class="mota-sanpham">
                  <button type="button" class="exit" onclick="closesp();">x</button>
                  <div class="mota-trai">
                    <img id="img-sp" src="1000.jpg" />
                  </div>
                  <div class="mota-phai">
                    <h1 id="name-sp">chua co</h1>
                    <h6>
                      <span>
                        Mã sản phẩm:
                        <strong id="ma-sp">chua co</strong>
                      </span>
                    </h6>
                    <h4 id="price">chua co </h4>
                    <div class="line"></div>
                    <div class="row">
                      <div class="kichco">
                        <h4>SIZE</h4>
                        <select id="size">
                          <option value="31" selected>31</option>
                          <option value="32">32</option>
                          <option value="33">33</option>
                          <option value="34">34</option>
                          <option value="35">35</option>
                          <option value="36">36</option>
                          <option value="37">37</option>
                        </select>
                      </div>
                      <div class="soluong">
                        <h4>Số lượng</h4>
                        <button class="bot" onclick="giamsl()">-</button>
                        <input type="text" id="sl" value="1">
                        <button class="them" onclick=tangsl()>+</button>
                      </div>
                    </div>
                    <div style="text-align: center">
                     <button class="add-to-cart">THÊM VÀO GIỎ HÀNG</button>

                    </div>
                    <div>
                     
                    </div>
                  </div>
                </div>
              </div>
          </div>
      `;
}
function goToPage(pageNumber) {
currentPage = pageNumber;
hienthisanpham1();
hienthitatcasp();
search1();

}
setTimeout(hienthisanpham1, 20);
setTimeout(hienthitatcasp, 10);

function search1() {
var productsearch = document.getElementById('txtSearch').value.toLowerCase();
var productArray = JSON.parse(localStorage.getItem('producttmp')); // Lấy danh sách sản phẩm
var s = '';
if (!productsearch) {
document.getElementById("h3tieude").innerText="Tất cả sản phẩm";
hienthitatcasp();
return;
}
    // Tìm kiếm cơ bản
for (var i = 0; i < productArray.length; i++) {
  document.getElementById("h3tieude").innerText="Lọc theo sản phẩm";
    if ((productArray[i].name.toLowerCase().search(productsearch)!=-1||productArray[i].brand.toLowerCase().search(productsearch) != -1) && productsearch != '' ) {
          s += `
                              <div class="product" onclick="show2(${productArray[i].productId})">
                                <img src="${productArray[i].img}" alt="${productArray[i].name}">
                                <h3>${productArray[i].name}</h3>
                                <p>${(productArray[i].price).toLocaleString()} VND</p>
                                </div>
                          `;
      let tmp2 = productArray.filter(product => product.name.toLowerCase().search(productsearch) != -1 || product.brand.toLowerCase().search(productsearch) != -1);
      localStorage.setItem('producttmp2', JSON.stringify(tmp2));
    }
}

if (s === '') {
document.getElementById('allsp').innerHTML = '<p>Không tìm thấy sản phẩm nào phù hợp.</p>';
} else {

document.getElementById('allsp').innerHTML = `
                <div class="menu-sanpham" id="menu-sanpham1">
              <div class="danhsach-sanpham" id="danhsach-sanpham1">${s}</div>
              <div id="sanpham-chitiet" onclick="hide1(event)">
                <div class="mota-sanpham">
                  <button type="button" class="exit" onclick="closesp();">x</button>
                  <div class="mota-trai">
                    <img id="img-sp" src="1000.jpg" />
                  </div>
                  <div class="mota-phai">
                    <h1 id="name-sp">chua co</h1>
                    <h6>
                      <span>
                        Mã sản phẩm:
                        <strong id="ma-sp">chua co</strong>
                      </span>
                    </h6>
                    <h4 id="price">chua co </h4>
                    <div class="line"></div>
                    <div class="row">
                      <div class="kichco">
                        <h4>SIZE</h4>
                        <select id="size">
                          <option value="31" selected>31</option>
                          <option value="32">32</option>
                          <option value="33">33</option>
                          <option value="34">34</option>
                          <option value="35">35</option>
                          <option value="36">36</option>
                          <option value="37">37</option>
                        </select>
                      </div>
                      <div class="soluong">
                        <h4>Số lượng</h4>
                        <button class="bot" onclick="giamsl()">-</button>
                        <input type="text" id="sl" value="1">
                        <button class="them" onclick=tangsl()>+</button>
                      </div>
                    </div>
                    <div style="text-align: center">
                      <button class="add-to-cart">THÊM VÀO GIỎ HÀNG</button>

                    </div>
                    <div>
                      
                    </div>
                  </div>
                </div>
              </div>
          </div>
      `;
      
  }
}

function kiemtrachon() {
  var pl = document.phanloai.phanloaisp.value; // Lấy giá trị phân loại
  var tmp = JSON.parse(localStorage.getItem('all'));
  var producttmp = JSON.parse(localStorage.getItem('producttmp'));
  var s = '';
  var tmp1 = [];

  // Nếu không chọn phân loại (mặc định "tất cả sản phẩm")
  if (pl === "tatcasp") {
      document.getElementById("h3tieude").innerText = "Tất cả sản phẩm";
      hienthitatcasp();
      localStorage.setItem('producttmp', JSON.stringify(tmp));
      localStorage.setItem('producttmp2', JSON.stringify(tmp));
      resetSapXep();
      document.getElementById('giatu').value = '';
      document.getElementById('giaden').value = '';
      phanloaitheogia();
      return;
  }

  // Lọc sản phẩm theo phân loại
  if (tmp && Array.isArray(tmp)) {
      tmp1 = tmp.filter(product => product.brand === pl);
      localStorage.setItem('producttmp', JSON.stringify(tmp1));
      localStorage.setItem('producttmp2', JSON.stringify(tmp1));
      resetSapXep();
      document.getElementById('giatu').value = '';
      document.getElementById('giaden').value = '';
      phanloaitheogia();
  }


  for (var i = 0; i < tmp1.length; i++) {
    document.getElementById("h3tieude").innerText="Lọc theo sản phẩm";
      {
            s += `
                                <div class="product" onclick="show2(${tmp1[i].productId})">
                                  <img src="${tmp1[i].img}" alt="${tmp1[i].name}">
                                  <h3>${tmp1[i].name}</h3>
                                  <p>${(tmp1[i].price).toLocaleString()} VND</p>
                                </div>
                            `;
      }
  }

  document.getElementById('allsp').innerHTML = `<div class="menu-sanpham" id="menu-sanpham1">
              <div class="danhsach-sanpham" id="danhsach-sanpham1">${s}</div>
              <div id="sanpham-chitiet" onclick="hide1(event)"> 
                <div class="mota-sanpham">
                  <button type="button" class="exit" onclick="closesp();">x</button>
                  <div class="mota-trai">
                    <img id="img-sp" src="1000.jpg" />
                  </div>
                  <div class="mota-phai">
                    <h1 id="name-sp">chua co</h1>
                    <h6>
                      <span>
                        Mã sản phẩm:
                        <strong id="ma-sp">chua co</strong>
                      </span>
                    </h6>
                    <h4 id="price">chua co </h4>
                    <div class="line"></div>
                    <div class="row">
                      <div class="kichco">
                        <h4>SIZE</h4>
                        <select id="size">
                          <option value="31" selected>31</option>
                          <option value="32">32</option>
                          <option value="33">33</option>
                          <option value="34">34</option>
                          <option value="35">35</option>
                          <option value="36">36</option>
                          <option value="37">37</option>
                        </select>
                      </div>
                      <div class="soluong">
                        <h4>Số lượng</h4>
                        <button class="bot" onclick="giamsl()">-</button>
                        <input type="text" id="sl" value="1">
                        <button class="them" onclick=tangsl()>+</button>
                      </div>
                    </div>
                    <div style="text-align: center">
                     <button class="add-to-cart">THÊM VÀO GIỎ HÀNG</button>

                    </div>
                    <div>
                     
                    </div>
                  </div>
                </div>
              </div>
          </div>
      `;
}

function phanloaitheogia(){
  var tmp = JSON.parse(localStorage.getItem('producttmp'));
  var tmp2 = [];
  var gt = document.getElementById('giatu').value;
  var gd = document.getElementById('giaden').value;
  var s = '';
  document.getElementById('txtSearch').value = '';
  sx1.classList.remove('active');
  sx2.classList.remove('active');
  sx3.classList.remove('active');
  sx4.classList.remove('active');
  if((!gt) && (!gd)){
    var tmp1 = JSON.parse(localStorage.getItem('all'));
    document.getElementById("h3tieude").innerText = "Tất cả sản phẩm";
    localStorage.setItem('producttmp2', JSON.stringify(tmp1));
    hienthitatcasp();
    return;
  }
  else if(gt<0 || gd<0){
    toast({ title: 'Lỗi', message: 'Giá không hợp lệ!', type: 'error', duration: 3000 });
    return false;
  }
  else {
    for (var i = 0; i < tmp.length; i++) {
      document.getElementById("h3tieude").innerText="Lọc theo sản phẩm";
        if ((tmp[i].price>=gt && !gd)||(tmp[i].price>=gt) && (tmp[i].price<=gd) ) {
              s += `
                                  <div class="product" onclick="show2(${tmp[i].productId})">
                                    <img src="${tmp[i].img}" alt="${tmp[i].name}">
                                    <h3>${tmp[i].name}</h3>
                                    <p>${(tmp[i].price).toLocaleString()} VND</p>
                                    </div>
                              `;
            tmp2 = tmp.filter(product => product.price >= gt && product.price <= gd);
            localStorage.setItem('producttmp2', JSON.stringify(tmp2));
        }
    } 
    
    if (s === '') {
    document.getElementById('allsp').innerHTML = '<p>Không tìm thấy sản phẩm nào phù hợp.</p>';
    } else {
    document.getElementById('allsp').innerHTML = `
                    <div class="menu-sanpham" id="menu-sanpham1">
                  <div class="danhsach-sanpham" id="danhsach-sanpham1">${s}</div>
                  <div id="sanpham-chitiet" onclick="hide1(this)">
                    <div class="mota-sanpham">
                      <button type="button" class="exit" onclick="closesp();">x</button>
                      <div class="mota-trai">
                        <img id="img-sp" src="1000.jpg" />
                      </div>
                      <div class="mota-phai">
                        <h1 id="name-sp">chua co</h1>
                        <h6>
                          <span>
                            Mã sản phẩm:
                            <strong id="ma-sp">chua co</strong>
                          </span>
                        </h6>
                        <h4 id="price">chua co </h4>
                        <div class="line"></div>
                        <div class="row">
                          <div class="kichco">
                            <h4>SIZE</h4>
                            <select id="size">
                              <option value="31" selected>31</option>
                              <option value="32">32</option>
                              <option value="33">33</option>
                              <option value="34">34</option>
                              <option value="35">35</option>
                              <option value="36">36</option>
                              <option value="37">37</option>
                            </select>
                          </div>
                          <div class="soluong">
                            <h4>Số lượng</h4>
                            <button class="bot" onclick="giamsl()">-</button>
                            <input type="text" id="sl" value="1">
                            <button class="them" onclick=tangsl()>+</button>
                          </div>
                        </div>
                        <div style="text-align: center">
                          <button class="add-to-cart">THÊM VÀO GIỎ HÀNG</button>
    
                        </div>
                        <div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
          `;
          
      }
  }
}

//nhàn
function hide1(event){
  if(event.target.id== "sanpham-chitiet"){
    document.getElementById("sanpham-chitiet").style.display = "none";
  }
}

//Khải
var btnpl = document.getElementById('btnPLoai');
var opl = document.getElementById('openPhanloai');

btnpl.addEventListener('click', function(e) {
  e.preventDefault();
  if(opl.style.display === 'none') {
    opl.style.display = 'flex';
    
  } else {
    opl.style.display = 'none';
  }
});

var sx1 = document.getElementById('sx1');
var sx2 = document.getElementById('sx2');
var sx3 = document.getElementById('sx3');
var sx4 = document.getElementById('sx4');

function sapXepTheoGiaTangDan() {
  let tmps = JSON.parse(localStorage.getItem('producttmp2'));
  tmps.sort((a, b) => a.price - b.price);
  localStorage.setItem('producttmp2', JSON.stringify(tmps));
  hienthitatcasp();
  sx1.classList.remove('active');
  sx2.classList.remove('active');
  sx3.classList.add('active');
  sx4.classList.remove('active');
}

function sapXepTheoGiaGiamDan() {
  let tmps = JSON.parse(localStorage.getItem('producttmp2'));
  tmps.sort((a, b) => b.price - a.price);
  localStorage.setItem('producttmp2', JSON.stringify(tmps));
  hienthitatcasp();
  sx1.classList.remove('active');
  sx2.classList.remove('active');
  sx3.classList.remove('active');
  sx4.classList.add('active');
}

function sapXepTheoTen() {
  let tmps = JSON.parse(localStorage.getItem('producttmp2'));
  tmps.sort((a, b) => a.name.localeCompare(b.name));
  localStorage.setItem('producttmp2', JSON.stringify(tmps));
  hienthitatcasp();
  sx1.classList.add('active');
  sx2.classList.remove('active');
  sx3.classList.remove('active');
  sx4.classList.remove('active');
}

function sapXepTheoTen1() {
  let tmps = JSON.parse(localStorage.getItem('producttmp2'));
  tmps.sort((a, b) => b.name.localeCompare(a.name));
  localStorage.setItem('producttmp2', JSON.stringify(tmps));
  hienthitatcasp();
  sx1.classList.remove('active');
  sx2.classList.add('active');
  sx3.classList.remove('active');
  sx4.classList.remove('active');
}

function resetSapXep() {
  let tmps = JSON.parse(localStorage.getItem('producttmp'));
  tmps.sort((a, b) => a.productId - b.productId);
  localStorage.setItem('producttmp2', JSON.stringify(tmps));
  document.getElementById('giatu').value = '';
  document.getElementById('giaden').value = '';
  document.getElementById('txtSearch').value = '';
  phanloaitheogia();
  hienthitatcasp();
  sx1.classList.remove('active');
  sx2.classList.remove('active');
  sx3.classList.remove('active');
  sx4.classList.remove('active');
}

//Mảng producttmp lưu dữ liệu ảo sau lọc sản phẩm
//Cần tạo thêm một mảng để lưu dữ liệu sau khi lọc sản phẩm giá từ giá đến và sau đó sẽ săp xếp tiếp theo mảng này
//Ý tưởng: để mảng producttmp làm mảng để sắp xếp cuối cùng, tạo thêm một mảng ảo để lưu dữ liệu sau khi lọc sản phẩm giá từ giá đến