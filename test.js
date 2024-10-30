// start banner
let btnLeft = document.querySelector("#btn-left");
let btnRight = document.querySelector("#btn-right");
let listImg = document.querySelector("#list-banner"); //Toàn bộ cái banner
let imgs = document.querySelectorAll("#list-banner > img");
let dots = document.querySelectorAll("#list-dots > li");

let index = 0;
let widthImg = imgs[0].offsetWidth;

//Hàm click btn next
const funcClickNext = function () {
  dots[index].classList.remove("active"); //Loại bỏ active trước khi index tăng
  if (index == imgs.length - 1) index = 0;
  else index++;
  dots[index].classList.add("active"); //Gán lại khi tăng
  listImg.style.transform = "translateX(" + -widthImg * index + "px)";
};

let changeSlide = setInterval(funcClickNext, 3000);

btnRight.addEventListener("click", () => {
  clearInterval(changeSlide); //clear để xóa bỏ hiệu ứng của setInterval
  funcClickNext();
  changeSlide = setInterval(funcClickNext, 3000); //Cài đặt lại
});

btnLeft.addEventListener("click", () => {
  clearInterval(changeSlide);
  dots[index].classList.remove("active");
  if (index == 0) index = imgs.length - 1;
  else index--;
  dots[index].classList.add("active");
  listImg.style.transform = "translateX(" + -widthImg * index + "px)";
  changeSlide = setInterval(funcClickNext, 3000);
});

// for (let i = 0; i < dots.length; i++) {
//   dots[i].addEventListener("click", () => {
//     clearInterval(changeSlide);
//     funcClickNext();
//     changeSlide = setInterval(funcClickNext, 3000);
//   });
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
let listSaleProduct = document.querySelectorAll(".sale");
let listPrice = document.querySelectorAll(".price");
for (let i = 0; i < listSaleProduct.length; i++) {
  let sale = Number(listSaleProduct[i].innerText.replace("%", "").trim() * -1);
  let price = Number(listPrice[i].innerText.replace("$", "").trim());
  console.log(price - (price * sale) / 100);
}
