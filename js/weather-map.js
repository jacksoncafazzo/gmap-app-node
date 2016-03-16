
var GMaps = require('gmaps');

$(document).ready(function () {
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
        panControl: false
    });
});
