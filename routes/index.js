var ejs=require('ejs');
exports.index = function(req, res){
  ejs.renderFile('./views/homepage.html',{title:"Home Page", user:req.session.user}, function(err, result) {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

    if(req.session.user){
    if (!err) {
      res.end(result);
    } else {
      res.end("An error occured");
      console.log(err);
    }}
    else{
      console.log("Not in session");
      res.redirect("/login")
    }
  }) ;
};
exports.getUser=function (req,res) {
  res.render('getUser',{title:'All User'});
  
};
exports.login=function(req,res){
  if(!req.session.user){
  ejs.renderFile('./views/login.html', function(err, result) {
    if (!err) {
      res.end(result);
    } else {
      res.end("An error occured");
      console.log(err);
    }
  }) ;}
  else{
    res.redirect('/');
  }
};
exports.signup = function(req, res){
  ejs.renderFile('./views/signup.html', function(err, result) {
    if (!err) {
      res.end(result);
    } else {
      res.end("An error occured");
      console.log(err);
    }
  }) ;
};
exports.profile = function(req, res){
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

  //res.render('profile', { title: 'Edit Profile', user:req.session.user,fname:req.session.first_name });
  if(req.session.user){

      res.render('profile', { title: 'Edit Profile', user:req.session.user,fname:req.session.first_name });

    }
  else{
    console.log("Not in session");
    res.redirect("/login")
  }
};
exports.redirectToHomepage = function(req,res)
{

  res.redirect('/');
  //}
};

exports.logout = function(req,res)
{
  req.session.destroy();
  res.redirect('/login');
};


