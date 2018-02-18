var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "thaivan_db"
});

con.connect(function(err) {
  
  if (err) throw err;
  console.log("Connected!");
  
});

function get_users(){
    var sql = "SELECT * FROM users";
    con.query(sql, function (err, result, fields) {
        
        if (err) throw err;
        console.log(result);
        console.log(result[1].user_username);

    });
}
