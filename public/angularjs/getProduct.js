var getUser = angular.module('getUser', []);
//defining the login controller
getUser.filter('range', function() {
    return function(input, min, max) {
        min = parseInt(min); //Make string input int
        max = parseInt(max);
        for (var i=min; i<=max; i++)
            input.push(i);
        return input;
    };
});
getUser.controller('getUser', function($scope, $http,$window,$location) {
            $scope.test = [];
            $http.get("/test").success(function(data) {
            $scope.test=data;

            });

    $scope.submit = function(req,res) {
       // alert($scope.selectedQuantity);
      //  alert($scope.item_id);

        //$scope.item_id

        $http({
            method : "POST",
            url : '/addcart',
            data : {

                "selectedQuantitiy":$scope.selectedQuantity,
                "item_id": $scope.item_id,

            }
        }).success(function(data) {

            $scope.test=data.statuscode;
           // alert($scope.test);
            //$window.location = '/profile';
            //checking the response data for statusCode
            if (data.statuscode==401) {

                $scope.invalid_login = true;
                $scope.validlogin = false;
            }

            else
            {
                $scope.invalid_login = true;
                $scope.validlogin = false;
               // $scope.var=data.fname;
                //alert("not ")
                //	console.log("2");
                $window.location = '/product';


            }

            //Making a get call to the '/redirectToHomepage' API
            //window.location.assign("/homepage");
        }).error(function(error) {
//			$scope.validlogin = true;
//			$scope.invalid_login = true;

            console.log("2");
        });
     };
});

