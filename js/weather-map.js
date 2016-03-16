var GMaps = require('gmaps');
//weather api for london:
//http://api.openweathermap.org/data/2.5/find?lat=51.5073346&lon=-0.1276831&cnt=10&appid=b1b15e88fa797225412429c1c50c122a
$(document).ready(function() {
    var map = new GMaps({
        div: '#map',
        lat: 51.5073346,
        lng: -0.1276831,
        width: '500px',
        height: '500px',
        zoom: 12,
        zoomControl: true,
        zoomControlOpt: {
            style: 'SMALL',
            position: 'TOP_LEFT'
        },
        panControl: false,
    });
    map.setContextMenu({
        control: 'map',
        options: [{
            title: 'Add marker',
            name: 'add_marker',
            action: function(e) {
                this.addMarker({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                    title: 'New marker'
                });
            }
        }, {
            title: 'Center here',
            name: 'center_here',
            action: function(e) {
                this.setCenter(e.latLng.lat(), e.latLng
                    .lng());
            }
        }]
    });
});
