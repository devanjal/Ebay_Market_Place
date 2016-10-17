
var cartApp = angular.module('cartApp', []);

cartApp.controller('cartController', function ($scope, $http) {
    alert("in shopping_cart Conrtoller");
    $scope.test = [];
    var total = 0;
    $http.get("/getCart").success(function (response) {
            alert(JSON.stringify(response));
            $scope.test = response.items;
            $scope.cartTotal = response.sum;

    }, function (response) {
        
    });
    
    $scope.removeProduct = function (item_id) {

        var obj = new Object();
        obj.item_id = item_id;

        $http({
            method : "POST",
            url : "/removeCart",
            headers : {
                'content-type' : 'application/json'
            },
            data : obj
        }).success(function (response) {
            $scope.test = response.cartData;
            $scope.cartTotal = response.cartTotal;
            $window.location = '/view_product';
        }, function (response) {});
    }
    
    
});