var signup = angular.module('signup', []);
//defining the login controller
signup.controller('signup', function($scope, $http,$window) {
	$scope.submit = function() {
		$http({
			method : "POST",
			url : '/checkSignup',
			data : {
				"fname" : $scope.fname,
				"lname" : $scope.lname,
				"email"		:$scope.email,
				"password": $scope.password
				
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statuscode==401) {
				$scope.invalid_login = false;
				$scope.validlogin = true;
				alert("Email already in use... Try other email")
				$window.location.assign("/signup");;
			}
			else
				{
					$scope.invalid_login=true;
					$scope.validlogin=false;
					console.log("1");
					$window.location.assign("/login");

					alert("Signup Successful")
				
				}
		}).error(function(error) {
			console.log(error);
		});
	};
});
	