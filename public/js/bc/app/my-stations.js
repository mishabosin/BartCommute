(function(bc) {
  'use strict';
  bc.myStations = function($scope) {
    // List of available bart stations
    $scope.bartStations = null;

    // Used to determine when it's appropriate to show certain error messages
    $scope.isSubmitted = false;

    // Make a local version of myStations by cloning initialized data
    $scope.myStations = JSON.parse(JSON.stringify($scope.app.myStations));

    /**
     * Checks to make sure that all preferred stations are valid and updates the
     * error code on each based on their validity.
     * - Each preferred station has to have data associated with it
     * - Each station selection has to be unique
     * @returns {boolean} - true if form is valid
     */
    $scope.isFormValid = function() {
      var i,
        errorCode,
        stationData,
        locations = {},
        isFormValid = true;

      for (i = 0; i < $scope.myStations.length; i++) {
        errorCode = null;

        stationData = $scope.myStations[i].stationData;
        if (!stationData) {
          // Make sure a station is selected
          errorCode = $scope.STATION_ERROR_NO_DATA;
          isFormValid = false;
        } else {
          // Make sure the station is unique
          if (locations[stationData.abbr]) {
            errorCode = $scope.STATION_ERROR_DUPLICATE_LOCATION;
            isFormValid = false;
          } else {
            // Add this location to the used location hash
            locations[stationData.abbr] = 1;
          }
        }
        $scope.myStations[i].errorCode = errorCode;
      }

      return isFormValid;
    };

    /**
     * Saves the user's preferred stations and takes them to see the commute
     * estimates.
     */
    $scope.setStations = function() {
      $scope.isSubmitted = true;

      if (!$scope.isFormValid()) {
        return;
      }

      bc.user.savePreferredStations($scope.myStations, function() {
        $scope.app.myStations = $scope.myStations;
        $scope.setView($scope.MY_COMMUTE_VIEW);
      });
    };

    /**
     * Aborts the preferred stations update.
     *
     * If the user has preferred stations saved, take them to the commute page.
     * If no preferred stations, take them to trip planner.
     */
    $scope.cancel = function () {
      var havePreferred = $scope.app.myStations && $scope.app.myStations[0]
        && $scope.app.myStations[0].stationData;

      if (havePreferred) {
        $scope.setView($scope.MY_COMMUTE_VIEW);
      } else {
        $scope.setView($scope.TRIP_PLANNER_VIEW);
      }
    };

    // Init the view
    (function() {
      if (!$scope.app.bartStations) {
        bc.bart.getStations(function(stations) {
          $scope.app.bartStations = stations;
          $scope.updateView();
        });
      }
    }());

  };
}(window.bc = window.bc || {}));