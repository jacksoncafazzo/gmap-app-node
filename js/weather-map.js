var GMaps = require('gmaps');
var apiKey = "d23ec3e8f93b21ade5903329633865b3";
// //weather api for london:
// //http://api.openweathermap.org/data/2.5/find?lat=51.5073346&lon=-0.1276831&cnt=10&appid=b1b15e88fa797225412429c1c50c122a
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
        lat: -12.043333,
        lng: -77.028333
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

        var content;
        var content = $.get('http://api.openweathermap.org/data/2.5/find?lat=' + lat + '&lon=' + lng + '&cnt=10&appid=d23ec3e8f93b21ade5903329633865b3').then(function(response) {
          console.log(response.list[0].main);
          var location = responce.list[0].main;

        content = "<p>The humidity in is " + response.message + "</p>";
        }).fail(function(error) {
        $('.showWeather').text(error.message);
        });

        var template = $('#edit_marker_template').text();
        // var content = "<p>Latitude " + lat + "</p>";

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
