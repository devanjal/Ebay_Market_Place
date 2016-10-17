var mysql= require('./mysql')
var ejs=require('ejs');
var object_id="sp_id";
var description="Posting of Products";
exports.sell=function(req,res){
	var insert_items='insert into advertisement(seller_id,item_price,item_description,item_name,item_quantity,ship_location,bid_value,seller_name) ' +
		'values("'+req.session.user_id+'","'+req.body.cost+'","'+req.body.description+'","'+req.body.product_name+'","'+req.body.quantity+'","'+req.body.ship_location+'",' +
		'"'+req.body.bid_value+'","'+req.session.first_name+' '+req.session.last_name+'")';
//var insert_items='SELECT * FROM item'
	var log_sql='insert into user_log(timestamp, user_id, object_id,description) values(now(),"'+req.session.user_id+'","'+object_id+'","'+description+'")';

	mysql.fetchData(log_sql,function(err,result){
		if(err){
			console.log("Log Error"+err);
		}else{

		}
	});
	console.log(insert_items);
mysql.fetchData(insert_items,function(err,result){
	if(err){
		console.log(err);
		var json_res={"statuscode":401}
		res.send(json_res)
	}
	else{
		console.log(result);
		var json_res={"statuscode":200}
		res.send(json_res)

}});
}
exports.display=function(req,res){
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
console.log(""+req.session.devanjal);
	if(req.session.user) {
		var name= req.session.user;
		var last_name=req.session.last_name;
		var first_name=req.session.first_name;
		var last_login=req.session.devanjal;
		console.log("Last Login"+last_login);
		res.render('product', {titl: name, fname:first_name, lname:last_name, last:last_login });
	}
	else{
		console.log("Not in session");
		res.redirect("/login")
	}
};
