
var myApp = angular.module('app_test_hudson', []);

myApp.controller("UserProfileController", ['$scope','$http', function($scope, $http){
    
    $scope.user = {};
    
    $scope.update = function(user){
        
      $scope.isFirstNameInValid = false;
      $scope.isLastNameInValid = false;
      $scope.isValidForm = false;
      

        $http({
            method: "POST",
            data: JSON.stringify(user),
            url: "http://localhost:65089/api/user",  // update this to the url where the api is running
            contentType: "application/json"
        }).then ( function success(response){
            $scope.isValidForm = true;
        }, function error(response){
            if (response.data.Message == "FirstName invalid"){
                $scope.isValidForm = false;
                $scope.isFirstNameInValid = true;
            }
            if (response.data.Message == "LastName invalid"){
                $scope.isValidForm = false;
                $scope.isLastNameInValid = true;                
            }
        });
        
        if( $scope.isFirstNameInValid || $scope.isLastNameInValid ) {
            return;
        }
    }; 
  

  
  $scope.pageTitle = "A simple online Form Using AngularJS and Restful WebApi";
  $scope.pageDescription = "A form with some basic server side validation";
}]);

