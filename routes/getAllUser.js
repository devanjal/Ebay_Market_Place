var mysql= require('./mysql')
var ejs=require('ejs');
var session = require('express-session');
exports.getUser=function(req,res){
    if(!req.session){
//var checkLogin='SELECT fname FROM ebay WHERE email="'+req.body.email+'" AND password="'+req.body.password+'"';
   // var insert_items='insert into item values('+req.body.id+',"'+req.body.name+'","'+req.body.desc+'","'+req.body.seller+'","'+req.body.shipAdd+'","'+req.body.cost+'","'+req.body.quantity+'")';
var insert_items='SELECT name,description,seller,shipping_add,cost,quantity FROM item'
    console.log(req.session.user);
    mysql.fetchData(insert_items,function(err,result){
        if(err){
            console.log(err);

        }
        else{
            console.log(result);


            //console.log(JSON.stringify(result.fname));
            //res.json(result);
            // var name=result[1].name;
            // var des=result[1].description;
            // var seller=result[1].seller;
            // var ship=result[1].shipping_add;
            //var name=result[0].name;
           // var name=result[0].name;
          // var json_response={"name":name,"des":des,"seller":seller,"ship":ship};
        var test=JSON.stringify(result);
           res.send(result);
            console.log(result);


        }});
}
else{
    console.log("Error Devanjal")
    }
}
exports.display=function(req,res){
    //if(req.session) {
        res.render('product', {title: 'product'});
  //  }
    //else{
    //    console.log("Error Kotia")
    //}
}