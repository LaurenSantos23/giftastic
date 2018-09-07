$(document).ready(function() {

//create array of animals, each animal in the array will have a button.  When clicked, the button becomes 10 gifs per animal

    var animals = ["rabbit", "star nosed mole","wombat", "blob fish", "pink fairy armadillo",
                    "aye-aye","tufted deer","dumbo octopus","naked mole rat","gobi jerboa"]

//make the gifs start animation with a click, and stop animation with a click (on click events)


//format the search bar to populate a new set of 10 gifs based on the user's search term

//javascript, jQuery
function displayDemGifs() {

var animals  = $(this).attr("animal-gifs");
var queryURL= "http://api.giphy.com/v1/gifs/search?q=" + animals + "&api_key=3zKbbHWlo7BZnA3InQdAQewinucfrcB3&limit=10";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
  
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
      $(document).on("click", ".animal-btn", displayDemGifs);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
  


})
