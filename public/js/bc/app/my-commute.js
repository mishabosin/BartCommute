(function(bc) {
  'use strict';
  bc.myCommute = function($scope) {

    $scope.routes = [];

    function getDepartureStation(onStationRetrieved) {
      if (!$scope.app.myStations[0] || !$scope.app.myStations[0].stationData) {
        // Sanity check - make sure there are stations to pick from
        onStationRetrieved(null);

      } else {
        // Get the client location
        $scope.app.loadingMsg = "Getting user location...";
        bc.location.getLocation(function(location) {
          $scope.locationError = null;
          onStationRetrieved(getClosestStation(location));

        }, function(error) {
          // No location information - return the first preferred station
          setLocationErrorMsg(error);
          onStationRetrieved($scope.app.myStations[0]);

        });
      }
    }

    function getClosestStation(location) {
      var i, distance, closestStation;

      for (i = 0; i < $scope.app.myStations.length; i++) {
        distance = bc.location.getDistance(
          location.coords.latitude,
          location.coords.longitude,
          $scope.app.myStations[i].stationData.gtfs_latitude,
          $scope.app.myStations[i].stationData.gtfs_longitude);
        $scope.app.myStations[i].distance = distance;

        if (!closestStation || distance < closestStation.distance) {
          closestStation = $scope.app.myStations[i];
        }
      }

      return closestStation;
    }

    function setLocationErrorMsg(error) {
      switch(error.code) {
        case error.SERVICE_UNAVAILABLE:
          $scope.locationError = $scope.LOCATION_ERROR_NOT_SUPPORTED;
          break;
        case error.PERMISSION_DENIED:
          $scope.locationError = $scope.LOCATION_ERROR_PERMISSION_DENIED;
          break;
        case error.POSITION_UNAVAILABLE:
          $scope.locationError = $scope.LOCATION_ERROR_POSITION_UNAVAILABLE;
          break;
        case error.TIMEOUT:
          $scope.locationError = $scope.LOCATION_ERROR_TIMEOUT;
          break;
        default :
          $scope.locationError = $scope.LOCATION_ERROR_UNKNOWN;
          break;
      }
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
        $scope.app.loadingMsg = null;
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

      $scope.app.loadingMsg = "Loading departure times...";
      $scope.updateView();
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
          $scope.setView($scope.MY_STATIONS_VIEW);
          $scope.app.loadingMsg = null;
          $scope.updateView();
        } else {
          $scope.updateCommuteFromStation(departureStation);
        }
      });
    }());

  };
}(window.bc = window.bc || {}));