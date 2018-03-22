var express = require('express');
var models = require('../models/models.js');
const crypto = require('crypto');
var md5 = require('md5');
var path = require('path');

var router = express.Router();

//แสดงหน้าหลัก
router.all('/', function(req, res){
    if(req.session.userid){
        models.getUsrData(req.session.userid,
            function(err,data){
                if(err){
                    console.log("getUsrData query err");
                } else {
                    res.render('home.jade',{sess : req.session.userid , UsrData : data[0]});
                }
            }
        );

    } else {
        res.render('home.jade');
    }
    //x="";
    //models.getUsers2(function(err,data){
    //    res.send(data);
    //});

    //res.sendFile(path.join(__dirname, '../views', 'home.html'));
    
   
});

//บันทึกการลงทะเบียน
router.post('/save_reg', function(req, res){
    var json = req.body;

    //ตรวจสอบความถูกต้อง
    //if(!json.address){
    //    console.log("address is null");
    //}
    //res.send("wrong");

    json.password = md5(json.password);
    models.save_reg(json,
        function(err,data){
            if(err){
                res.send("no");
            } else {
                res.send("yes");
            }
        }
    );
    

});

//เข้าสู่ระบบ
router.post('/login',function(req, res){ 
    var json = req.body;
    json.login_password = md5(json.login_password);

    models.login(json,
        function(err,data){
            if(err){
                console.log("login query err");
            } else {
                if(data.length==0){
                    res.send("usr_notfound");
                } else if(json.login_password != data[0].user_password){ 
                    res.send("pass_incorrect");
                } else {
                    req.session.userid = data[0].user_id;
                    res.send("logi_success");
                }
            }
        }
    );


    //console.log(json);
    //res.send("55");

});

//ออกจากระบบ
router.post('/logout',function(req, res){ 
    
    req.session.userid = '';
    res.send('loged_out');
});

//จัดการรถตู้
router.get('/manage_van',function(req, res){ 
    if(req.session.userid){
        res.render('van.jade');
    }
    else res.redirect('/');
});

router.get('/sess/:id', function(req, res){
    
    
    if(req.params.id == 570305){
        req.session.test = "jim";
       //req.session.page_views++;
       //res.send("You visited this page " + req.session.page_views + " times");
       res.send("Welcome jim");
    }
    else if(req.session.test == "jim"){
        res.send("Welcome jim again");
    } else {
        res.send("non correct");
    }
 });




router.all('/register', function(req, res){
    res.sendFile(path.join(__dirname, '../views', 'register.html'));
    //res.render('register.jade');
});


router.all('/testdb', function(req, res){

    models.testdb(
        function(err,result){
            if (err) 
                console.log(err);
            else 
                res.render('home.jade',{result : result , sess : req.session.userid});
        }
    );
 });

















router.all('*', function(req, res){
   res.send('Sorry, this is an invalid URL.');
});

module.exports = router;