$(document).ready(function () {

var zipCodeInSearch = "";

$("#user-submit").on("click", function() {
    
    var userZipCode = $("#user-zip-code").val().trim();
    var userRadius = $("#distance-select").val().trim();
    // console.log(searchRadius, typeof searchRadius)
    zipCodeInSearch = userZipCode;
    // runSearch();
    
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
    

    var queryURL = "https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/" + apiKey + "/info.json/" + userZipCode + "/degrees";
   
    $.ajax({
        url: queryURL,
        method: "GET"
    }) .then(function(response) {
        console.log(response);
        

         var lat = response.lat;
       var lng = response.lng;
        console.log(lat);
        // userSearch.push({userLat: lat});
        
        console.log(response.lng);
        searchGooglePlaces(lat, lng, userRadius)
        embedMaps(lat, lng)
    })
    
        
};

function initMap() {

	var broadway = {
		info: '<strong>Chipotle on Broadway</strong><br>\
					5224 N Broadway St<br> Chicago, IL 60640<br>\
					<a href="https://goo.gl/maps/jKNEDz4SyyH2">Get Directions</a>',
		lat: 41.976816,
		long: -87.659916
	};

	var belmont = {
		info: '<strong>Chipotle on Belmont</strong><br>\
					1025 W Belmont Ave<br> Chicago, IL 60657<br>\
					<a href="https://goo.gl/maps/PHfsWTvgKa92">Get Directions</a>',
		lat: 41.939670,
		long: -87.655167
	};

	var sheridan = {
		info: '<strong>Chipotle on Sheridan</strong><br>\r\
					6600 N Sheridan Rd<br> Chicago, IL 60626<br>\
					<a href="https://goo.gl/maps/QGUrqZPsYp92">Get Directions</a>',
		lat: 42.002707,
		long: -87.661236
	};

	var locations = [
      [broadway.info, broadway.lat, broadway.long, 0],
      [belmont.info, belmont.lat, belmont.long, 1],
      [sheridan.info, sheridan.lat, sheridan.long, 2],
    ];

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: new google.maps.LatLng(41.976816, -87.659916),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var infowindow = new google.maps.InfoWindow({});

	var marker, i;

	for (i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map
		});

		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				infowindow.setContent(locations[i][0]);
				infowindow.open(map, marker);
			}
		})(marker, i));
	}
}



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
    }).then(function(response){
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
   });
};

//
}); //document ready closer
