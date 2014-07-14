(function(bc) {
  'use strict';
  bc.myCommute = function($scope) {

    $scope.routes = [];

    function getDepartureStation(onStationRetrieved) {
      $scope.app.loadingMsg = "Getting user location...";
      if (!$scope.app.myStations[0] || !$scope.app.myStations[0].stationData) {
        // Sanity check - make sure there are stations to pick from
        onStationRetrieved(null);

      } else {
        // Get the client location
        bc.location.getLocation(function(location) {
          $scope.dismissLocationError();
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
        distance = getDistance(
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

    /**
     * Calculate the distance between two geo locations. Taken from
     * http://stackoverflow.com/questions/27928/how-do-i-calculate-distance-between-two-latitude-longitude-points
     *
     * @param lat1
     * @param lon1
     * @param lat2
     * @param lon2
     * @returns {number} - distance between two locations in miles
     */
    function getDistance(lat1, lon1, lat2, lon2) {
      var R = 3963; // Radius of the earth in miles
      var dLat = deg2rad(lat2 - lat1);  // deg2rad below
      var dLon = deg2rad(lon2 - lon1);
      var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d;
    }

    function deg2rad(deg) {
      return deg * (Math.PI/180)
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

    $scope.dismissLocationError = function() {
      $scope.locationError = null;
    };

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