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
    document.getElementById("map").style.display = "block"
    //this functional has to match final call
    var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: searchLat, lng: searchLng },
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

        var apiKey = 'qzKbuskfg5sIQkMo3t1ElpUusUOLgnuG5VCI8L9LGdi9rHaKaA8cE33ImOVcamEF';
    
        var queryURL = "https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/" + apiKey + "/info.json/" + zipCode + "/degrees";
   
        $.ajax({
            url: queryURL,
            method: "GET"
        }) .then(function(response) {
            console.log(response);
            
    
            searchLat = response.lat;
            searchLng = response.lng;
          
            searchGooglePlaces(searchLat, searchLng, userRadius)
        })
        
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

    let userZipCode = $("#user-zip-code").val().trim();
    let userRadius = $("#distance-select").val().trim();

    getCoordinates(userZipCode, userRadius)

});

