var mysql = require('./mysql');

exports.addcart = function (req, res) {

   // console.log(req.body);

    var user_id = req.session.user_id;
    var item_id = req.body.item_id;
    var item_quantity = parseInt(req.body.quantity)+1;

    var insert_query = "insert into shopping_cart(user_id,item_id, item_quantity) values ("+ user_id+", "+item_id+", "+item_quantity+");";
    mysql.fetchData(insert_query, function (err, rows) {
        var json_response;
        if(err){
            console.log(err);
            throw err;
        }else{
            if(rows){
                var object_id="ac_id";
                var description="Add To Cart";
                var log_sql='insert into user_log(timestamp, user_id, object_id,description) values(now(),"'+req.session.user_id+'","'+object_id+'","'+description+'")';

                mysql.fetchData(log_sql,function(err,result){
                    if(err){
                        console.log("Log Error"+err);
                    }else{

                    }
                });
               // res.render('shopping_cart' );
                res.redirect("/showcart")
            }else{
                json_response = {"statusCode" : 401};
                res.send(json_response);
            }
        }
    });
};
exports.bidcart = function (req, res) {

    var user_id = req.session.user_id;
    var item_id = req.body.item_id;
    var item_quantity = parseInt(req.body.quantity)+1;
    var bid_price= req.body.bid_price;
    var base_price=req.body.item_price;
    var total=parseInt(bid_price)+parseInt(base_price);

    var insert_query = "insert into bid_db(item_id, user_id, bid_price, item_quantity) values ("+ item_id +", "+user_id+", " +
       total + ", " + item_quantity + ") on duplicate key update item_quantity = "+item_quantity+", bid_price = "+ total +";";
    var update_shope ='update advertisement set item_price ="'+total+'" where item_id="'+item_id+'"';
    var bid_log='insert into bid_log values(now(),"'+item_id+'","'+req.session.user_id+'","'+total+'")';
    mysql.fetchData(insert_query, function (err, rows) {
        var json_response;
        if(err){
            console.log("insertion error");
            throw err;
        }else{
            if(rows){

                //res.render('shopping_cart');
                res.redirect("/showcart")
            }else{
                json_response = {"statusCode" : 401};
                res.send(json_response);
            }
        }
    });
    mysql.fetchData(update_shope,function (err,result) {
        if(err){

        }else {console.log("successful")}

    })
    mysql.fetchData(bid_log,function (err,result) {
        if(err){

        }
        else{
            console.log("success ")
        }

    })
};

exports.showCart = function (req, res) {
    var select_query =  "select * from shopping_cart INNER JOIN advertisement ON shopping_cart.item_id = advertisement.item_id INNER JOIN user" +
    " ON shopping_cart.user_id = user.user_id WHERE advertisement.item_quantity >= shopping_cart.item_quantity";


    mysql.fetchData(select_query,function (err, rows) {

        if(err){
            console.log(err);
            throw err;
        }else{
            var object_id="gc_id";
            var description="Show Cart"
            var log_sql='insert into user_log(timestamp, user_id, object_id,description) values(now(),"'+req.session.user_id+'","'+object_id+'","'+description+'")';

            mysql.fetchData(log_sql,function(err,result){
                if(err){
                    console.log("Log Error"+err);
                }else{

                }
            });
            if(rows.length > 0){
                console.log(rows);
                var obj = new Object();
                var total = 0;


                for(var i = 0; i<rows.length; i++){
                    total = total + (rows[i].item_price * rows[i].item_quantity);
                }
                obj.items = rows;
                obj.sum = total;
                res.send(obj);
            }else {
                console.log("null");
            }
        }
    })
};



exports.remove_item = function (req, res) {
    var ms = require('mysql');
    var item_id = req.body.item_id;
    var delete_query = "delete from shopping_cart where item_id="+item_id+";";

            mysql.fetchData(delete_query, function (err, result) {
                if(err){
                    console.log("error in delete Query");
                    throw err;
                }
                mysql.fetchData("select * from advertisement INNER JOIN shopping_cart ON advertisement.item_id = shopping_cart.item_id INNER JOIN " +
                    "user ON shopping_cart.user_id = user.user_id where advertisement.item_quantity >= shopping_cart.item_quantity;",
                    function (err, rows) {
                        if(err){
                            console.log("error in shopping_cart remove query");
                            throw err;
                        } else {
                            console.log(rows);
                            //Log page
                            var object_id="ac_id";
                            var description="Add To Cart"
                            var log_sql='insert into user_log(timestamp, user_id, object_id,description) values(now(),"'+req.session.user_id+'","'+object_id+'","'+description+'")';

                            mysql.fetchData(log_sql,function(err,result){
                                if(err){
                                    console.log(err);
                                }else{

                                }
                            });
                            var obj = new Object();
                            obj.cartData = rows;

                            var total = 0;
                            for(var i=0; i<rows.length; i++){
                                total = total + rows[i].itemPrice * rows[i].quantity;
                            }
                            obj.cartTotal = total;
                            res.send(obj);
                        }
                    });
            });

        };
exports.checkout = function(req,res)
{
    res.render('form', { title: 'Credit Card validation'});
}