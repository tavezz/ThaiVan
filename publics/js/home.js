wow = new WOW().init();

var app = angular.module('myApp', []);


app.controller('myCtrl', function($scope, $http, $timeout) {
    $scope.firstname='';
    $scope.lastname='';
    $scope.email='';
    $scope.username='';
    $scope.password='';
    
    $scope.SendData = function() {
        var json = {
            "firstname"  : $scope.firstname,
            "lastname"  : $scope.lastname,
            "email"     : $scope.email,
            "username"  : $scope.username,
            "password"  : $scope.password
        };

        $http.post('http://127.0.0.1:3000/save_reg', json)
        .then(
            function(response) {
                document.querySelector('#close_reg').click();
                
                $scope.firstname='';
                $scope.lastname='';
                $scope.email='';
                $scope.username='';
                $scope.password='';
                $scope.password='';

                document.querySelector('#openMyModal').click();

                //$scope.mess = response.data;
                
                //setTimeout(
                //    function() {
                //        location.reload();
                //    }
                //, 2000);      
            }, 
            function(response){
                alert("Something went wrong");
            }
        );
    };

    $scope.Login = function() {
        var json = {
            "login_username"  : $scope.login_username,
            "login_password"  : $scope.login_password
        };

        $http.post('http://127.0.0.1:3000/login', json)
        .then(
            function(response) {
                document.querySelector('#close_Login').click();
                
                $scope.login_username='';
                $scope.login_password='';

                document.querySelector('#openLoginModal').click();

            }, 
            function(response){
                alert("Something went wrong");
            }
        );
    };
    
    $scope.Logout = function() {
        if(confirm("ยืนยันออกจากระบบ")){
            $http.post('http://127.0.0.1:3000/logout')
        .then(
            function(response) {
                setTimeout(
                    function() {
                        location.reload();
                    }
                , 1);
            }, 
            function(response){
                alert("Something went wrong");
            }
        );
        } else {

        }
        

    };
    

    //$scope.CheckForm = function() {
    //    alert("wrong");
    //};
    //$scope.CheckForm(); 
});

app.directive("nonSpace", function() {
    return function(scope, element, attrs) {
        element.bind("keydown", function(event) {
            if (event.keyCode == 32) event.preventDefault();
        });
        element.on("paste", function(event) {
            event.preventDefault();
        });    
    };     
});