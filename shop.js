

var productArrays = [
    { name: "Zoom Mercurial Vapor 16 Elite AG-PRO Mad Voltage", price: 5700000, img: "img/1000.jpg", productId: 1000,brand:"Giày cỏ tự nhiên" },
    { name: "Zoom Mercurial Vapor 16 Academy MG Shadow", price: 2150000, img: "img/1001.jpg", productId: 1001,brand:"Giày cỏ tự nhiên" },
    { name: "Adidas Copa Gloro II TF", price: 1950000, img: "img/1016.jpg", productId: 1016,brand:"Giày cỏ nhân tạo" },
    { name: "Phantom GX II Academy MG Mad Ambition", price: 2150000, img: "img/1003.jpg", productId: 1003,brand:"Giày cỏ tự nhiên" },
    { name: "Tiempo Legend 10 Elite FG Mad Brilliance", price: 5190000, img: "img/1004.jpg", productId: 1004,brand:"Giày cỏ tự nhiên" },
    { name: "Zoom Mercurial Vapor 16 Academy TF Mbappé Personal Edition", price: 2050000, img: "img/1005.jpg", productId: 1005,brand:"Giày cỏ nhân tạo" },
    { name: "Phantom Luna II Academy TF Mad Ready", price: 1950000, img: "img/1007.jpg", productId: 1007,brand:"Giày cỏ nhân tạo" },
    { name: "Tiempo Legend 10 Pro FG Mad Ambition", price: 3490000, img: "img/1008.jpg", productId: 1008,brand:"Giày cỏ tự nhiên" },
    { name: "Tiempo Legend 10 Elite FG Ready", price: 4390000, img: "img/1009.jpg", productId: 1009,brand:"Giày cỏ tự nhiên" },
    { name: "Zoom Mercurial Superfly 9 Academy MG XXV", price: 1950000, img: "img/1010.jpg", productId: 1010,brand:"Giày cỏ tự nhiên" },
    { name: "Zoom Mercurial Superfly 9 Club TF Mad Ready", price: 1590000, img: "img/1011.jpg", productId: 1011,brand:"Giày cỏ nhân tạo" },
    { name: "React Phantom GX Pro TF Ready", price: 2250000, img: "img/1012.jpg", productId: 1012,brand:"Giày cỏ nhân tạo" },
    { name: "Adidas F50 Elite FG Advancement", price: 3950000, img: "img/1013.jpg", productId: 1013,brand:"Giày cỏ tự nhiên" },
    { name: "Adidas Predator Elite FG Advancement", price: 3950000, img: "img/1014.jpg", productId: 1014,brand:"Giày cỏ tự nhiên" },
    { name: "Adidas Copa Pure 2 Elite FG Advancement", price: 3950000, img: "img/1015.jpg", productId: 1015,brand:"Giày cỏ tự nhiên" },
    { name: "Adidas X Crazyfast .3 FG Marinerush", price: 1690000, img: "img/1018.jpg", productId: 1018,brand:"Giày cỏ nhân tạo" },
    { name: "Adidas Copa Pure .1 FG Crazyrush", price: 2990000, img: "img/1019.jpg", productId: 1019,brand:"Giày cỏ tự nhiên" },
    { name: "Adidas F50 Messi League TF Triunfo Dorado", price: 1890000, img: "img/1020.jpg", productId: 1020,brand:"Giày cỏ nhân tạo" },
    { name: "Adidas Copa Pure 2 League TF Energy Citrus", price: 1690000, img: "img/1021.jpg", productId: 1021 ,brand:"Giày cỏ nhân tạo"},
    { name: "Adidas F50 League TF Advancement", price: 1890000, img: "img/1022.jpg", productId: 1022,brand:"Giày cỏ nhân tạo" },
    { name: "Adidas Copa Gloro TF", price: 1850000, img: "img/1023.jpg", productId: 1023,brand:"Giày cỏ nhân tạo" },
    { name: "Adidas Predator League L TF", price: 1690000, img: "img/1024.jpg", productId: 1024,brand:"Giày cỏ nhân tạo" },
    { name: "Adidas Predator Accuracy .4 TF Crazyrush", price: 1190000, img: "img/1025.jpg", productId: 1025,brand:"Giày cỏ nhân tạo" },
    { name: "Adidas Copa Pure 2 Elite TF Solar Energy", price: 2350000, img: "img/1018.jpg", productId: 1018,brand:"Giày cỏ nhân tạo" },
    { name: "PUMA Ultra 5 Pro FG/AG Formula", price: 3190000, img: "img/1026.jpg", productId: 1026 ,brand:"Giày cỏ tự nhiên"},
    { name: "PUMA Future 7 Pro FG/AG Formula", price: 3190000, img: "img/1027.jpg", productId: 1027 ,brand:"Giày cỏ tự nhiên"},
    { name: "PUMA Future Ultimate FG/AG Voltage", price: 3490000, img: "img/1028.jpg", productId: 1028,brand:"Giày cỏ tự nhiên" },
    { name: "PUMA Ultra Ultimate FG/AG Gear Up", price: 3190000, img: "img/1029.jpg", productId: 1029 ,brand:"Giày cỏ tự nhiên"},
    { name: "PUMA Future Ultimate FG/AG Gear Up", price: 3190000, img: "img/1030.jpg", productId: 1030,brand:"Giày cỏ tự nhiên" },
    { name: "PUMA Future Ultimate FG/AG Breakthrough", price: 3490000, img: "img/1031.jpg", productId: 1031 ,brand:"Giày cỏ tự nhiên"},
    { name: "PUMA Future 7 Match TT Vol. Up", price: 2030000, img: "img/1032.jpg", productId: 1032,brand:"Giày cỏ nhân tạo" },
    { name: "PUMA Ultra 5 Pro Cage TT Formula", price: 2789000, img: "img/1033.jpg", productId: 1033 ,brand:"Giày cỏ nhân tạo"},
    { name: "PUMA Future 7 Pro Cage TT Formula", price: 2789000, img: "img/1034.jpg", productId: 1034,brand:"Giày cỏ nhân tạo" },
    { name: "PUMA Ultra Ultimate Cage TT Breakthrough", price: 1950000, img: "img/1035.jpg", productId: 1035 ,brand:"Giày cỏ nhân tạo"},
    { name: "PUMA Future 1.4 Pro Cage TT Fastest", price: 1790000, img: "img/1036.jpg", productId: 1036,brand:"Giày cỏ nhân tạo" },
    { name: "PUMA Ultra 1.4 Pro Cage TT Instinct", price: 1550000, img: "img/1037.jpg", productId: 1037 ,brand:"Giày cỏ nhân tạo"}
      ];
        var productArray1 = [
          {name: "Găng Tay Thủ Môn Tập Luyện Predator",price: 800000,img: "img/1040.jpg",productId:1040,},
          {name: "Bóng UCL League 24/25 League Phase",price: 950000,img: "img/1041.jpg",productId:1041,},
          {name: "Bóng UCL Training 24/25 League Phase",price: 650000,img: "img/1042.jpg",productId:1042,},
          {name: "Bóng UCL Pro 24/25 League Phase",price: 3300000,img: "img/1043.jpg",productId:1043,},
          {name: "Mũ Bóng Chày Sân Nhà Manchester United",price: 500000,img: "img/1044.jpg",productId:1044,},
          {name: "Bóng CLB Sân Nhà Manchester United",price: 600000,img: "img/1045.jpg",productId:1045,},
          {name: "Ba Lô Sân Nhà Manchester United",price: 900000,img: "img/1046.jpg",productId:1046,},
          {name: "Tất Sân Nhà Manchester United",price: 450000,img: "img/1047.jpg",productId:1047,},
          {name: "Ba Lô Sân Nhà Arsenal",price: 900000,img: "img/1048.jpg",productId:1048,},
          {name: "Bóng Messi Club",price: 600000,img: "img/1049.jpg",productId:1049,},
          {name: "Tất Sân Nhà Real Madrid 24/25",price: 450000,img: "img/1050.jpg",productId:1050,},
          {name: "Bóng Starlancer Club",price: 400000,img: "img/1051.jpg",productId:1051,},
          {name: "Bóng Tập Luyện Predator",price: 650000,img: "img/1052.jpg",productId:1052,},
          {name: "Bóng Starlancer Club",price: 400000,img: "img/1053.jpg",productId:1053,},
          {name: "Bóng Mini Starlancer",price: 300000,img: "img/1054.jpg",productId:1054,},
          {name: "ADI 24 SOCK",price: 350000,img: "img/1055.jpg",productId:1055,},
          {name: "Tất Sân Nhà Arsenal 24/25",price: 450000,img: "img/1056.jpg",productId:1056,},
          {name: "Tất Sân Nhà Đội Tuyển Italy 24",price: 450000,img: "img/1057.jpg",productId:1057,},
          {name: "Ốp Bảo Vệ Ống Chân Tiro Club",price: 300000,img: "img/1059.jpg",productId:1059,},
          {name: "Ốp Bảo Vệ Ống Chân Thi Đấu Tiro",price: 500000,img: "img/1060.jpg",productId:1060,},
          {name: "Bóng Tập Luyện Foil Fussballliebe",price: 700000,img: "img/1061.jpg",productId:1061,},
          {name: "Tất Sân Nhà Real Madrid 23/24",price: 450000,img: "img/1062.jpg",productId:1062,},
          {name: "Tất adi 23",price: 350000,img: "img/1063.jpg",productId:1063,},
          {name: "Bóng EPP Club",price: 400000,img: "img/1064.jpg",productId:1064,},
          {name: "Túi Đựng Giày Tiro League",price: 450000,img: "img/1065.jpg",productId:1065,},
          {name: "Tất Milano 23",price: 300000,img: "img/1066.jpg",productId:1066,},
          {name: "Tất Milano 23",price: 300000,img: "img/1067.jpg",productId:1067,},
          {name: "Bóng Club EPP",price: 400000,img: "img/1068.jpg",productId:1068,}, 
          {name: "Bóng Thi Đấu Tiro",price: 1000000,img: "img/1069.jpg",productId:1069,}
        ];
        var productArray2 = [
          {name: "Áo Thun 3 Sọc Adicolor Classics Real Madrid",price: 1100000,img: "img/1070.jpg",productId:1070,}, 
          {name: "Áo Jersey David Beckham Originals",price: 1800000,img: "img/1071.jpg",productId:1071,}, 
          {name: "DB OG 3S TEE",price: 1100000,img: "img/1072.jpg",productId:1072,}, 
          {name: "DB 3S SHO",price: 1100000,img: "img/1073.jpg",productId:1073,}, 
          {name: "DB OG TT",price: 2500000,img: "img/1074.jpg",productId:1074,}, 
          {name: "Áo Thun Originals Real Madrid",price: 1000000,img: "img/1075.jpg",productId:1075,}, 
          {name: "Áo Đấu Thứ Ba Manchester United 24/25",price: 2200000,img: "img/1076.jpg",productId:1076,}, 
          {name: "Áo Đấu Thứ Ba FC Bayern 24/25",price: 2200000,img: "img/1077.jpg",productId:1077,}, 
          {name: "Áo Đấu Thứ Ba Arsenal 24/25",price: 2200000,img: "img/1078.jpg",productId:1078,}, 
          {name: "Áo Đấu Thứ Ba Real Madrid 24/25",price: 2200000,img: "img/1079.jpg",productId:1079,}, 
          {name: "Áo Đấu Thứ Ba Juventus 24/25",price: 2200000,img: "img/1080.jpg",productId:1080,}, 
          {name: "Áo Thun Originals Manchester United",price: 1000000,img: "img/1081.jpg",productId:1081,}, 
          {name: "Quần Track Pant Manchester United Originals",price: 1700000,img: "img/1082.jpg",productId:1082,}, 
          {name: "Áo Đấu Thứ Ba Arsenal Trẻ Em 24/25",price: 1500000,img: "img/1083.jpg",productId:1083,}, 
          {name: "Quần Short Thứ Ba Arsenal 24/25",price: 1100000,img: "img/1084.jpg",productId:1084,}, 
          {name: "Quần Short Thứ Ba Manchester United 24/25",price: 1500000,img: "img/1085.jpg",productId:1085,}, 
          {name: "Áo Đấu Sân Khách Juventus 24/25",price: 2200000,img: "img/1086.jpg",productId:1086,}, 
          {name: "Áo Đấu Sân Khách Manchester United 24/25",price: 2200000,img: "img/1087.jpg",productId:1087,}, 
          {name: "Áo Đấu Sân Khách Real Madrid 24/25",price: 2200000,img: "img/1088.jpg",productId:1088,}, 
          {name: "Áo Đấu Sân Khách Arsenal 24/25 Trẻ Em",price: 1500000,img: "img/1089.jpg",productId:1089,}, 
          {name: "Áo Jersey Trước Trận Arsenal",price: 1500000,img: "img/1090.jpg",productId:1090,}, 
          {name: "Áo Đấu Sân Khách FC Bayern 24/25",price: 2200000,img: "img/1091.jpg",productId:1091,}, 
          {name: "Áo Đấu Sân Nhà Juventus 24/25",price: 2200000,img: "img/1092.jpg",productId:1092,}, 
          {name: "Quần Short Sân Nhà Manchester United 24/25",price: 1100000,img: "img/1093.jpg",productId:1093,}, 
          {name: "Áo Jersey Tập Luyện Messi",price: 800000,img: "img/1094.jpg",productId:1094,}, 
          {name: "Áo Jersey Tập Luyện Arsenal Tiro 24",price: 1100000,img: "img/1095.jpg",productId:1095,}, 
          {name: "Áo Đấu Sân Nhà Newcastle United FC 24/25",price: 2200000,img: "img/1096.jpg",productId:1096,},
          {name: "Áo Khoác Đồng Phục Real Madrid",price: 2500000,img: "img/1097.jpg",productId:1097,}, 
          {name: "Quần Short Sân Nhà Real Madrid 24/25",price: 1100000,img: "img/1098.jpg",productId:1098,}, 
          {name: "Áo Đấu Sân Nhà Real Madrid 24/25",price: 2200000,img: "img/1099.jpg",productId:1099,},
        ];
        const combinedArray = [...productArrays, ...productArray1, ...productArray2];
        localStorage.setItem("shoes", JSON.stringify(productArrays));
        localStorage.setItem("clothing", JSON.stringify(productArray1));
        localStorage.setItem("Accessories", JSON.stringify(productArray2));
        localStorage.setItem("all", JSON.stringify(combinedArray));

        var currentPage = 1;
        const productsPerPage = 12;

        function currency(value) { return value.toLocaleString('vi-VN'); }

        function closesp() {
            document.getElementById("sanpham-chitiet").style.display = "none";
            hienthisanpham1();
            phanloaigiay();
            
            
          }

        function hienthisanpham1(){
            var url=window.location.href;
            var bien=url.split("?")[1];
            var selectArrays=getProductArray(bien)
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
                        <div class="sanpham3" onclick="show2(${selectArrays[i].productId})">
                            <img src="${selectArrays[i].img}" />
                            <h3>${selectArrays[i].name}</h3>
                            <h3>${selectArrays[i].price.toLocaleString()} VND</h3>
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
                              <div>
                               <button class="addtocart" onclick="addToCart()">THÊM VÀO GIỎ HÀNG</button>

                              </div>
                              <div>
                                <button class="buy">THANH TOÁN</button>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                `;
                  }

         function getProductArray(category) {
              switch (category) {
                case "shoes":
                  return productArrays;
                case "phukien":
                  return productArray1;
                case "quanao":
                  return productArray2;
                default:
            return []; 
              }
            }
  
        function giamsl(){
              if(document.getElementById("sl").value>1){
                document.getElementById("sl").value--;
              }
            }
        function tangsl(){
              document.getElementById("sl").value++;
            }
          function phanloaigiay(){
            var url=window.location.href;
            var bien1=url.split("?")[1];
            var temp=[];
            if(bien1=="giaytn"){
              var s="";
              for(i=0;i<productArrays.length;i++){
                   if(productArrays[i].brand=="Giày cỏ tự nhiên"){
                   temp.push(productArrays[i]);
                   }
              }
              var selectArrays=temp;
              var startIndex=(currentPage-1)*productsPerPage;
              var endIndex=startIndex+productsPerPage;
              if (endIndex > selectArrays.length) {
                endIndex = selectArrays.length;
              }
              for (let i = startIndex; i < endIndex; i++) {
                s += `
                            <div class="sanpham3" onclick="show2(${selectArrays[i].productId})" >
                                <img src="${selectArrays[i].img}" />
                                <h3>${selectArrays[i].name}</h3>
                                <h3>${selectArrays[i].price} VND</h3>
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
                                <div>
                                 <button class="addtocart" onclick="addToCart()">THÊM VÀO GIỎ HÀNG</button>
  
                                </div>
                                <div>
                                  <button class="buy">THANH TOÁN</button>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                  `;
                    
            }else if(bien1=="giaynt"){
              var s="";
              for(i=0;i<productArrays.length;i++){
                   if(productArrays[i].brand=="Giày cỏ nhân tạo"){
                   temp.push(productArrays[i]);
                   }
              }
              var selectArrays=temp;
              var startIndex=(currentPage-1)*productsPerPage;
              var endIndex=startIndex+productsPerPage;
              if (endIndex > selectArrays.length) {
                endIndex = selectArrays.length;
              }
              for (let i = startIndex; i < endIndex; i++) {
                s += `
                            <div class="sanpham3" onclick="show2(${selectArrays[i].productId})" >
                                <img src="${selectArrays[i].img}" />
                                <h3>${selectArrays[i].name}</h3>
                                <h3>${selectArrays[i].price.toLocaleString()} VND</h3>
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
                                <div>
                                 <button class="addtocart" onclick="addToCart()">THÊM VÀO GIỎ HÀNG</button>
  
                                </div>
                                <div>
                                  <button class="buy">THANH TOÁN</button>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                  `;

            }

          }
          function show2(ID) {
           
            var product = combinedArray.find(item => item.productId == ID);
            if (product) {
                
                document.getElementById("img-sp").src = product.img;
                document.getElementById("name-sp").innerHTML = product.name;
                document.getElementById("ma-sp").innerHTML = `${product.productId || "N/A"}`;
                document.getElementById("price").innerHTML = `${product.price.toLocaleString()} VND`;
                document.getElementById("sanpham-chitiet").style.display = "block";
            } else {
                console.error("Sản phẩm không tồn tại!");
            }
        }
        function hienthitatcasp(){
          var tmp=combinedArray;
          var startIndex=(currentPage-1)*productsPerPage;
          var endIndex=startIndex+productsPerPage;
          if(endIndex>tmp.length){
            endIndex=tmp.length;
          }
          var s="";
          for (let i = startIndex; i < endIndex; i++) {
            s += `
                        <div class="sanpham3" onclick="show2(${tmp[i].productId})">
                            <img src="${tmp[i].img}" />
                            <h3>${tmp[i].name}</h3>
                            <h3>${tmp[i].price.toLocaleString()} VND</h3>
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
                   <h3 style="font-size:26px;">Tất cả sản phẩm</h3>
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
                            <div>
                             <button class="addtocart" onclick="addToCart()">THÊM VÀO GIỎ HÀNG</button>

                            </div>
                            <div>
                              <button class="buy">THANH TOÁN</button>
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
        phanloaigiay();
        hienthitatcasp();
      }
      window.onload = function () {
        hienthisanpham1();
    };
    
    setTimeout(phanloaigiay, 30); 
    setTimeout(hienthitatcasp, 20); 
   


      
