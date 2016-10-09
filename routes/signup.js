var ejs=require('ejs');
var mysql= require('./mysql');
var passwordHash = require("password-hash");
var json_response;

exports.checkSignup=function(req,res){
	var hashedpassword = passwordHash.generate(req.body.password);
	console.log(hashedpassword);
var checkSignup='INSERT INTO USER(first_name,last_name,email,password) VALUES("'+req.body.fname+'","'+req.body.lname+'","'+req.body.email+'","'+hashedpassword+'")';
/*INSERT INTO tutorials_tbl
 ->(tutorial_title, tutorial_author, submission_date)
 ->VALUES
 ->("Learn PHP", "John Poul", NOW());*/
mysql.fetchData(checkSignup,function(error,result){
	if(error){
		console.log(checkSignup);
		json_response={"err":error,"statuscode":401};
		res.send(json_response);
	
	}
	else {
		console.log(result);
		json_response = {"result": result, "statuscode": 200};
		res.send(json_response);
	}
	//console.log(json_response);
});

};
