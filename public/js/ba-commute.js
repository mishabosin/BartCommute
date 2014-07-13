/**
 * Created by misha on 7/8/14.
 */
(function($, bc) {
    'use strict';

    var userLocation;

    function onPositionUpdate(position) {
        userLocation = position;
        console.log(userLocation);
    }

    function onPositionUnavailable(error) {
        var msg;
        console.log("Failed to update position with code: " + error.code);
        console.log(error);
        switch(error.code) {
            case error.PERMISSION_DENIED:
                msg = "User denied the request for Geolocation.";
                break;
            case error.POSITION_UNAVAILABLE:
                msg = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                msg = "The request to get user location timed out.";
                break;
            default :
                msg = "An unknown error occurred.";
                break;
        }
        console.log(msg);
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onPositionUpdate, onPositionUnavailable);
        } else {
            console.error("geolocation not available");
        }
    }

    function getListOfStations() {
        var BART_API_ACCESS_KEY = "MW9S-E7SL-26DU-VV8V";

        $.ajax({
            url: "http://api.bart.gov/api/stn.aspx?cmd=stns&key=" + BART_API_ACCESS_KEY,
            success: function(stationData) {
                console.log(stationData);
            },
            error: function() {
                console.error("Failed to get station data");
            }
        });
    }

    $(function() {
        console.log("Hello world!");
        getLocation();
        getListOfStations();
    });

}(window.jQuery, window.bc = window.bc || {}));
