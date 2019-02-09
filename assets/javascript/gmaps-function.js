$(document).ready(function () {

var zipCodeInSearch = "";

$("#user-submit").on("click", function() {
    
    var userZipCode = $("#user-zip-code").val().trim();
    var userRadius = $("#distance-select").val().trim();
    // console.log(searchRadius, typeof searchRadius)
    zipCodeInSearch = userZipCode;
    // runSearch();
    console.log(zipCodeInSearch+"in")
    getCoordinates(zipCodeInSearch, userRadius)

    // return zipCodeInSearch;
});

// Zip Code API

function getCoordinates(zipCode, userRadius){
console.log(zipCode)
    var apiKey = 'qzKbuskfg5sIQkMo3t1ElpUusUOLgnuG5VCI8L9LGdi9rHaKaA8cE33ImOVcamEF';
    // console.log(process.env)
    // test zip code
    userZipCode = zipCode

    var lat = '41.921201';
    var lng = '-87.700934';
    searchGooglePlaces(lat, lng, userRadius)
    

    // var queryURL = "https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/" + apiKey + "/info.json/" + userZipCode + "/degrees";
   
    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }) .then(function(response) {
    //     console.log(response);
        

    //      var lat = response.lat;
    //    var lng = response.lng;
    //     console.log(lat);
    //     // userSearch.push({userLat: lat});
        
    //     console.log(response.lng);
    //     searchGooglePlaces(lat, lng, userRadius)
    //     embedMaps(lat, lng)
    // })
    
        
};



// getCoordinates();

// gmaps API --- something erroneous (permission for business search separate from permission for map embed?)

function embedMaps(lat, lng){
    console.log("embeded")
    var apiKey = "AIzaSyD2my8N7YcBl2BIR3v-IYBb3dqqHazJdBQ";

    // test geocoordinates for Logan Square, test radius for 5 miles
    var geocoordinates = lat+","+lng;
    

    // this URL is for 'google places' instead of 'google map embeds'. fix it.
    var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + geocoordinates + "&radius=" + userRadius + "&type=brewery&key=" + apiKey;
    // 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });

    // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=YOUR_API_KEY
};

function searchGooglePlaces(lat, lng, userRadius){
    let locations = []
    console.log('User Radius', userRadius)
    var apiKey = "AIzaSyDKJCcjoCqjxsghZXE9KPC8zS_ia6Jl8DQ";
    var geocoordinates = lat+","+lng;
    
    var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + geocoordinates + "&radius=" + userRadius + "&keyword=brewery&key=" + apiKey +"&limit=5";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(response.results[0].name, response.results[0].rating)
        var results = response.results;

    //   for (let i = 0; i <=results.length ; i++) {

    //     // Creating and storing a div tag and adding a class so you can float the gifs
    //     var brewDiv = $("<div class='brew-div'>");
      
    //     var p = $("<p>").text(results[i].name+ ", Rating: " + results[i].rating+ ", Address: "+results[i].vicinity);

    //     brewDiv.append(p);
        
    //     $("#brewery-table").prepend(brewDiv);
    //   }

    //  locations = [
    //     ['Bondi Beach', -33.890542, 151.274856, 4],
    //     ['Coogee Beach', -33.923036, 151.259052, 5],
    //     ['Cronulla Beach', -34.028249, 151.157507, 3],
    //     ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
    //     ['Maroubra Beach', -33.950198, 151.259302, 1]
    //   ];
  
    //   var map = new google.maps.Map(document.getElementById('map'), {
    //     zoom: 10,
    //     center: new google.maps.LatLng(-33.92, 151.25),
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   });
  
    //   var infowindow = new google.maps.InfoWindow();
  
    //   var marker;
  
    //   for (let i = 0; i < locations.length; i++) {  
    //     marker = new google.maps.Marker({
    //       position: new google.maps.LatLng(locations[i][1], locations[i][2]),
    //       map: map
    //     });
  
    //     google.maps.event.addListener(marker, 'click', (function(marker, i) {
    //       return function() {
    //         infowindow.setContent(locations[i][0]);
    //         infowindow.open(map, marker);
    //       }
    //     })(marker, i));
    //   }

    });
};

//
}); //document ready closer
