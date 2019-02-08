//creates a variable for module registrationApp with dependency to the application (ngRoute).
//firebase will import methods and properties needed to work with this service.
var myApp = angular.module('myApp', ['ngRoute', 'firebase', 'ngMaterial', 'ngMessages'])
	//to save typing the application URL repeatedly a constant is created and 'FB_URL' can be used instead. This also means if the application url ever changes it can be changed in one place rather than (potentially) many.
	//changed
	.constant('FIREBASE_URL', 'https://tig-test-4cc84.firebaseio.com/');
//Not working
myApp.component('tig_vid', {
	template: `
              <md-content flex layout-padding>
                <div style="text-align: center;" class="md-padding">
                  <video width="90%" height="90%" controls src="../public/assets/video/StarlightScamper.mp4" autoplay>
                  </video>
                </div>
              </md-content>
            `
	, controller: 'SuccessController'
});
//routes handle different templates and connects them to code (javascript) to control them.
//routeProvider create functionality for different pages (in this instance)
myApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
	when('/login', {
		//the login and register pages are handled by RegistrationController in regigistration.js.
		templateUrl: 'views/login.html'
		, controller: 'RegistrationController'
	}).
	when('/register', {
			templateUrl: 'views/register.html'
			, controller: 'RegistrationController'
		}).
		//the success page is handled by SuccessController found in success.js.
	when('/success', {
			templateUrl: 'views/success.html'
			, controller: 'SuccessController'
		}).
		//landing added to work in conjunction with ng-href.
	when('/landing', {
			templateUrl: 'views/landing.html'
			, controller: 'SuccessController'
		}).
		//investcalc added to work in conjunction with ng-href.
	when('/investcalc', {
			templateUrl: 'views/investcalc.html'
			, controller: 'SuccessController'
		}).
		//catches any other values entered and routes back to login.html.
	otherwise({
		redirectTo: '/landing'
	});
}]);
// Colour theming configuration
myApp.config(function ($mdThemingProvider) {
	/*
	$mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
	$mdThemingProvider.theme('grey')
	  .primaryPalette('grey')
	  .accentPalette('pink')
	  */
	$mdThemingProvider.theme('default').primaryPalette('deep-orange').accentPalette('deep-purple').warnPalette('blue-grey', {
			'hue-3': '900'
		})
		//.backgroundPalette('lime');
});
// Test menu configuration
/*
myApp.config(function($mdIconProvider) {
  $mdIconProvider
    .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
    .iconSet('device', 'img/icons/sets/device-icons.svg', 24)
    .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24)
    .defaultIconSet('img/icons/sets/core-icons.svg', 24);
});*/