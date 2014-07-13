(function(bc) {
  'use strict';
  bc.app = function($scope, $timeout) {

    $scope.MY_STATIONS_VIEW = "html/my-stations.html";
    $scope.MY_COMMUTE_VIEW = "html/my-commute.html";
    $scope.TRIP_PLANNER_VIEW = "html/trip-planner.html";

    $scope.HOME_KEY = "home";
    $scope.WORK_KEY = "work";

    $scope.STATION_ERROR_NO_DATA = "NO STATION DATA";
    $scope.STATION_ERROR_DUPLICATE_LOCATION = "DUPLICATE LOCATION";

    $scope.app = {
      view: null,
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
      bc.user.getPreferredStations(function(stations) {
        if (stations !== null) {
          $scope.app.myStations = stations;
          $scope.app.view = $scope.MY_COMMUTE_VIEW;
        } else {
          $scope.app.myStations = initMyStations();
          $scope.app.view = $scope.MY_STATIONS_VIEW;
        }

        $scope.updateView();
      });
    }());

  };
}(window.bc = window.bc || {}));