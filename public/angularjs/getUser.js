var getUser = angular.module('getUser', []);
//defining the login controller

getUser.controller('getUser', function($scope, $http,$window,$location) {

    //$scope.var="USER";


        $http.get("/test").success(function(data) {
            $scope.test=data;
           // alert($scope.test.name);
            //console.log(name);
        });

});

