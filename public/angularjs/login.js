var login = angular.module('login', []);
//defining the login controller
login.controller('login', function($scope, $http,$window,$location) {
	$scope.invalid_login=false;
	$scope.validlogin=true;
	$scope.var="USER"
	$scope.submit = function() {
		
		$http({
			method : "POST",
			url : '/checkLogin',
			data : {
				
				"email"		:$scope.email,
				"password": $scope.password
				
			}
		}).success(function(data) {

			$scope.test=data.statuscode;
			alert($scope.test);
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
					$scope.var=data.fname;
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
})
	