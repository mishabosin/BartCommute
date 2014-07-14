(function(bc) {
  'use strict';

  bc.location = {};

  /**
   * Gets the client location
   * @param onSuccess - passes the location object
   * @param onFail - passes the error
   */
  bc.location.getLocation = function(onSuccess, onFail) {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onFail);
    } else {
      onFail({SERVICE_UNAVAILABLE: -1, code: -1});
    }

  };

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
  bc.location.getDistance = function(lat1, lon1, lat2, lon2) {
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
  };

  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

}(window.bc = window.bc || {}));