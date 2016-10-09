var mysql= require('./mysql')
var ejs=require('ejs');
exports.sell=function(req,res){
//var checkLogin='SELECT fname FROM ebay WHERE email="'+req.body.email+'" AND password="'+req.body.password+'"';
var insert_items='insert into advertisement(seller_id,item_price,item_description,item_name,item_quantity,ship_location,item_post_date,bid_value) values("'+req.session.user_id+'","'+req.body.cost+'","'+req.body.description+'","'+req.body.product_name+'","'+req.body.quantity+'","'+req.body.ship_location+'","'+req.body.date+'","'+req.body.bid_value+'")';
//var insert_items='SELECT * FROM item'
	console.log(insert_items);
mysql.fetchData(insert_items,function(err,result){
	if(err){
		console.log(err);
		var json_res={"statuscode":401}
	}
	else{
		console.log(result);


}});
}
exports.display=function(req,res){
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

	if(req.session.user) {
		var name= req.session.user;
		res.render('product', {titl: name, age:name });
	}
	else{
		console.log("Not in session");
		res.redirect("/login")
	}
}