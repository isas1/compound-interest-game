//this registration controller was initially used for anything routed to login and register pages.
//this is now handled by authentication.js to allow authentication data to be accessed by more than many controllers. Not necessarily needed currently in this application but may be useful when it grows.

    //controller.
myApp.controller('RegistrationController',
  ['$scope', 'Authentication', '$mdDialog', '$mdMenu',
  function($scope, Authentication, $mdDialog, $mdMenu) {
  
    
  //login - called within index.html
  $scope.login = function() {
    //calls authentication service and login method and pass it information from the user.
    Authentication.login($scope.user);
    
  };
      
  //logout.
  $scope.logout = function() {
    //SI. calls authentication service and login method, no need to pass anything in here.
    Authentication.logout();
  }; //end of logout.
      
      //register - called within index.html
      //calls authentication service and register method and passes it information from the user.
  $scope.register = function() {
      Authentication.register($scope.user);
  };
      
  $scope.success = function() {

  };
    
  $scope.openMenu = function() {
    /* Menu and items here */
  }
}]);