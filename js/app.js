
"use strict";

$(document).ready(function(){
    var mapElem = document.getElementById('map');
    var center = {
        lat: 47.6,
        lng: -122.3
    };

    var map = new google.maps.Map(mapElem, {
        center: center,
        zoom: 12
    });

    var infoWindow = new google.maps.InfoWindow();

    var cameras;
    var markers = [];

    $.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
        .done(function(data, itemIndex) {
            cameras = data;
            data.forEach(function(camera) {
                var marker = new google.maps.Marker({
                    position: {
                        lat: Number(camera.location.latitude),
                        lng: Number(camera.location.longitude)
                    },
                    map: map
                });
                markers.push(marker);

                google.maps.event.addListener(marker, 'click', function() {
                    var html = '<h2>' + camera.cameralabel + '</h2>'
                                + '<p>' + '<img src=' + camera.imageurl.url + ' alt="Camera Image Feed">' + '</p>';
                    infoWindow.setContent(html);
                    infoWindow.open(map, this);
                });
            });
        })
        .fail(function(error) {
            console.log(error);
        })
        .always(function() {
            $('#ajax-loader').fadeOut();
        });
});

