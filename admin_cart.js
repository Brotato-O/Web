function xoabill(){
    localStorage.removeItem("bill");
  }
  
  function thembill(){
    const bills = [
      {
          receiptId: 1,
          customer: { username: "user1", password: "password1", sdt: "0123456789" },
          status: "Chờ xác nhận",
          orderDate: "2024-11-16",
          paymentMethod: "Chuyển khoản",
          totalAmount: 2000000,
          products: [
              { quantity: 3, name: "Giày Adidas UltraBoost" },
              { quantity: 1, name: "Giày Nike Air Max" }
          ]
      },
      {
          receiptId: 2,
          customer: { username: "user2", password: "password2", sdt: "0987654321" },
          status: "Đã xác nhận",
          orderDate: "2024-11-15",
          paymentMethod: "Tiền mặt",
          totalAmount: 2500000,
          products: [
              { quantity: 1, name: "Giày Converse Chuck Taylor" }
          ]
      },
      {
          receiptId: 3,
          customer: { username: "user3", password: "password3", sdt: "0912345678" },
          status: "Đã giao",
          orderDate: "2024-11-14",
          paymentMethod: "Chuyển khoản",
          totalAmount: 1500000,
          products: [
              { quantity: 2, name: "Giày Vans Old Skool" }
          ]
      },
      {
          receiptId: 4,
          customer: { username: "user1", password: "password1", sdt: "0123456789" },
          status: "Đã giao",
          orderDate: "2024-11-13",
          paymentMethod: "Tiền mặt",
          totalAmount: 1200000,
          products: [
              { quantity: 1, name: "Giày Puma Suede Classic" }
          ]
      },
      {
          receiptId: 5,
          customer: { username: "user2", password: "password2", sdt: "0987654321" },
          status: "Chờ xác nhận",
          orderDate: "2024-11-12",
          paymentMethod: "Chuyển khoản",
          totalAmount: 1800000,
          products: [
              { quantity: 4, name: "Giày New Balance 574" }
          ]
      },
      {
          receiptId: 6,
          customer: { username: "user3", password: "password3", sdt: "0912345678" },
          status: "Đã xác nhận",
          orderDate: "2024-11-11",
          paymentMethod: "Tiền mặt",
          totalAmount: 2100000,
          products: [
              { quantity: 1, name: "Giày Reebok Club C" }
          ]
      },
      {
          receiptId: 7,
          customer: { username: "user1", password: "password1", sdt: "0123456789" },
          status: "Đã giao",
          orderDate: "2024-11-10",
          paymentMethod: "Chuyển khoản",
          totalAmount: 1700000,
          products: [
              { quantity: 2, name: "Giày Asics Gel-Lyte III" }
          ]
      },
      {
          receiptId: 8,
          customer: { username: "user2", password: "password2", sdt: "0987654321" },
          status: "Đã giao",
          orderDate: "2024-11-09",
          paymentMethod: "Tiền mặt",
          totalAmount: 2200000,
          products: [
              { quantity: 1, name: "Giày Jordan 1" }
          ]
      },
      {
          receiptId: 9,
          customer: { username: "user3", password: "password3", sdt: "0912345678" },
          status: "Chờ xác nhận",
          orderDate: "2024-11-08",
          paymentMethod: "Chuyển khoản",
          totalAmount: 3000000,
          products: [
              { quantity: 2, name: "Giày Balenciaga Triple S" }
          ]
      },
      {
          receiptId: 10,
          customer: { username: "user1", password: "password1", sdt:"0123456789" },
          status: "Đã xác nhận",
          orderDate: "2024-11-07",
          paymentMethod: "Tiền mặt",
          totalAmount: 8000000,
          products: [
              { quantity: 1, name: "Giày Yeezy Boost 350" }
          ]
      }
      ]
  
    localStorage.setItem("bill", JSON.stringify(bills));
  }
  
  
  function billDisplay(from, to, n){
      document.getElementById("themsp").style.display = "none";
      document.getElementById("selectbill").style.display = "block";
    var bill= JSON.parse(localStorage.getItem('bill'));
    var s="";
    for(var i=0;i<bill.length; i++){
      if((bill[i].customer.sdt.includes(from) && n==1) || (String(bill[i].receiptId).includes(from) && n==2) || ((bill[i].totalAmount>=from && bill[i].totalAmount<=to) && n==3)) {
          console.log("AAA");
          s+=`<tr>
            <td>${bill[i].orderDate}</td>
            <td>${bill[i].receiptId}</td>
            <td>${bill[i].customer.sdt}</td>
            <td>${bill[i].totalAmount}</td>
            <td>${bill[i].status}</td>
        </tr>
        `;
      }
    }
    document.getElementById("maintable").innerHTML=`<table id="billTable"><tr>
            <td>Ngày đặt</td>
            <td>Mã hóa đơn</td>
            <td>Sdt</td>
            <td>Giá tiền</td>
            <td>Trạng thái</td>
            </tr>` + s + `</table>`
  }
  
  function lookUpBillDisplay(){
    const billText= document.getElementById("textMethod");
    const billDate= document.getElementById("dateMethod");
    const billPrice= document.getElementById("priceMethod");
    const method= document.getElementById("method");
    if (method.value== "id" || method.value== "phone"){
      billText.style.display="block";
      billDate.style.display="none";
      billPrice.style.display="none";
    }
    else if (method.value== "date"){
      billText.style.display="none";
      billDate.style.display="flex";
      billPrice.style.display="none";
    }
    else {
      billText.style.display="none";
      billDate.style.display="none";
      billPrice.style.display="flex";
    }
  }
  
  function lookUpBill(){
      var billText= document.getElementById("textMethod").value;
      var from = document.getElementById("pricefrom").value;
      var to = document.getElementById("priceto").value;
      var method= document.getElementById("method");
      if(method.value== "id") billDisplay(billText, 0, 2);
      if(method.value== "phone") billDisplay(billText, 0, 1);
      if(method.value== "price") billDisplay(from, to, 3);
  }