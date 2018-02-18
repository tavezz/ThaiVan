var express = require('express');
var router = express.Router();



router.get('/', function(req, res){
   res.send('GET route on homepage.');
});
router.post('/', function(req, res){
   res.send('POST route on homepage.');
});



router.get('/test', function(req, res){
   res.send('GET route on test.');
});
router.post('/test', function(req, res){
   res.send('POST route on test.');
});

module.exports = router;