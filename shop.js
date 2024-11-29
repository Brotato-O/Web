
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

  for (let i = startIndex; i < endIndex; i++) {
    s += `
               <div class="product" onclick="show2(${selectArrays[i].productId})">
                    <img src="${selectArrays[i].img}" alt="${selectArrays[i].name}">
                     <h3>${selectArrays[i].name}</h3>
                      <p>${selectArrays[i].price}</p>
                      <button class="addtocart">Thêm vào giỏ hàng</button>
                </div>
            `;
  }

  var totalPages = Math.ceil(selectArrays.length / productsPerPage);
  var pageNumbers = "";

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers += `
                <div class="sotrang" onclick="goToPage(${i})">
                    ${i}
                </div>
            `;
  }
  document.getElementById("search").style.display="none";
  document.getElementById("toan1").innerHTML = `
            <div class="menu-sanpham" id="menu-sanpham1">
                <div class="danhsach-sanpham" id="danhsach-sanpham1">${s}</div>

                <div class="phantrang">
                    ${pageNumbers}
                </div>
                <div id="sanpham-chitiet">
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
function hienthitatcasp(){
  var tmp=JSON.parse(localStorage.getItem('all'));
  var startIndex=(currentPage-1)*productsPerPage;
  var endIndex=startIndex+productsPerPage;
  if(endIndex>tmp.length){
    endIndex=tmp.length;
  }
  var s="";
  for (let i = startIndex; i < endIndex; i++) {
    s += `
                <div class="product" onclick="show2(${tmp[i].productId})">
                    <img src="${tmp[i].img}" alt="${tmp[i].name}">
                     <h3>${tmp[i].name}</h3>
                      <p>${tmp[i].price}</p>
                     
                </div>
            `;
}
var totalPages = Math.ceil(tmp.length / productsPerPage);
var pageNumbers = "";

for (let i = 1; i <= totalPages; i++) {
  pageNumbers += `
              <div class="sotrang" onclick="goToPage(${i})">
                  ${i}
              </div>
          `;
}

document.getElementById("allsp").innerHTML = `
          <div class="menu-sanpham" id="menu-sanpham1">
              <div class="danhsach-sanpham" id="danhsach-sanpham1">${s}</div>

              <div class="phantrang">
                  ${pageNumbers}
              </div>
              <div id="sanpham-chitiet">
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
window.onload = function () {
createProduct();
};

setTimeout(hienthisanpham1, 20); 
setTimeout(hienthitatcasp, 10); 

function search1() {
var productsearch = document.getElementById('txtSearch').value.toLowerCase();
var productArray = JSON.parse(localStorage.getItem('all')); // Lấy danh sách sản phẩm
var s = '';
if (!productsearch) {
document.getElementById("h3tieude").innerText="Tất cả sản phẩm";
hienthitatcasp();
return;
}     // Tìm kiếm cơ bản
for (var i = 0; i < productArray.length; i++) {
  document.getElementById("h3tieude").innerText="Lọc theo sản phẩm";
    if ((productArray[i].name.toLowerCase().search(productsearch)!=-1||productArray[i].brand.toLowerCase().search(productsearch) != -1) && productsearch != '' ) {
          s += `
                              <div class="product" onclick="show2(${productArray[i].productId})">
                                <img src="${productArray[i].img}" alt="${productArray[i].name}">
                                <h3>${productArray[i].name}</h3>
                                  <p>${productArray[i].price}</p>
                                  
                               </div>
                           `;
    }
} 

if (s === '') {
document.getElementById('allsp').innerHTML = '<p>Không tìm thấy sản phẩm nào phù hợp.</p>';
} else {

document.getElementById('allsp').innerHTML = `
                <div class="menu-sanpham" id="menu-sanpham1">
              <div class="danhsach-sanpham" id="danhsach-sanpham1">${s}</div>
              <div id="sanpham-chitiet">
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
// function kiemtrachon(){
//   var pl=document.phanloai.phanloaisp.value;
// var tmp = JSON.parse(localStorage.getItem('all')); // Lấy danh sách sản phẩm
// var s = '';
// var tmp1=[];
//   if (!productsearch) {
// document.getElementById("h3tieude").innerText="Tất cả sản phẩm";
// hienthitatcasp();
// return;
// }
//   if(pl=="Giày cỏ tự nhiên"){
//     for(i=0;i<tmp.length;i++){
//       if((tmp[i].brand=="Giày cỏ tự nhiên")){
//       tmp1.push(tmp[i]);
//       }
//     }
//   }else if(pl=="Giày cỏ nhân tạo"){
//   for(i=0;i<tmp.length;i++){
//       if((tmp[i].brand=="Giày cỏ nhân tạo")){
//       tmp1.push(tmp[i]);
//       }
//     }
//   }else if (pl=="Quần áo"){
//     for(i=0;i<tmp.length;i++){
//       if(tmp[i].brand=="Quần áo"){
//       tmp1.push(tmp[i]);
//       }
//     }
//   }else if (pl=="Phụ kiện"){
//     for(i=0;i<tmp.length;i++){
//       if(tmp[i].brand=="Phụ kiện"){
//       tmp1.push(tmp[i]);
//       }
//     }
//   }else {
//     for(i=0;i<tmp.length;i++){
     
//       tmp1.push(tmp[i]);
      
//     }
//   }
//   for (var i = 0; i < tmp1.length; i++) {
//     document.getElementById("h3tieude").innerText="Lọc theo sản phẩm";
//        {
//             s += `
//                                 <div class="product" onclick="show2(${tmp1[i].productId})">
//                                   <img src="${tmp1[i].img}" alt="${tmp1[i].name}">
//                                   <h3>${tmp1[i].name}</h3>
//                                     <p>${tmp1[i].price.toLocaleString()} VND</p>
//                                     <button class="add-to-cart">Thêm vào giỏ hàng</button>
//                                  </div>
//                              `;
//       }
//   } 
  
//   if (s === '') {
//   document.getElementById('allsp').innerHTML = '<p>Không tìm thấy sản phẩm nào phù hợp.</p>';
//   } else {
  
//   document.getElementById('allsp').innerHTML = `
//                   <div class="menu-sanpham" id="menu-sanpham1">
//                 <div class="danhsach-sanpham" id="danhsach-sanpham1">${s}</div>
//                 <div id="sanpham-chitiet">
//                   <div class="mota-sanpham">
//                     <button type="button" class="exit" onclick="closesp();">x</button>
//                     <div class="mota-trai">
//                       <img id="img-sp" src="1000.jpg" />
//                     </div>
//                     <div class="mota-phai">
//                       <h1 id="name-sp">chua co</h1>
//                       <h6>
//                         <span>
//                           Mã sản phẩm:
//                           <strong id="ma-sp">chua co</strong>
//                         </span>
//                       </h6>
//                       <h4 id="price">chua co </h4>
//                       <div class="line"></div>
//                       <div class="row">
//                         <div class="kichco">
//                           <h4>SIZE</h4>
//                           <select id="size">
//                             <option value="31" selected>31</option>
//                             <option value="32">32</option>
//                             <option value="33">33</option>
//                             <option value="34">34</option>
//                             <option value="35">35</option>
//                             <option value="36">36</option>
//                             <option value="37">37</option>
//                           </select>
//                         </div>
//                         <div class="soluong">
//                           <h4>Số lượng</h4>
//                           <button class="bot" onclick="giamsl()">-</button>
//                           <input type="text" id="sl" value="1">
//                           <button class="them" onclick=tangsl()>+</button>
//                         </div>
//                       </div>
//                       <div style="text-align: center">
//                        <button class="addtocart" onclick="addToCart()">THÊM VÀO GIỎ HÀNG</button>
  
//                       </div>
//                       <div>
//                         <button class="buy">THANH TOÁN</button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//             </div>
//         `;
        
//     }

//   }

function kiemtrachon() {
  var pl = document.phanloai.phanloaisp.value; // Lấy giá trị phân loại
  var tmp = JSON.parse(localStorage.getItem('all')); // Lấy danh sách sản phẩm từ localStorage
  var s = ''; // Chuỗi HTML để hiển thị
  var tmp1 = []; // Mảng chứa sản phẩm sau khi lọc

  // Nếu không chọn phân loại (mặc định "tất cả sản phẩm")
  if (pl === "tatcasp") {
      document.getElementById("h3tieude").innerText = "Tất cả sản phẩm";
      hienthitatcasp();
      return;
  }

  // Lọc sản phẩm theo phân loại
  if (tmp && Array.isArray(tmp)) {
      tmp1 = tmp.filter(product => product.brand === pl);
  }


  for (var i = 0; i < tmp1.length; i++) {
    document.getElementById("h3tieude").innerText="Lọc theo sản phẩm";
       {
            s += `
                                <div class="product" onclick="show2(${tmp1[i].productId})">
                                  <img src="${tmp1[i].img}" alt="${tmp1[i].name}">
                                  <h3>${tmp1[i].name}</h3>
                                    <p>${tmp1[i].price}</p>
                                    <button class="addtocart">Thêm vào giỏ hàng</button>
                                 </div>
                             `;
      }
  } 


  document.getElementById('allsp').innerHTML = `<div class="menu-sanpham" id="menu-sanpham1">
              <div class="danhsach-sanpham" id="danhsach-sanpham1">${s}</div>
              <div id="sanpham-chitiet">
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



