(function(bc) {
  'use strict';
  bc.myCommute = function($scope) {

    $scope.routes = [];

    function getDepartureStation(onStationRetrieved) {
      var departureStation;

      if (!$scope.app.myStations[0] || !$scope.app.myStations[0].stationData) {
        departureStation = null;
      } else {
        //TODO: use the location services to find the closer station
        departureStation = $scope.app.myStations[0];
      }

      onStationRetrieved(departureStation);
    }

    /**
     * Gets the route schedule data from bart
     * @param myDepartureStation
     * @param myArrivalStation
     * @param onSuccess - called with params
     *    myDepartureStation, myArrivalStation, schedule
     */
    function getRouteSchedule(myDepartureStation, myArrivalStation, onSuccess) {
      bc.bart.getRouteSchedule(myDepartureStation.stationData.abbr,
        myArrivalStation.stationData.abbr, function(schedule) {
          onSuccess(myDepartureStation, myArrivalStation, schedule)
        })
    }

    function onScheduleUpdated(myDepartureStation, myArrivalStation, schedule) {
      var expectedRoutes = $scope.app.myStations.length - 1;

      $scope.routes.push({
        departureStation: myDepartureStation,
        arrivalStation: myArrivalStation,
        schedule: schedule
      });

      // If we got all the routes, update the view
      if ($scope.routes.length === expectedRoutes) {
        $scope.updateView();
      }
    }


    /**
     * Finds all the routes between the departureStation and all other preferred
     * stations and refreshes the view when all data is collected
     * @param departureStation
     */
    $scope.updateCommuteFromStation = function(departureStation) {
      var i, station;

      $scope.routes = [];

      for (i = 0; i < $scope.app.myStations.length; i++) {
        station = $scope.app.myStations[i];
        if (station.stationData.abbr !== departureStation.stationData.abbr) {
          getRouteSchedule(departureStation, station, onScheduleUpdated);
        }
      }
    };

    // Init the app
    (function() {
      getDepartureStation(function(departureStation) {
        if (!departureStation) {
          // Shouldn't be here.
          // Need to get preferred stations before commute can be calculated
          $scope.app.view = $scope.MY_STATIONS_VIEW;
          $scope.updateView();
        } else {
          $scope.updateCommuteFromStation(departureStation);
        }
      });
    }());

  };
}(window.bc = window.bc || {}));