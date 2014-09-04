(function(bc) {
  'use strict';
  bc.bcApp = angular.module('bcApp', ['ngRoute']);

  bc.bcApp.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/commute', {
          controller:'myCommute',
          templateUrl:'html/my-commute.html'
        })
        .when('/stations', {
          controller:'myStations',
          templateUrl:'html/my-stations.html'
        })
        .when('/planner', {
          controller:'',
          templateUrl:'html/trip-planner.html'
        })
        .otherwise({
          redirectTo:'/commute'
        });
    }]);
}(window.bc = window.bc || {}));