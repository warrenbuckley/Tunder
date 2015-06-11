// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'angular-oauth2','Collection', 'ionic.contrib.ui.tinderCards'])

.run(function($ionicPlatform, $http, $rootScope, $state, OAuth, $ionicLoading) {
  
  $ionicPlatform.ready(function() {

    //the site you will connect to
    $rootScope.baseUrl = "http://10.139.2.25";
    
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    $ionicLoading.show({
      template: 'Connecting...'
    });

    //authenticate and set the auth header
    OAuth.getAccessToken({username: "name@url.com", password: "1234"}).then(function(response){
        $http.defaults.headers.common['Authorization'] = "Bearer " + response.data.access_token;
        $ionicLoading.hide();

        $rootScope.ready = true;
        $state.go('tab.login');
    });


  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider, $sceDelegateProvider, OAuthProvider) {

  //The url to authenticate against
  var url = "http://10.139.2.25";

  //CORS
  $httpProvider.defaults.useXDomain = true;
  $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      url+'**']);

  OAuthProvider.configure({
    baseUrl: url,
    clientId: 'umbraco',
    clientSecret: null,
    grantPath: '/umbraco/oauth/token',
    revokePath: '/umbraco/oauth/revoke'
  });

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    .state('tab.login', {
      url: "/login",

      views: {
        'tab-login': {
          templateUrl: 'templates/tab-login.html',
          controller: 'LoginCtrl'
        }
      }

    })

    .state('tab.members', {
      url: "/members",

      views: {
        'tab-members': {
          templateUrl: 'templates/tab-members.html',
          controller: 'MembersCtrl'
        }
      }

    })
    

    .state('tab.account', {
      url: "/account",

      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }

    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/login');

});
