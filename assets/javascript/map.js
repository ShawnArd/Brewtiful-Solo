var searchLat;
var searchLng;
var address;
var resultsName = [];
var resultsLat = [];
var resultsLng = [];
var query;
var markerArr = [];
var resultsAddress = [];
var resultsId = [];

/** Initialize the map information
 *
 * Using the latitude and longitude from firebase, this sets the map on those coordinates and sets the zoom.
 * This also pushes the results from the FOURSQUARE query into a list that is displayed next to the map.
 *
 * This gets called as part of the Google maps API.
 */
function initMap() {
    //this functional has to match final call
    var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 41.921201, lng: -87.700934 },
        zoom: 13,
        zoomControl: true,
        mapTypeControl: false,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.TOP_CENTER
        },
        streetViewControl: true,
        fullScreenControl: true
    });
    $("#listHolder ol").empty();
    for (var i = 0; i < resultsLat.length; i++) {
        var latlng = { lat: resultsLat[i], lng: resultsLng[i] };

        var marker = new google.maps.Marker({
            position: latlng,
            label: `${i + 1}`,
            map: map
        });
        markerArr.push(marker);
        $("#listHolder ol").append(
            $(
                `<a data-toggle="collapse" href="#collapseLinks${i}" role="button" aria-expanded="false" aria-controls="collapseLinks"><li class="list-group-item">${i + 1}) ${
                    resultsName[i]
                }<ul><li class='collapse' id='collapseLinks${i}'><a id='directionsLink' href='https://www.google.com/maps/place/${
                    resultsAddress[i]
                }'>Directions</a></li><li class='collapse' id='collapseLinks${i}'><a id='fourSquareLink' href='https://foursquare.com/v/${
                    resultsId[i]
                }'>FOURSQUARE</a></li></ul></li></a>`
            )
        );
    }
    for (var i = 0; i < resultsLat.length; i++) {
        markerArr[i].setMap(map);
    }
}

function convertResults(results) {
    resultsName = []
    resultsLat = []
    resultsLng = []
    resultsAddress = []
    resultsId = []

    for (let i = 0; i < results.length; i++) {
        resultsName.push(results[i].name);
        resultsLat.push(results[i].geometry.location.lat);
        resultsLng.push(results[i].geometry.location.lng);
        resultsAddress.push(results[i].vicinity);
        resultsId.push((i+1).toString());
    }
}

function getCoordinates(zipCode, userRadius){
    console.log(zipCode)
        var apiKey = 'qzKbuskfg5sIQkMo3t1ElpUusUOLgnuG5VCI8L9LGdi9rHaKaA8cE33ImOVcamEF';
        // console.log(process.env)
        // test zip code
        userZipCode = zipCode
    
        var lat = '41.921201';
        var lng = '-87.700934';
        searchGooglePlaces(lat, lng, userRadius)
}

function searchGooglePlaces(lat, lng, userRadius){

    var apiKey = "AIzaSyDKJCcjoCqjxsghZXE9KPC8zS_ia6Jl8DQ";
    var geocoordinates = lat+","+lng;
    
    var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + geocoordinates + "&radius=" + userRadius + "&keyword=brewery&key=" + apiKey +"&limit=5";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        let results = response.results;
        convertResults(results);

        
    $("#appendedScript").remove();
    $("body").append(
        $(
            '<script id="appendedScript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDTRZnTY1WZnpDwoOT5K6hJSY4kwHx69BI&callback=initMap"type="text/javascript"></script>'
        )
    );

    // clearMarkers();

    $("ol").remove();
    $("#listHolder").append($("<ol>"));
    for (var i = 0; i < resultsLat.length; i++) {
        markerArr[i].setMap(map);
    }
   });
};

/**
 * Clear markers from the Google map. Used for each gmaps/FOURSQUARE query to remove previous search pins.
 */
// function clearMarkers() {
//     for (var i = 0; i < markerArr[i].length; i++) {
//         markerArr[i].setMap(null);
//         //existing markers are set to null will still show if not
//     }
//     markerArr = []; //markers are removed
// }

$(document).on("click", "#user-submit", function(event) {
    event.preventDefault();

    var userZipCode = $("#user-zip-code").val().trim();
    var userRadius = $("#distance-select").val().trim();

    getCoordinates(userZipCode, userRadius)

});


// $("#user-submit").on("click", function() {
//     event.preventDefault();
//     address = $("#location").val();
//     let resultsName = [];
//     let resultsLat = [];
//     let resultsLng = [];
//     let resultsAddress = [];
//     let resultsId = [];

//     $.ajax({
//         async: false,
//         url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyA_8m3vV01mZAdSvesbW3G2rkoHLW4WP2s`,
//         method: "GET"
//     }).then(function(response) {
//         searchLat = response.results[0].geometry.location.lat;
//         searchLng = response.results[0].geometry.location.lng;

//         $.ajax({
//             async: false,
//             url: `https://api.foursquare.com/v2/venues/explore?client_id=XLARRNIFOXVD2CYYWZTPLXOXPI3BFBECOJTZEVZAI0OCO01S&client_secret=TNAAYAFVDDSPVDK1RTGIW2VPZTBKCOAVYVXSYEBBU2MXF015&v=20180323&section=${query}&limit=30&ll=${searchLat},${searchLng}`,
//             method: "GET"
//         }).then(function(response) {
//             printResults(response);
//             $("#appendedScript").remove();
//             $("body").append(
//                 $(
//                     '<script id="appendedScript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA_8m3vV01mZAdSvesbW3G2rkoHLW4WP2s&callback=initMap"type="text/javascript"></script>'
//                 )
//             );
//         });
//     });

//     clearMarkers();

//     $("ol").remove();
//     $("#listHolder").append($("<ol>"));
//     for (var i = 0; i < resultsLat.length; i++) {
//         markerArr[i].setMap(map);
//     }
// });
