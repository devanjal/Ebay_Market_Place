var mysql= require('./mysql')
var ejs=require('ejs');
var session = require('express-session');
var object_id="vp_id";
exports.getUser=function(req,res){
    var insert_items='SELECT * FROM advertisement'
    //console.log(req.session.user);

    mysql.fetchData(insert_items,function(err,result){
        if(err){
            console.log(err);

        }
        else{
            console.log(result);
            var log_sql='insert into user_log(timestamp, user_id, object_id,description) values(now(),"'+req.session.user_id+'","'+object_id+'","Checkout")';

            mysql.fetchData(log_sql,function(err,result){
                if(err){
                    console.log("Log Error"+err);
                }else{

                }
            });
            var test=JSON.stringify(result);
            json_response={"result":result, "user_id":req.session.user_id}
            res.send(result);
            console.log(result);


        }});
//}
//else{
    console.log("Error Devanjal")
    //  }
}
exports.display=function(req,res){
    //if(req.session) {
    res.render('product', {title: 'product'});
    //  }
    //else{
    //    console.log("Error Kotia")
    //}
};
