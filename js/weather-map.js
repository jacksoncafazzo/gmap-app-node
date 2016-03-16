var GMaps = require('gmaps');
var apiKey = "d23ec3e8f93b21ade5903329633865b3";

var map;
// Update position
$(document).on('submit', '.edit_marker', function(e) {
    e.preventDefault();
    var $index = $(this).data('marker-index');
    $lat = $('#marker_' + $index + '_lat').val();
    $lng = $('#marker_' + $index + '_lng').val();
    var template = $('#edit_marker_template').text();
    // Update form values
    var content = template.replace(/{{index}}/g, $index).replace(
        /{{lat}}/g, $lat).replace(/{{lng}}/g, $lng);
    map.markers[$index].setPosition(new google.maps.LatLng($lat, $lng));
    map.markers[$index].infoWindow.setContent(content);
    $marker = $('#markers-with-coordinates').find('li').eq(0).find('a');
    $marker.data('marker-lat', $lat);
    $marker.data('marker-lng', $lng);
});
// Update center
$(document).on('click', '.pan-to-marker', function(e) {
    // e.preventDefault();
    var lat, lng;
    var $index = $(this).data('marker-index');
    var $lat = $(this).data('marker-lat');
    var $lng = $(this).data('marker-lng');
    if ($index != undefined) {
        // using indices
        var position = map.markers[$index].getPosition();
        lat = position.lat();
        lng = position.lng();
    } else {
        // using coordinates
        lat = $lat;
        lng = $lng;
    }
    map.setCenter(lat, lng);
});
$(document).ready(function() {
    map = new GMaps({
        div: '#map',
        lat: 45.5200,
        lng: 122.6819
    });

    GMaps.on('marker_added', map, function(marker) {
        $('#markers-with-index').append(
            '<li><a href="#" class="pan-to-marker" data-marker-index="' +
            map.markers.indexOf(marker) + '">' + marker.title +
            '</a></li>');
        $('#markers-with-coordinates').append(
            '<li><a href="#" class="pan-to-marker" data-marker-lat="' +
            marker.getPosition().lat() +
            '" data-marker-lng="' + marker.getPosition().lng() +
            '">' + marker.title + '</a></li>');
    });
    GMaps.on('click', map.map, function(event) {
        var index = map.markers.length;
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();

        $.getJSON('http://api.openweathermap.org/data/2.5/find?lat=' + lat + '&lon=' + lng + '&cnt=10&appid=c7adaab3f10da30791ccdeeee0c3d029',function(result){

          var content = "<p> Temperature: " + (Math.ceil((result.list[0].main.temp - 273.15))* 1.800 + 32) + "</p>" + "<p>" + result.list[0].weather[0].description + "</p>";
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
