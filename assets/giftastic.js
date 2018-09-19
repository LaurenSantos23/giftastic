$(document).ready(function() {

//create array of animals, each animal in the array will have a button.  When clicked, the button becomes 10 gifs per animal

    var animals = ["rabbit", "koala","wombat", "tarsier", "platypus", "salamander",
                    "duck","quokka","dumbo octopus","red panda","gobi jerboa", "axolotl", "desert rain frog"]



$("#buttons-view").on('click', ".animal-btn", "#animal-input", function() {
$("#animal-gifs").empty()
  var buttonValue = $(this).attr("data-name")

 // var animals  = $(this).attr("animal-gifs");
  var queryURL= "http://api.giphy.com/v1/gifs/search?q=" + buttonValue + "&api_key=3zKbbHWlo7BZnA3InQdAQewinucfrcB3&limit=10";
  console.log(queryURL)
        // Creating an AJAX call for the specific animal button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
             console.log(response);
             for(var i=0; i< response.data.length; i++){

           // create a div to store rating for gifs
            var ratingDiv = $("<div class='rating'>");     
            // var to store rating data
            var rating = response.data[i].rating;  
            // creating an element to have rating displayed
            var ratingDisplay = $("<p>").text("Rating:" + rating);
            var gifDiv = $("<div class='gif'>");

            $(ratingDiv).append(ratingDisplay);
            $(gifDiv).append(ratingDiv)
            console.log(rating);
          
            // Creating a div to hold the gif
            
            // Retrieving the URL for the gif
            var imgURL = response.data[i].images.fixed_height_still.url;

            // Creating an element to hold the gif
            var image = $("<img>")
            image.attr("src", imgURL);
            image.attr("data-still", imgURL)
            image.attr("data-animate",response.data[i].images.fixed_height.url)
            image.attr("data-state","still")
            image.addClass("gif")

            // Appending the image
            gifDiv.prepend(image);
  
            // Putting the gifs above the previous gifs
            $("#animal-gifs").prepend(gifDiv);
          }
          });
  
}) 

        // Function for displaying movie data
      function renderButtons() {

        // Deleting the gifs prior to adding new gifs
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of animals
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
      $("#addNewGifs").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();
        console.log("#animal-input")
        // Adding what user types from the textbox to our array
        animals.push(animal)

        // Calling renderButtons which handles the processing of our animal array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "animal-btn"
     $(document.body).on("click", ".animal-btn", "#animal-input", function() {

    })

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
      //make the gifs start animation with a click, and stop animation with a click (on click events)
      $("#animal-gifs").on('click', ".gif", function() {  
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

})
