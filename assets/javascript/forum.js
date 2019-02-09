
var config = {
    apiKey: "AIzaSyAMvNCFUEHrKpAO84w1lSa87uymA4whoXE",
    authDomain: "project-1-forum.firebaseapp.com",
    databaseURL: "https://project-1-forum.firebaseio.com",
    projectId: "project-1-forum",
    storageBucket: "",
    messagingSenderId: "959023985490"
};
firebase.initializeApp(config);
var database = firebase.database();
$("#chatBtn").on("click", function (e) {
    e.preventDefault();

    var userChat = $("#user-input")
        .val()
        .trim();
    var userNameInput = $("#user-name").val().trim();

    if (userNameInput) {
        var newChat = {
            name: userNameInput,
            input: userChat,
            dateCreated: firebase.database.ServerValue.TIMESTAMP
        };
        database.ref().push(newChat);
        $("#user-name").val("");
        $("#user-input").val("");
        $("#time-show").val("");
    }
    else {

        $("#validation").text("Please provide your name");
    }

});


database.ref().on("child_added", function (childSnapshot) {
    var userNameDisp = childSnapshot.val().name;
    var newInput = childSnapshot.val().input;
    var time = childSnapshot.val().dateCreated;

    var timeCreated = moment(time).format('MMMM Do YYYY, h:mm:ss a');


    $("#chat-display").prepend("<div class ='display-text'><p>" + userNameDisp + ":  " + newInput + "<br>" + timeCreated + "</p></div>");

})

//need to create firebase
// push the user input to firebases
// get the information from firebase and display it on dom //
// need to get api//

//assign for user/
