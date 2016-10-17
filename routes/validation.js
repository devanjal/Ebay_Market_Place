var mysql=require('./mysql');
exports.getValid=function(req,res){
	var object_id=req.body.object_id;
	console.log(object_id);
	var number=req.body.creditcard_length;
	console.log(number);
	var c=req.body.cvv_length;
	var x;
	var y=0;
	var mm=req.body.month_length;
	var yy=req.body.year_length;
	var month=req.body.month;
	var year=req.body.year;
	var flag=0;
	var scard="";
//		var cl=scard.toString().length;
	var scvv="";
//		var cvl=scvv.toString().length;
	var sdate="";
//		var cdl=scard.toString().length;
	if(number!=16){
		scard="invalid card no.";
		flag++;
	}
	if(c!=3){
		scvv="invalid cvv";
		flag++;
	}
	if(year<16 || month>13 || year>26 ||month<1){
		sdate="invalid date";
		flag++;
	}
	if(year==16 && month<10){
		sdate="invalid date";
		flag++;
	}
	if(flag==0){

		var log_sql='insert into user_log(timestamp, user_id, object_id,description) values(now(),"'+req.session.user_id+'","'+object_id+'","Checkout")';
		//res.send("Successful validation");
		var first_query= 'insert into order_history(item_id,item_name,item_description,seller_name,quantity,item_price,email' +
			',user_id,item_post_date) select advertisement.item_id,advertisement.item_name,advertisement.item_description,' +
			'advertisement.seller_name,advertisement.item_quantity,advertisement.item_price,user.email,user.user_id,' +
			'advertisement.item_post_date from advertisement  INNER JOIN shopping_cart ON advertisement.item_id = shopping_cart.item_id ' +
			'INNER JOIN user ON shopping_cart.user_id = user.user_id where advertisement.item_quantity >= shopping_cart.item_quantity';
		var sec_query = 'update advertisement  inner join shopping_cart  on shopping_cart.item_id = advertisement.item_id set' +
			' advertisement.item_quantity = (advertisement.item_quantity - shopping_cart.item_quantity)' +
			' where shopping_cart.item_quantity <= advertisement.item_quantity';
		// var third_query =  connection.query('delete from shoppingcart where userId = ?',req.session.userid,function (err, result) {
		// 	if (err) throw err;
		// 	--
		var third_query='delete from shopping_cart where user_id ="'+req.session.user_id+'"';
		var fourth_query =  'delete from advertisement where item_quantity = 0';
		mysql.fetchData(first_query,function (err,result)
			{
				if(err){
					console.log("first query problem")
				}
				else {
					mysql.fetchData(sec_query,function (err,result) {
						if(err){
							console.log(" second problem")
						}
						else {
							mysql.fetchData(third_query,function (err,result) {
								if(err){
									console.log(" third problem")
								}
								else{
									mysql.fetchData(fourth_query,function (err,result) {
										if(err){}else{}

									})
								}
							})
						}
					})
				}
			}
		)
		mysql.fetchData(log_sql,function(err,result){
			if(err){
				console.log("Log Error"+err);
			}else{

			}
		})
		var json_repsonse={"statuscode":200}
		res.send(json_repsonse);

	}
	if(flag!=0){
		//res.send("UnSuccessful Validation!!! reason(s) :"+scard+"  "+scvv+"  "+sdate);
		//prompt("invalid"+scard+" "+scvv+" "+sdate)

		var json_repsonse={"statuscode":401, "scard":scard, "scvv":scvv,"sdate":sdate}
		res.send(json_repsonse);
		// })}
	}};


//	res.send("your name "+number);
//	res.send("your name "+c);
