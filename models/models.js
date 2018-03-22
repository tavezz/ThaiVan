var models = {}
var mysql = require('mysql');
var con_sql = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "thaivan_db"
});

con_sql.connect(function(err) {
  if (err) throw err;
});


exports.getUsers = function () {
  var sql = "SELECT * FROM users";
        
  function qdata(callback){
    con_sql.query(sql, function (err, result, fields) {
        if (err) 
          callback(err,null);
        else 
          callback(null,result[1].user_username);
    });
  };
 
  var x = "";
  qdata(function(err,data){
  if (err)
    console.log("ERROR : ",err);            
  else          
    x = data;
    console.log(x);
  });
  
};


exports.getUsers2 = function (callback) {
  var sql = "SELECT * FROM users";
        
  con_sql.query(sql, function (err, result, fields) {
    if (err) 
      callback(err,null);
    else 
      callback(null,result[0].user_username);
  });
  
};


exports.myDateTime = function () {
  return Date();
};

exports.save_reg = function(json,callback){
  
  var sql = "INSERT INTO users (user_username, user_password, user_firstname, user_lastname, user_email, add_date) VALUES ('"+json.username+"','"+json.password+"','"+json.firstname+"','"+json.lastname+"','"+json.email+"',NOW())";
  
  con_sql.query(sql, function (err, result, fields) {
    if (err) 
      callback(err,null);
    else 
      console.log(result);
      callback(null,result);
  });
};

exports.testdb = function (callback) {
  var sql = "SELECT user_id,user_username FROM users";
  
  con_sql.query(sql, function (err, result, fields) {
    if (err) 
      callback(err,null);
    else 
      console.log(result);
      callback(null,result);
  });
};

exports.login = function (json,callback){
  var sql = "SELECT user_id,user_username,user_password FROM users WHERE user_username = '"+json.login_username+"'";
  
  con_sql.query(sql, function (err, result, fields) {
    if (err) 
      callback(err,null);
    else 
      console.log(result);
      callback(null,result);
  });

};

exports.getUsrData = function (json,callback){
  var sql = "SELECT * FROM users WHERE user_id = '"+json+"'";
  
  con_sql.query(sql, function (err, result, fields) {
    if (err) 
      callback(err,null);
    else 
      console.log(result);
      callback(null,result);
  });

};

//module.exports = models;
