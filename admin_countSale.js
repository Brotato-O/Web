function onCustomer(){
    var bill= JSON.parse(localStorage.getItem('bill'));
    var user= JSON.parse(localStorage.getItem('user'));
    var count= [];
    for(let i=0; i< user.length; i++){
        count[i].push(user[i].id);
    }
    console.log(count);
}