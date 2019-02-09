var config = {
  apiKey: "AIzaSyATTX_RG7krqTtekWvE80CZt1_We4vzLnI",
  authDomain: "brewtiful-7d460.firebaseapp.com",
  databaseURL: "https://brewtiful-7d460.firebaseio.com",
  projectId: "brewtiful-7d460",
  storageBucket: "brewtiful-7d460.appspot.com",
  messagingSenderId: "244126403566"
};
firebase.initializeApp(config);
var dataRef = firebase.database();



$('#email-us').on("click", function () {
  event.preventDefault();

  var first = $("#firstname-input").val().trim();
  var last = $("#lastname-input").val().trim();
  var phone = $("#phone-input").val().trim();
  var email = $("#email-input").val().trim();
  var comment = $("#comment-input").val().trim();

  if (first && last && phone && email && comment) {


    // Code for the push
    dataRef.ref().push({

      first: first,
      last: last,
      phone: phone,
      email: email,
      comment: comment,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    //clear values after pushing to database
    $("#firstname-input").val("");
    $("#lastname-input").val("");
    $("#phone-input").val("");
    $("#email-input").val("");
    $("#comment-input").val("");
    window.location.href = `mailto:brewtifulApp@gmail.com?subject=App%20Comments&body=${final}`;
  }
  if (!first) {
    $("#firstNameValidation").text("Required Field");
  } if (!last) {
    $("#lastNameValidation").text("Required Field");
  } if (!phone) {
    $("#phoneValidation").text("Required Field");
  } if (!email) {
    $("#emailValidation").text("Required Field");
  } if (!comment) {
    $("#messageValidation").text("Required Field");

  }
  console.log(first)

  var final = comment + " " +
    first + " " + last + " " +
    phone + " " +
    email;

  console.log("here")

});