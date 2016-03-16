var GMaps = require('gmaps');
var apiKey = "d23ec3e8f93b21ade5903329633865b3";

var map;


$(document).ready(function() {
    map = new GMaps({
        div: '#map',
        lat: 45.536951,
        lng: -122.649971,
        zoom: 4
    });

    $('#geocoding_form').submit(function(e){
        e.preventDefault();
        console.log(map);
        GMaps.geocode({
          address: $('#address').val().trim(),
          callback: function(results, status){
            if(status=='OK'){
              console.log(map);
              var latlng = results[0].geometry.location;
              map.setCenter(latlng.lat(), latlng.lng());
              map.addMarker({
                lat: latlng.lat(),
                lng: latlng.lng()
              });
            }
          }
        });
      });

    GMaps.on('click', map.map, function(event) {
        var index = map.markers.length;
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();

        $.getJSON('http://api.openweathermap.org/data/2.5/find?lat=' + lat + '&lon=' + lng + '&cnt=10&appid=c7adaab3f10da30791ccdeeee0c3d029',function(result){

          var content = "<p>City: " + result.list[0].name + "</p>" + "<p>Temperature: " + (Math.ceil((result.list[0].main.temp - 273.15))* 1.800 + 32) + "</p>" + "<p>Weather: " + result.list[0].weather[0].description + "</p>";
          var template = $('#edit_marker_template').text();

          map.addMarker({
              lat: lat,
              lng: lng,
              title: 'Marker #' + index,
              infoWindow: {
                  content: content
              }
            });
        });
    });
});
