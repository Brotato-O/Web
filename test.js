// start banner
let btnLeft_banner = document.querySelector("#banner .btn-left");
let btnRight_banner = document.querySelector("#banner .btn-right");
let listImg = document.querySelector("#list-banner"); //Toàn bộ cái banner
let imgs = document.querySelectorAll("#list-banner > img");
let dots = document.querySelectorAll("#list-dots > li");

let indexBanner = 0;
let widthImg = imgs[0].offsetWidth;

//Hàm click btn next
const funcClickNext = function () {
  dots[indexBanner].classList.remove("active"); //Loại bỏ active trước khi index tăng
  if (indexBanner == imgs.length - 1) indexBanner = 0;
  else indexBanner++;
  dots[indexBanner].classList.add("active"); //Gán lại khi tăng
  listImg.style.transform = "translateX(" + -widthImg * indexBanner + "px)";
};

let changeSlide = setInterval(funcClickNext, 3000);

btnRight_banner.addEventListener("click", () => {
  clearInterval(changeSlide); //clear để xóa bỏ hiệu ứng của setInterval
  funcClickNext();
  changeSlide = setInterval(funcClickNext, 3000); //Cài đặt lại
});

btnLeft_banner.addEventListener("click", () => {
  clearInterval(changeSlide);
  dots[indexBanner].classList.remove("active");
  if (indexBanner == 0) indexBanner = imgs.length - 1;
  else indexBanner--;
  dots[indexBanner].classList.add("active");
  listImg.style.transform = "translateX(" + -widthImg * indexBanner + "px)";
  changeSlide = setInterval(funcClickNext, 3000);
});

// } Sẽ phat triển thâm phần nhấn các dot thì nó sẽ dịch chuyển tới img tương ứng

// end banner

//start countdown
let day = document.getElementById("days");
let hour = document.getElementById("hours");
let minute = document.getElementById("minutes");
let second = document.getElementById("seconds");
//Tính tổng số giây
let distance =
  Number(day.innerText) * 24 * 60 * 60 +
  Number(hour.innerText) * 60 * 60 +
  Number(minute.innerText) * 60 +
  Number(second.innerText);
let countdown = setInterval(() => {
  // Tính toán lại các đơn vị ngày, giờ, phút, giây
  if (distance <= 0) {
    clearInterval(countdown);
  }
  let days = Math.floor(distance / (24 * 60 * 60));
  let hours = Math.floor((distance % (24 * 60 * 60)) / (60 * 60));
  let minutes = Math.floor((distance % (60 * 60)) / 60);
  let seconds = distance % 60;

  day.innerText = days;
  hour.innerText = hours;
  minute.innerText = minutes;
  second.innerText = seconds;

  distance--;
}, 1000);
//end countdown

//click heart in product card
let listHeartProduct = document.querySelectorAll(".product-card span i");
for (let i = 0; i < listHeartProduct.length; i++) {
  listHeartProduct[i].addEventListener("click", function () {
    if (this.style.color == "red") this.style.color = "black";
    else this.style.color = "red";
  });
}
let listProductCard = document.querySelectorAll(
  "#list-flash-sell .product-card"
);
let listSaleProduct = document.querySelectorAll(".sale");
let listPrice = document.querySelectorAll(".price");
for (let i = 0; i < listSaleProduct.length; i++) {
  let ePriceSale = document.createElement("span");
  let sale = Number(listSaleProduct[i].innerText.replace("%", "").trim()) * -1;
  let price = Number(listPrice[i].innerText.replace("$", "").trim());
  let priceSale = (price - (price * sale) / 100).toFixed(2);
  listPrice[i].style.textDecoration = "line-through";
  listPrice[i].style.color = "grey";
  listProductCard[i].appendChild(ePriceSale);
  ePriceSale.innerHTML = "$" + priceSale;
  ePriceSale.style.color = "red";
  ePriceSale.style.fontSize = "25px";
  ePriceSale.style.fontWeight = "bold";
}

//click btn in lish product sale
let btnRight_product = document.querySelector("#flash-sell .btn-right");
let btnLeft_product = document.querySelector("#flash-sell .btn-left");
let listProduct = document.querySelector("#list-flash-sell");

let imgsProduct = document.querySelectorAll("#list-flash-sell img");
let widthProduct =
  listProductCard[0].offsetWidth +
  parseFloat(getComputedStyle(listProductCard[0]).marginRight) +
  parseFloat(getComputedStyle(listProductCard[0]).marginLeft);

let indexProduct = 0;
btnRight_product.addEventListener("click", () => {
  //Nếu độ dài còn 4 ảnh cuối cùng sẽ không click được nữa
  if (indexProduct == imgsProduct.length - 4)
    indexProduct = imgsProduct.length - 4;
  else {
    indexProduct++;
    listProduct.style.transform =
      "translateX(" + -widthProduct * indexProduct + "px)";
  }
});
btnLeft_product.addEventListener("click", () => {
  if (indexProduct <= 0) indexProduct = 0;
  else {
    indexProduct--;
    listProduct.style.transform =
      "translateX(" + -widthProduct * indexProduct + "px)";
  }
});
//End click btn list product sale
