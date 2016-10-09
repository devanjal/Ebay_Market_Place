var ejs=require('ejs');
var mysql= require('./mysql');
var passwordHash = require("password-hash");
var session = require('express-session');
exports.checkLogin=function(req,res){
	var sess= req.session;

	var checkLogin='SELECT first_name,last_name, user_id FROM user WHERE email="'+req.body.email+'" AND password="'+req.body.password+'"';
	mysql.fetchData(checkLogin,function(err,result){
		if(err){
			console.log(err);
			var json_response={"error" : err, "statuscode":401};
			res.send(json_response);
		}
		else{
			sess.user=req.body.email;
			var fname = result[0].first_name;
			var lname=result[0].last_name;
			var id=result[0].user_id;
			sess.first_name=fname;
			req.session.user_id=id;
			sess.last_name=lname;

			console.log(req.session.user_id);
			var json_response={"result" : result, "statuscode":200};
			//var json_response=result;
			res.send(json_response);


		}});

};
exports.logout=function (req, res) {
	req.session.destroy();
	res.send("logout success!");
};