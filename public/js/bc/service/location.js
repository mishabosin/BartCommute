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

}(window.bc = window.bc || {}));