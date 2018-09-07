$(document).ready(function() {

//create array of animals, each animal in the array will have a button.  When clicked, the button becomes 10 gifs per animal

    var animals = ["rabbit", "star nosed mole","wombat", "blob fish", "pink fairy armadillo",
                    "aye-aye","tufted deer","dumbo octopus","naked mole rat","gobi jerboa"]

//make the gifs start animation with a click, and stop animation with a click (on click events)
$(".gif").on("click", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

//var animals = $.get("http://api.giphy.com/v1/gifs/search?q=" + animals + "&api_key=3zKbbHWlo7BZnA3InQdAQewinucfrcB3&limit=10");
//  animals.done(function(data) { console.log("success got data", data); });



function displayDemGifs() {

  
var animals  = $(this).attr("animal-gifs");
var queryURL= "http://api.giphy.com/v1/gifs/search?q=" + animals + "&api_key=3zKbbHWlo7BZnA3InQdAQewinucfrcB3&limit=10";

        // Creating an AJAX call for the specific animal button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
             console.log(response);
            // Creating a div to hold the gif
            var gifDiv = $("<div class='gif'>");
  
  
            // Retrieving the URL for the gif
            var imgURL = response.Gif;
  
            // Creating an element to hold the gif
            var image = $("<img>").attr("src", imgURL);
  
            // Appending the image
            gifDiv.append(image);
  
            // Putting the gifs above the previous gifs
            $("#animal-gifs").prepend(gifDiv);
          });
  
        }

        // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < animals.length; i++) {

          // Then dynamicaly generating buttons for each animal in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of animal-btn to our button
          a.addClass("animal-btn");
          // Adding a data-attribute
          a.attr("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a animal button is clicked
      $("#add-buttons").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        // Adding what user types from the textbox to our array
        animals.push(animal);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "animal-btn"
     // $(document).on("click", ".animal-btn", displayDemGifs);
     $(document.body).on("click", ".animal-btn", function() {

    })

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
  


})
