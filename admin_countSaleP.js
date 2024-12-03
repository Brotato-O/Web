function showSaleProducts(){
    var countP=localStorage.getItem("countP") || {};
    var products= JSON.parse(localStorage.getItem("products"));
    for(var i=0; i< products.length; i++){
        countP[products[i].productId] = {totalAmount: 0, quantity: 0};
    }
    var bill= JSON.parse(localStorage.getItem("bill"));
    for(var i=0; i< bill.length; i++){
        if(bill[i].status=="Đã giao"){
            for(var j=0; j< bill[i].product.length; j++){
                countP[bill[i].product[j].id].totalAmount+=Number(bill[i].product[j].quantity)* bill[i].product[j].price;
                countP[bill[i].product[j].id].quantity+=Number(bill[i].product[j].quantity);
            }
        }
    }
    

    localStorage.setItem("countP", JSON.stringify(countP));
}

function theoTien(){
    var products= JSON.parse(localStorage.getItem("products"));
    var countP=localStorage.getItem("countP");
    // for(let i=1032; i< 1099; i++){
    //     for(let j=1032; j< 1099; j++){
    //         if(countP[j].totalAmount < countP[j+1].totalAmount){
    //             var temp = countP[j];
    //             countP[j] = countP[j+1];
    //             countP[j+1] = temp;
    //         }
    //     }
    // }
    for(let i=0; i< products.length; i++){
        if(products[i].productId==1032){
            console.log("Sản phẩm bán ít tiền nhất: " + products[i].name);
        }
    }
    for(let i=0; i< products.length; i++){
        if(products[i].productId==1099){
            console.log("Sản phẩm bán nhiều tiền nhất: " + products[i].name);
        }
    }
    localStorage.setItem("countP", JSON.stringify(countP));
}

function theoSoLuong(){
    var countP=localStorage.getItem("countP");
    for(let i=1032; i< 1099; i++){
        for(let j=1032; j< 1099; j++){
            if(countP[j].quantity < countP[j+1].quantity){
                var temp = countP[j];
                countP[j] = countP[j+1];
                countP[j+1] = temp;
            }
        }
    }
    console.log("Sản phẩm bán nhiều nhất: " + countP[1099]);
    console.log("Sản phẩm bán ít nhất: " + countP[1032]);
}