(function(bc) {
  'use strict';
  bc.app = function($scope, $timeout) {

    $scope.MY_STATIONS_VIEW = "html/my-stations.html";
    $scope.MY_COMMUTE_VIEW = "html/my-commute.html";
    $scope.TRIP_PLANNER_VIEW = "html/trip-planner.html";

    $scope.STATION_ERROR_NO_DATA = "NO STATION DATA";
    $scope.STATION_ERROR_DUPLICATE_LOCATION = "DUPLICATE LOCATION";

    $scope.LOCATION_ERROR_NOT_SUPPORTED = "NO LOCATION SERVICE";
    $scope.LOCATION_ERROR_PERMISSION_DENIED = "LOCATION PERMISSION DENIED";
    $scope.LOCATION_ERROR_POSITION_UNAVAILABLE = "LOCATION POSITION UNAVAILABLE";
    $scope.LOCATION_ERROR_TIMEOUT = "LOCATION TIMEOUT";
    $scope.LOCATION_ERROR_UNKNOWN = "LOCATION ERROR";

    $scope.app = {
      view: null,
      loadingMsg: null,
      bartStations: null,
      myStations: []
    };

    function initMyStations() {
      return [
        {
          label: "Home",
          goingLabel: "Going home",
          leavingLabel: "Coming from home",
          errorCode: null,
          stationData: null
        },{
          label: "Work",
          goingLabel: "Going to work",
          leavingLabel: "Coming from work",
          errorCode: null,
          stationData: null
        }
      ]
    }

    $scope.setView = function(view) {
      // Can manage hash tags in the url to support the back button (ng-view)
      $scope.app.view = view;
    };

    /**
     * Tell Angular to update the view when changes were made to the model
     * outside of Angular's knowledge
     */
    $scope.updateView = function() {
      $timeout(function(){});
    };

    // Init the app
    (function() {
      // Get the preferred user stations and redirect accordingly
      $scope.app.loadingMsg = "Retrieving preferred stations";

      bc.user.getPreferredStations(function(stations) {
        if (stations !== null) {
          $scope.app.myStations = stations;
          $scope.setView($scope.MY_COMMUTE_VIEW);
        } else {
          $scope.app.myStations = initMyStations();
          $scope.setView($scope.MY_STATIONS_VIEW);
        }
        $scope.app.loadingMsg = null;
        $scope.updateView();
      });
    }());

  };
}(window.bc = window.bc || {}));