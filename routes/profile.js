var ejs=require('ejs');
var mysql= require('./mysql');
var passwordHash = require("password-hash");
var session = require('express-session');
exports.setProfile=function(req,res){
    var sess= req.session;

    var setProfile= 'UPDATE user SET birthday="'+req.body.dob+'",ebay_handle="'+req.body.ebay_handle+'", contact="'+req.body.phone+'" WHERE email="'+req.session.user+'" AND first_name="'+req.session.first_name+'"';
    console.log(setProfile)
    mysql.fetchData(setProfile,function(err,result){
        if(err){
            console.log(err);
            var json_response={"error" : err, "statuscode":401};
            res.send(json_response);
        }
        else{


            //console.log(fname);
            var json_response={"result" : result, "statuscode":200};
            //var json_response=result;
            res.send(json_response);


        }});

};
