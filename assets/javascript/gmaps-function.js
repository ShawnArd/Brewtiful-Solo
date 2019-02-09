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
    var apiKey = 'ST0tiPiOJyYCgPyT9KnK5exY5K9WxAdKwsrqkK6wIjRtFRo9JgJ2TxOCVxVlXZ9L';
    // console.log(process.env)
    // test zip code
    userZipCode = zipCode
    

    var queryURL = "https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/" + apiKey + "/info.json/" + userZipCode + "/degrees";
   
    $.ajax({
        url: queryURL,
        method: "GET"
    }) .then(function(response) {
        console.log(response);
         var lat = response.lat;
       var lng = response.lng;
        // console.log(lat);
        // // userSearch.push({userLat: lat});
        
        // console.log(response.lng);
        searchGooglePlaces(lat, lng, userRadius)
        // embedMaps(lat, lng)
    })
    
        
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

      for (let i = 0; i <=results.length ; i++) {

        // Creating and storing a div tag and adding a class so you can float the gifs
        var brewDiv = $("<div class='brew-div'>");
      
        var p = $("<p>").text(results[i].name+ ", Rating: " + results[i].rating+ ", Address: "+results[i].vicinity);

        brewDiv.append(p);
        
        $("#brewery-table").prepend(brewDiv);
      }

    });
};

//
}); //document ready closer
