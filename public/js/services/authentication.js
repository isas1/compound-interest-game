//prior to implementation of factory authentication data was managed by registration.js.
//a service is created here to manage registration.
//myApp.factory allows authentication data to be used in a number of different controllers.
//dependencies are injected here. They include $rootscope (to make variables available in all controllers), $firebaseAuth (firebase authentication service) and my firebase db url.
//Firebase (2016) states that $firebaseAuth is a service provided by AngularFire. Authentication methods within Firebase's client library to be wrapped by $firebaseAuth - in this case the url of The Richest Graduates database ('https://therichestgraduate.firebaseio.com/').
myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', 'FIREBASE_URL', '$location', '$firebaseObject', '$http', '$mdToast'
  , function ($rootScope, $firebaseAuth, FIREBASE_URL, $location, $firebaseObject, $http, $mdToast) {
		//allows firebase's authentication service with our unique url to be called with a single variable.
		//var ref = new Firebase(FIREBASE_URL); //Pre update[1]
		//var auth = $firebaseAuth(ref); //Pre update[2]
		var myObject;
		// Initialize Firebase [1]
		var config = {
			apiKey: "AIzaSyCK1xBij2ceS2rT396ioB6A21vBZ7K-s7c"
			, authDomain: "tig-test-4cc84.firebaseapp.com"
			, databaseURL: "https://tig-test-4cc84.firebaseio.com"
			, projectId: "tig-test-4cc84"
			, storageBucket: "tig-test-4cc84.appspot.com"
			, messagingSenderId: "487616458409"
		};
		//console.log(config);
		firebase.initializeApp(config);
		var auth = firebase.auth(); //[2]
		var rootRef = firebase.database().ref(); //EO [1]
		auth.onAuthStateChanged(function (authUser) {
			if (authUser) {
				/*OLD
				//var userRef = new firebase.database().ref() + 'users/' + authUser.uid;
				//var userObj = $firebaseObject(userRef);
				*/
				$rootScope.currentUser = authUser;
			}
			else {
				$rootScope.currentUser = '';
			}
		}); //onAuth()
		myObject = {
			//'login' and 'register' are javascript objects.
			//'login' receives information from the registration controller (RegistrationController). 'User' object passes information is this factory.
			login: function (user) {
				//a method from firebases api - used to authenticate with username and password. Firebase (2016) Firebase.authWithPassword(). [Online] Available from: https://www.firebase.com/docs/web/api/firebase/authwithpassword.html [Accessed: 23 February 2016].
				auth.signInWithEmailAndPassword(user.email, user.password).then(function (regUser) {
					//routes authenticated user to success.html - where the main application lies.
					$location.path('/success');
					//error handling.
				}).catch(function (error) {
					$rootScope.message = error.message;
					$mdToast.show($mdToast.simple().textContent($rootScope.message));
				});
			}, // login
			logout: function () {
				$rootScope.message = '';
				return auth.signOut();
			}
			, register: function (user) {
					//uses $createUser firebase method to create a new user with user+pw combo.
					auth.createUserWithEmailAndPassword(user.email, user.password).then(function (regUser) {
						//storing an object in Firebase.
						//creates a path in firebases database for users and stores information for each user using set() method.
						//old: var regRef = new Firebase(FIREBASE_URL + 'users').child(regUser).set...
						var regRef = firebase.database().ref('users').child(regUser.uid).set({
							date: firebase.database.ServerValue.TIMESTAMP
							, regUser: regUser.uid
							, firstname: user.firstname
							, lastname: user.lastname
							, email: user.email
						});
						//welcome message is stored for output upon registration.
						$rootScope.message = "Hi " + user.firstname + ", Thanks for registering";
						myObject.login(user);
						$rootScope.firstName = user.firstname;
					}).catch(function (error) {
						//error handling.
						$rootScope.message = error.message;
						$mdToast.show($mdToast.simple().textContent($rootScope.message));
					});
				} // register
		}; // myObject
		//when factory is called an object is returned with the login and register functions.
		return myObject;
}]);