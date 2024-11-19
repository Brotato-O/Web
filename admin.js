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
          {name: "Găng Tay Thủ Môn Tập Luyện Predator",price: 800000,img: "img/1040.jpg",productId:1040,brand:"Phụ kiện"},
          {name: "Bóng UCL League 24/25 League Phase",price: 950000,img: "img/1041.jpg",productId:1041,brand:"Phụ kiện"},
          {name: "Bóng UCL Training 24/25 League Phase",price: 650000,img: "img/1042.jpg",productId:1042,brand:"Phụ kiện"},
          {name: "Bóng UCL Pro 24/25 League Phase",price: 3300000,img: "img/1043.jpg",productId:1043,brand:"Phụ kiện"},
          {name: "Mũ Bóng Chày Sân Nhà Manchester United",price: 500000,img: "img/1044.jpg",productId:1044,brand:"Phụ kiện"},
          {name: "Bóng CLB Sân Nhà Manchester United",price: 600000,img: "img/1045.jpg",productId:1045,brand:"Phụ kiện"},
          {name: "Ba Lô Sân Nhà Manchester United",price: 900000,img: "img/1046.jpg",productId:1046,brand:"Phụ kiện"},
          {name: "Tất Sân Nhà Manchester United",price: 450000,img: "img/1047.jpg",productId:1047,brand:"Phụ kiện"},
          {name: "Ba Lô Sân Nhà Arsenal",price: 900000,img: "img/1048.jpg",productId:1048,brand:"Phụ kiện"},
          {name: "Bóng Messi Club",price: 600000,img: "img/1049.jpg",productId:1049,brand:"Phụ kiện"},
          {name: "Tất Sân Nhà Real Madrid 24/25",price: 450000,img: "img/1050.jpg",productId:1050,brand:"Phụ kiện"},
          {name: "Bóng Starlancer Club",price: 400000,img: "img/1051.jpg",productId:1051,brand:"Phụ kiện"},
          {name: "Bóng Tập Luyện Predator",price: 650000,img: "img/1052.jpg",productId:1052,brand:"Phụ kiện"},
          {name: "Bóng Starlancer Club",price: 400000,img: "img/1053.jpg",productId:1053,brand:"Phụ kiện"},
          {name: "Bóng Mini Starlancer",price: 300000,img: "img/1054.jpg",productId:1054,brand:"Phụ kiện"},
          {name: "ADI 24 SOCK",price: 350000,img: "img/1055.jpg",productId:1055,brand:"Phụ kiện"},
          {name: "Tất Sân Nhà Arsenal 24/25",price: 450000,img: "img/1056.jpg",productId:1056,brand:"Phụ kiện"},
          {name: "Tất Sân Nhà Đội Tuyển Italy 24",price: 450000,img: "img/1057.jpg",productId:1057,brand:"Phụ kiện"},
          {name: "Ốp Bảo Vệ Ống Chân Tiro Club",price: 300000,img: "img/1059.jpg",productId:1059,brand:"Phụ kiện"},
          {name: "Ốp Bảo Vệ Ống Chân Thi Đấu Tiro",price: 500000,img: "img/1060.jpg",productId:1060,brand:"Phụ kiện"},
          {name: "Bóng Tập Luyện Foil Fussballliebe",price: 700000,img: "img/1061.jpg",productId:1061,brand:"Phụ kiện"},
          {name: "Tất Sân Nhà Real Madrid 23/24",price: 450000,img: "img/1062.jpg",productId:1062,brand:"Phụ kiện"},
          {name: "Tất adi 23",price: 350000,img: "img/1063.jpg",productId:1063,brand:"Phụ kiện"},
          {name: "Bóng EPP Club",price: 400000,img: "img/1064.jpg",productId:1064,brand:"Phụ kiện"},
          {name: "Túi Đựng Giày Tiro League",price: 450000,img: "img/1065.jpg",productId:1065,brand:"Phụ kiện"},
          {name: "Tất Milano 23",price: 300000,img: "img/1066.jpg",productId:1066,brand:"Phụ kiện"},
          {name: "Tất Milano 23",price: 300000,img: "img/1067.jpg",productId:1067,brand:"Phụ kiện"},
          {name: "Bóng Club EPP",price: 400000,img: "img/1068.jpg",productId:1068,brand:"Phụ kiện"}, 
          {name: "Bóng Thi Đấu Tiro",price: 1000000,img: "img/1069.jpg",productId:1069,brand:"Phụ kiện"}
        ];
        var productArray2 = [
          {name: "Áo Thun 3 Sọc Adicolor Classics Real Madrid",price: 1100000,img: "img/1070.jpg",productId:1070,brand:"Quần áo"}, 
          {name: "Áo Jersey David Beckham Originals",price: 1800000,img: "img/1071.jpg",productId:1071,brand:"Quần áo"}, 
          {name: "DB OG 3S TEE",price: 1100000,img: "img/1072.jpg",productId:1072,brand:"Quần áo"}, 
          {name: "DB 3S SHO",price: 1100000,img: "img/1073.jpg",productId:1073,brand:"Quần áo"}, 
          {name: "DB OG TT",price: 2500000,img: "img/1074.jpg",productId:1074,brand:"Quần áo"}, 
          {name: "Áo Thun Originals Real Madrid",price: 1000000,img: "img/1075.jpg",productId:1075,brand:"Quần áo"}, 
          {name: "Áo Đấu Thứ Ba Manchester United 24/25",price: 2200000,img: "img/1076.jpg",productId:1076,brand:"Quần áo"}, 
          {name: "Áo Đấu Thứ Ba FC Bayern 24/25",price: 2200000,img: "img/1077.jpg",productId:1077,brand:"Quần áo"}, 
          {name: "Áo Đấu Thứ Ba Arsenal 24/25",price: 2200000,img: "img/1078.jpg",productId:1078,brand:"Quần áo"}, 
          {name: "Áo Đấu Thứ Ba Real Madrid 24/25",price: 2200000,img: "img/1079.jpg",productId:1079,brand:"Quần áo"}, 
          {name: "Áo Đấu Thứ Ba Juventus 24/25",price: 2200000,img: "img/1080.jpg",productId:1080,brand:"Quần áo"}, 
          {name: "Áo Thun Originals Manchester United",price: 1000000,img: "img/1081.jpg",productId:1081,brand:"Quần áo"}, 
          {name: "Quần Track Pant Manchester United Originals",price: 1700000,img: "img/1082.jpg",productId:1082,brand:"Quần áo"}, 
          {name: "Áo Đấu Thứ Ba Arsenal Trẻ Em 24/25",price: 1500000,img: "img/1083.jpg",productId:1083,brand:"Quần áo"}, 
          {name: "Quần Short Thứ Ba Arsenal 24/25",price: 1100000,img: "img/1084.jpg",productId:1084,brand:"Quần áo"}, 
          {name: "Quần Short Thứ Ba Manchester United 24/25",price: 1500000,img: "img/1085.jpg",productId:1085,brand:"Quần áo"}, 
          {name: "Áo Đấu Sân Khách Juventus 24/25",price: 2200000,img: "img/1086.jpg",productId:1086,brand:"Quần áo"}, 
          {name: "Áo Đấu Sân Khách Manchester United 24/25",price: 2200000,img: "img/1087.jpg",productId:1087,brand:"Quần áo"}, 
          {name: "Áo Đấu Sân Khách Real Madrid 24/25",price: 2200000,img: "img/1088.jpg",productId:1088,brand:"Quần áo"}, 
          {name: "Áo Đấu Sân Khách Arsenal 24/25 Trẻ Em",price: 1500000,img: "img/1089.jpg",productId:1089,brand:"Quần áo"}, 
          {name: "Áo Jersey Trước Trận Arsenal",price: 1500000,img: "img/1090.jpg",productId:1090,brand:"Quần áo"}, 
          {name: "Áo Đấu Sân Khách FC Bayern 24/25",price: 2200000,img: "img/1091.jpg",productId:1091,brand:"Quần áo"}, 
          {name: "Áo Đấu Sân Nhà Juventus 24/25",price: 2200000,img: "img/1092.jpg",productId:1092,brand:"Quần áo"}, 
          {name: "Quần Short Sân Nhà Manchester United 24/25",price: 1100000,img: "img/1093.jpg",productId:1093,brand:"Quần áo"}, 
          {name: "Áo Jersey Tập Luyện Messi",price: 800000,img: "img/1094.jpg",productId:1094,brand:"Quần áo"}, 
          {name: "Áo Jersey Tập Luyện Arsenal Tiro 24",price: 1100000,img: "img/1095.jpg",productId:1095,brand:"Quần áo"}, 
          {name: "Áo Đấu Sân Nhà Newcastle United FC 24/25",price: 2200000,img: "img/1096.jpg",productId:1096,brand:"Quần áo"},
          {name: "Áo Khoác Đồng Phục Real Madrid",price: 2500000,img: "img/1097.jpg",productId:1097,brand:"Quần áo"}, 
          {name: "Quần Short Sân Nhà Real Madrid 24/25",price: 1100000,img: "img/1098.jpg",productId:1098,brand:"Quần áo"}, 
          {name: "Áo Đấu Sân Nhà Real Madrid 24/25",price: 2200000,img: "img/1099.jpg",productId:1099,brand:"Quần áo"},
        ];
        const combinedArray = [...productArrays, ...productArray1, ...productArray2];
        var currentPage = 1;
        const productsPerPage = 12;
        function currency(value) { return value.toLocaleString('vi-VN'); }
function hienthitatcasp1(){
    var startIndex=(currentPage-1)*productsPerPage;
    var endIndex=startIndex+productsPerPage;
    if(endIndex>combinedArray.length){
      endIndex=combinedArray.length;
    }
    var s="";
    for (let i = startIndex; i < endIndex; i++) {
      s += `
        <div class="cot1" style="border-left: 10px gold solid; border-bottom:2px groove ;">${combinedArray[i].productId}</div>
        <div class="cot1"><img src="${combinedArray[i].img}" alt="" /></div>
        <div class="cot1">${combinedArray[i].name}</div>
        <div class="cot1">${combinedArray[i].brand}</div>
        <div class="cot1">${combinedArray[i].price.toLocaleString()} VND</div>
        <div class="cotchinhsua">
          <div class="button" style="background-color: rgb(213, 75, 0);" >
              x
          </div>
          <div class="button" style="background-color: rgba(196, 196, 20, 0.81)" >
              sửa
          </div>
        </div>
              `;
  }
  var totalPages = Math.ceil(combinedArray.length / productsPerPage);
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
  window.onload = function () {
    hienthitatcasp1();
};
function showmenu() {
    document.getElementById("hai").style.display = "block";
}

function closemenu() {
    document.getElementById("hai").style.display = "none";
}
