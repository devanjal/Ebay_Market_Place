var ejs= require('ejs');
//importing module ejs
var mysql = require('mysql');//importing module mysql
function getConnection(){ 
	var connection = mysql.createConnection({     
		host     : 'localhost', //host where mysql server is running     
		user     : 'root', //user for the mysql application     
		password : 'root', //password for the mysql application     
		database : 'ebay', //database name
		port  : 3306 //port, it is 3306 by default for mysql 
		});

 return connection;}//fetching the data from the sqlserver


function fetchData(sqlQuery,callback){  //console.log("\nSQL Query::"+sqlQuery);  
var connection=getConnection(); 
connection.query(sqlQuery, function(err,rows,field){
	if(err){
	console.log(err);
	
	}
	else{
		console.log(rows);
		callback(err, rows);
	}
connection.end();
	//comment
});

}
exports.fetchData=fetchData;
//exports.queryData=queryData;
