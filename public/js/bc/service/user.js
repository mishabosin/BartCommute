(function(bc) {
  'use strict';
  // Local storage key
  var STATIONS_KEY = "mystations";

  // User Services
  bc.user = {};

  /**
   * Retrieves the stations object that contains the user's preferred stations
   * If not found, returns null.
   *
   * @returns {*}
   */
  bc.user.getPreferredStations = function(onSuccess) {
    var stationJson = localStorage.getItem(STATIONS_KEY);
    var myStations;

    if (!stationJson) {
      myStations = null;
    } else {
      myStations = JSON.parse(stationJson);
    }

    // A bit silly now, but if we go to the server instead of local storage,
    // this would be necessary.
    if (onSuccess) {
      onSuccess(myStations);
    }
  };

  /**
   * Serializes and saves the station data. When update is complete, trigger
   * onSuccess
   * @param stations
   * @param onSuccess - function to be executed when
   */
  bc.user.savePreferredStations = function(stations, onSuccess) {
    var stationJson;

    if (!stations) {
      localStorage.removeItem(STATIONS_KEY);
    }

    stationJson = JSON.stringify(stations);
    localStorage.setItem(STATIONS_KEY, stationJson);

    // A bit silly now, but if we go to the server instead of local storage,
    // this would be necessary.
    if (onSuccess) {
      onSuccess();
    }
  };

}(window.bc = window.bc || {}));