(function(bc) {
  'use strict';

  var BART_API_ACCESS_KEY = "MW9S-E7SL-26DU-VV8V";

  // BART api
  bc.bart = {};

  /**
   * Gets a list of bart stations
   * http://api.bart.gov/docs/stn/stns.aspx
   * @param onSuccess - the array of station objects is passed as a parameter
   * @param onError
   */
  bc.bart.getStations = function(onSuccess, onError) {
    $.ajax({
      url: "http://api.bart.gov/api/stn.aspx?cmd=stns&key=" + BART_API_ACCESS_KEY,
      success: function(data) {
        var x2js = new X2JS();
        var stationsData = x2js.xml2json(data);
        var stations = stationsData.root.stations.station;

        console.log("Retrieved station data for " + stations.length + " BART stations");
        //console.log(stations);

        onSuccess(stations);
      },
      error: function(jqXHR, status, error) {
        console.error("Failed to get station data from BART");
        if (onError) {
          onError(jqXHR, status, error);
        }
      }
    });
  };

  /**
   * Gets the current schedule between two stations
   * http://api.bart.gov/docs/sched/depart.aspx
   * @param startStationAbbr
   * @param endStationAbbr
   * @param onSuccess - the resulting schedule object is passed as a parameter
   * @param onError
   */
  bc.bart.getRouteSchedule = function(startStationAbbr, endStationAbbr,
                                      onSuccess, onError) {
    $.ajax({
      url: "http://api.bart.gov/api/sched.aspx?cmd=depart&orig="
        + startStationAbbr + "&dest=" + endStationAbbr + "&key="
        + BART_API_ACCESS_KEY,
      success: function(data) {
        var x2js = new X2JS();
        var scheduleData = x2js.xml2json(data);
        var schedule = scheduleData.root.schedule.request.trip;

        console.log("Retrieved the schedule between " + startStationAbbr
          + " and " + endStationAbbr);
        //console.log(schedule);

        onSuccess(schedule);
      },
      error: function(jqXHR, status, error) {
        console.error("Failed to get schedule data between " + startStationAbbr
          + " and " + endStationAbbr + " from BART");
        if (onError) {
          onError(jqXHR, status, error);
        }
      }
    });
  }

}(window.bc = window.bc || {}));