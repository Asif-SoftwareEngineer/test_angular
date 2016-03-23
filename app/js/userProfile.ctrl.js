
var myApp = angular.module('app_test_hudson', []);

myApp.controller("UserProfileController", ['$scope','updateUseronServer', function($scope, updateUseronServer){
    
    $scope.user = {};
    
    $scope.update = function(user){
        if (user.firstName == undefined || !user.firstName.length) {
            console.log("user first name invalid");
            $scope.isFirstNameInValid = true;
        }
        else {
            $scope.isFirstNameInValid = false;
        }
        
        if (user.lastName == undefined || !user.lastName.length) {
            console.log("user last name invalid");
            $scope.isLastNameInValid = true;
        }
        else {
            $scope.isLastNameInValid = false;
        }
        
        if( $scope.isFirstNameInValid || $scope.isLastNameInValid ) {
            return;
        }
        
        console.log(user.firstName);
        console.log(user.lastName);
        console.log(user.country);
        
        updateUseronServer(user);
    }; 
  
  $scope.isFirstNameInValid = false;
  $scope.isLastNameInValid = false;
  
  $scope.pageTitle = "A simple online Form Using AngularJS and Restful WebApi";
  $scope.pageDescription = "A form with some basic server side validation";
}]).
factory('updateUseronServer', ['$window', function(win) {
   return function(userData) {
       win.alert("User with first Name" + userData.firstName + "has been submitted");
       }
 }]);
