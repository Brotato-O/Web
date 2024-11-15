window.onload = function () {
  CreateProductFS();
  CreateProductNew();
};

// start banner

var imgs = document.querySelectorAll("#list-banner > img");
var dots = document.querySelectorAll("#list-dots > li");
var listImg = document.querySelector("#list-banner"); //Toàn bộ cái banner
var widthImg = imgs[0].offsetWidth;
var indexBanner = 0;

Banner();
function Banner() {
  var btnLeft_banner = document.querySelector("#banner .btn-left");
  var btnRight_banner = document.querySelector("#banner .btn-right");

  var changeSlide = setInterval(ClickNext, 3000);

  btnRight_banner.addEventListener("click", () => {
    clearInterval(changeSlide); //clear để xóa bỏ hiệu ứng của setInterval
    ClickNext();
    changeSlide = setInterval(ClickNext, 3000); //Cài đặt lại
  });

  btnLeft_banner.addEventListener("click", () => {
    clearInterval(changeSlide);
    dots[indexBanner].classList.remove("active");
    if (indexBanner == 0) indexBanner = imgs.length - 1;
    else indexBanner--;
    dots[indexBanner].classList.add("active");
    listImg.style.transform = "translateX(" + -widthImg * indexBanner + "px)";
    changeSlide = setInterval(ClickNext, 3000);
  });
}
//Hàm click btn next
function ClickNext() {
  dots[indexBanner].classList.remove("active"); //Loại bỏ active trước khi index tăng
  if (indexBanner == imgs.length - 1) indexBanner = 0;
  else indexBanner++;
  dots[indexBanner].classList.add("active"); //Gán lại khi tăng
  listImg.style.transform = "translateX(" + -widthImg * indexBanner + "px)";
}

// } Sẽ phat triển thâm phần nhấn các dot thì nó sẽ dịch chuyển tới img tương ứng

// end banner

//start countdown
CountDown();
function CountDown() {
  var day = document.getElementById("days");
  var hour = document.getElementById("hours");
  var minute = document.getElementById("minutes");
  var second = document.getElementById("seconds");
  //Tính tổng số giây
  var distance =
    Number(day.innerText) * 24 * 60 * 60 +
    Number(hour.innerText) * 60 * 60 +
    Number(minute.innerText) * 60 +
    Number(second.innerText);
  var countdown = setInterval(() => {
    // Tính toán lại các đơn vị ngày, giờ, phút, giây
    if (distance <= 0) {
      clearInterval(countdown);
    }
    var days = Math.floor(distance / (24 * 60 * 60));
    var hours = Math.floor((distance % (24 * 60 * 60)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / 60);
    var seconds = distance % 60;

    day.innerText = days;
    hour.innerText = hours;
    minute.innerText = minutes;
    second.innerText = seconds;

    distance--;
  }, 1000);
}
//end countdown

//End click btn list product sale

function CreateProductFS() {
  if (localStorage.getItem("productFlashSell") === null) {
    var product = [
      {
        id: 1,
        sale: "-16%",
        image: "/image-product/productFlashSale1.png",
        name: "Nike Diamond Turf 96 TD",
        price: "$220",
      },
      {
        id: 2,
        sale: "-16%",
        image: "/image-product/productFlashSale2.png",
        name: "Nike Force Savage Pro 2",
        price: "$100",
      },
      {
        id: 3,
        sale: "-16%",
        image: "/image-product/productFlashSale3.png",
        name: "Nike Vapor Edge 360 Untouchable",
        price: "$180",
      },
      {
        id: 4,
        sale: "-16%",
        image: "/image-product/productFlashSale4.png",
        name: "Nike Vapor Edge Pro 360 2",
        price: "$135",
      },
      {
        id: 5,
        sale: "-16%",
        image: "/image-product/productFlashSale5.png",
        name: "Nike Vapor Edge Pro 2 Ja Marr Chase",
        price: "$145",
      },
      {
        id: 6,
        sale: "-16%",
        image: "/image-product/productFlashSale2.png",
        name: "Nike Force Savage Pro 2",
        price: "$110",
      },
      {
        id: 7,
        sale: "-16%",
        image: "/image-product/productFlashSale7.png",
        name: "Nike Mercurial Vapor 16 Elite",
        price: "$260",
      },
      {
        id: 8,
        sale: "-16%",
        image: "/image-product/productFlashSale8.png",
        name: "Nike Mercurial Superfly 10 Elite",
        price: "$285",
      },
    ];
    localStorage.setItem("productFlashSell", JSON.stringify(product));
  }
}
ShowProductFlashSell();
function ShowProductFlashSell() {
  var productFlashSellArray = JSON.parse(
    localStorage.getItem("productFlashSell")
  );
  var kq = "";
  for (let i = 0; i < productFlashSellArray.length; i++) {
    kq +=
      `
        <div class="product-card">
          <span><i class="bx bxs-heart-circle"></i></span>
          <span class="sale">` +
      productFlashSellArray[i].sale +
      `</span>
          <div class="img">
            <img src="` +
      productFlashSellArray[i].image +
      `" alt="` +
      productFlashSellArray[i].name +
      `" />
          </div>
          <div class="name-product">` +
      productFlashSellArray[i].name +
      `</div>
          <span class="price">` +
      productFlashSellArray[i].price +
      `</span>
        </div>`;
  }
  document.querySelector("#list-flash-sell").innerHTML = kq;
  SetProduct(); // Hàm sử lí tất cả sự kiện
}

var indexProduct = 0;
function SetProduct() {
  var btnRight_product = document.querySelector("#flash-sell .btn-right");
  var btnLeft_product = document.querySelector("#flash-sell .btn-left");
  var listProduct = document.querySelector("#list-flash-sell");
  var listProductCard = document.querySelectorAll(
    "#list-flash-sell .product-card"
  );
  var listHeartProduct = document.querySelectorAll(".product-card span i");
  var widthProduct =
    listProductCard[0].offsetWidth +
    parseFloat(getComputedStyle(listProductCard[0]).marginRight) +
    parseFloat(getComputedStyle(listProductCard[0]).marginLeft);

  btnRight_product.addEventListener("click", () =>
    ClickBtnRight(listProduct, listProductCard, widthProduct)
  );
  btnLeft_product.addEventListener("click", () =>
    ClickBtnLeft(listProduct, widthProduct)
  );
  ClickHeart(listHeartProduct);
  CalSale(listProductCard);
}

function CalSale(listProductCard) {
  listProductCard.forEach((card) => {
    var saleElement = card.querySelector(".sale");
    var priceElement = card.querySelector(".price");

    if (saleElement && priceElement) {
      var priceSale = Number(saleElement.innerHTML.replace("%", "").trim());
      var priceOld = Number(priceElement.innerHTML.replace("$", "").trim());

      var priceNew = (priceOld * (1 - priceSale / 100)).toFixed(2);

      priceElement.style.textDecoration = "line-through";
      priceElement.style.color = "grey";

      //Tạo phần tử mới
      var ePriceSale = document.createElement("span");
      ePriceSale.innerHTML = "$" + priceNew;
      ePriceSale.style.color = "red";
      ePriceSale.style.fontSize = "25px";
      ePriceSale.style.fontWeight = "bold";
      //Thêm phần tử vào card
      card.appendChild(ePriceSale);
    }
  });
}

function ClickHeart(listHeartProduct) {
  listHeartProduct.forEach((heartIcon) => {
    heartIcon.addEventListener("click", function () {
      if (heartIcon.style.color === "red") heartIcon.style.color = "black";
      else heartIcon.style.color = "red";
    });
  });
}

function ClickBtnRight(listProduct, listProductCard, widthProduct) {
  if (indexProduct < listProductCard.length - 4) {
    indexProduct++;
    listProduct.style.transform =
      "translateX(" + -widthProduct * indexProduct + "px)";
    console.log("Right button clicked:", indexProduct);
  }
}

function ClickBtnLeft(listProduct, widthProduct) {
  if (indexProduct > 0) {
    indexProduct--;
    listProduct.style.transform =
      "translateX(" + -widthProduct * indexProduct + "px)";
  }
}

function CreateProductNew() {
  var product = [
    {
      id: 1,
      image: "/image-product-new/productNew1.png",
      name: "Nike Superfly 10 Elite Mercurial Dream Speed",
      price: "$295",
    },
    {
      id: 2,
      image: "/image-product-new/productNew2.png",
      name: "Nike Tiempo Legend 10 Elite",
      price: "$240",
    },
    {
      id: 3,
      image: "/image-product-new/productNew3.png",
      name: "Nike Superfly 9 Elite Mercurial Dream Speed",
      price: "$295",
    },
    {
      id: 4,
      image: "/image-product-new/productNew4.png",
      name: "Nike Phantom GX Elite",
      price: "$260",
    },
    {
      id: 5,
      image: "/image-product-new/productNew5.png",
      name: "Nike Tiempo Legend 10 Academy",
      price: "$85",
    },
    {
      id: 6,
      image: "/image-product-new/productNew6.png",
      name: "Nike Phantom GX 2 Academy EasyOn Electric",
      price: "$90",
    },
    {
      id: 7,
      image: "/image-product-new/productNew7.png",
      name: "Nike Phantom Luna 2 Academy",
      price: "$95",
    },
    {
      id: 8,
      image: "/image-product-new/productNew8.png",
      name: "Nike Tiempo Emerald Legend 10 Academy",
      price: "$90",
    },
  ];
  localStorage.setItem("productNew", JSON.stringify(product));
}
ShowProductNew();
function ShowProductNew() {
  var productNewArray = JSON.parse(localStorage.getItem("productNew"));
  var kq = "";
  for (let i = 0; i < productNewArray.length; i++) {
    kq +=
      `
        <div class="product-card">
          <span><i class="bx bxs-heart-circle"></i></span>
          <div class="img">
            <img src="` +
      productNewArray[i].image +
      `" alt="` +
      productNewArray[i].name +
      `" />
          </div>
          <div class="name-product">` +
      productNewArray[i].name +
      `</div>
          <span class="price">` +
      productNewArray[i].price +
      `</span>
        </div>`;
  }
  document.querySelector("#list-new").innerHTML = kq;
  SetProductNew();
}
function SetProductNew() {
  var btnRight_product_New = document.querySelector("#new .btn-right");
  var btnLeft_product_New = document.querySelector("#new .btn-left");
  var listProduct_New = document.querySelector("#list-new");
  var listProductCard_New = document.querySelectorAll(
    "#list-new .product-card"
  );
  var listHeartProduct_New = document.querySelectorAll(".product-card span i");
  var widthProduct_New =
    listProductCard_New[0].offsetWidth +
    parseFloat(getComputedStyle(listProductCard_New[0]).marginRight) +
    parseFloat(getComputedStyle(listProductCard_New[0]).marginLeft);
  btnRight_product_New.addEventListener("click", () =>
    ClickBtnRight(listProduct_New, listProductCard_New, widthProduct_New)
  );
  btnLeft_product_New.addEventListener("click", () =>
    ClickBtnLeft(listProduct_New, widthProduct_New)
  );
  ClickHeart(listHeartProduct_New);
}
// FORM đăng kí đăng nhập
document.addEventListener("DOMContentLoaded", () => {
  var formLogin = document.querySelector("#login-form");
  var formRegister = document.querySelector("#register-form");
  var formForgotPass = document.querySelector("#forgot-Pass");

  var btnLogin = document.querySelector("#login");
  var btnRegister = document.querySelector("#register");
  var quayVe = document.querySelector("#quayVe");
  var quenPass = document.querySelector("#quenPass");
  var cancel = document.querySelector("#cancel");

  //Trang chủ
  var trangChu = document.querySelector("#content");
  btnLogin.addEventListener("click", () => {
    formLogin.style.display = "block";
    formRegister.style.display = "none";
    trangChu.style.display = "none";
  });
  btnRegister.addEventListener("click", () => {
    formRegister.style.display = "block";
    formLogin.style.display = "none";
    trangChu.style.display = "none";
  });
  quayVe.addEventListener("click", () => {
    formRegister.style.display = "none";
    formLogin.style.display = "block";
  });
  quenPass.addEventListener("click", () => {
    formLogin.style.display = "none";
    formForgotPass.style.display = "block";
  });
  cancel.addEventListener("click", () => {
    formLogin.style.display = "block";
    formForgotPass.style.display = "none";
  });
});

// END FORM đăng kí đăng nhập
