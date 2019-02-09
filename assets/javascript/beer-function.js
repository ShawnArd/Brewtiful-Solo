$(document).ready(function () {

    $("#user-select").on("click", function() {
        $("#beer-table").empty()
        console.log("here")
        var beer = $("#beer-select").val().trim();
        console.log(beer)
    
        function ajax(choice) {
            var apiKeySand = "309601320ed870dade2bcc0dae4e05e5"
            for(let i=1; i<=10; i++) {
            var queryURL = "https://cors-anywhere.herokuapp.com/https://api.brewerydb.com/v2/beers/?key=" + apiKeySand+"&p="+i;
          
            $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
            console.log(response.data);
            results = response.data;
                for (let i =0; i< results.length;i++) {
                    if(results[i].style.shortName.split(" ").includes(choice))
                    
                        // Creating and storing a div tag and adding a class so you can float the gifs
                        var beerDiv = $("<div class='beer-div'>");
                                     
                        var p = $("<p>").text(results[i].name + ", abv: " + results[i].abv);
                
                        beerDiv.append(p);
                                                             
                        $("#beer-table").prepend(beerDiv);
                    
                
                }
            })
            }   
        }
        ajax(beer);
    });















})