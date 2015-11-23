angular.module('auth', ['ui.router', 'ngRoute'])
.config(function($urlRouterProvider, $stateProvider){
  $stateProvider
  .state('dashboard', {
    url: '/dashboard',
    views:{
      'mainView':{
        templateUrl: 'templates/dashboard.html'
      }
    }
  })
  .state('list', {
    url: '/list',
    views:{
      'mainView':{
        templateUrl: 'templates/list.html'
      }
    }
  })
$urlRouterProvider.otherwise('/dashboard');

});
