// 1) Display all of the preloaded buttons from our initial array when index.html loads
// How could I do that?
//I could do a function that populates the initial list of the series array.
// How could I make an array where if another user types in there favorite show that it adds to the initial array?
// I could use the Let, that way the array can change (users can add to the array).
// How could I make the buttons of the initial array appear when the index.html file loads?
// I could have a function that will create the buttons.
// How could I make the buttons be created when I click the submit button?
//I could have a function that creates the buttons when the user clicks submit

// 2) When the buttons that are displayed on the page are clicked they display the gifs
// How can I make the buttons that were created display a gif when they are clicked by the user?
// I could have an event fuction that when the button is clicked it displays the gifs
// Where am I going to get the gifs from?
// I am going to get the gifs from the source that is assigned to a variable.  The source is going to come from the giphy api.
// How can I make a function that recieves the gif from a response and then load those responses?
// I could have a .then(function(response)){} that then prepends the gif to the div view gif.

// 3) When the gif is clicked it plays the gif and when it is clicked again it stops the gif.
// How could I make the image when clicked play?
// I could have a click function.

// Array of Shows.
var shows = [
    "entourage",
    "game of thrones",
    "ozark",
    "the simpsons",
    "ballers",
    "the office",
    "hard knocks",
    "dragon ball z",
    "band of brothers",
    "californication",
];

// When the user clicks on their favorite show button the user gets a limit of 30 gifs.
$(document).on("click", ".favShow-btn", function () {
    var type = $(this).attr("data-type")
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${type}&api_key=nAYiFzfJkuua9j5fYUuu56apbYxVYmEp&limit=10`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log('Response from giphy====>', response);
        var { data } = response
        console.log('data', data);

        // Looping through each result item.
        for (var j = 0; j < data.length; j++) {

            // Creating and storing a div tag
            var favShowDiv = $("<div>").addClass("d-inline-block");

            // Creating a paragraph tag with the data item's rating.
            var r = $("<p>").text("Rating: " + data[j].rating);
            console.log(data[j].rating);

            // Creating and storing an image tag.
            var favShowImage = $("<img>");
                favShowImage.addClass("gif-image");
            // Setting the src attribute of the image to a property pulled off the data item.
            favShowImage.attr("src", data[j].images.fixed_height_still.url);
            favShowImage.attr("data-still", data[j].images.fixed_height_still.url);
            favShowImage.attr("data-animate", data[j].images.fixed_height.url);
            favShowImage.attr("data-state", "still");


        //    var state = favShowImage.attr("data-state");
            // Appending the paragraph (rating) and the image to the favShowDiv.
            favShowDiv.append(r);
            favShowDiv.append(favShowImage);

            // Prepending the favShowDiv to the HTML page in the "#view-gif" div.
            $("#view-gif").prepend(favShowDiv);
        }
        $(".gif-image").on("click", function(){
        var state = $(this).attr("data-state");
        
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else{
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
        });
    });

});


// This function populates the button.  In other words it creates the user's input for their show and makes a button.
// This function also gives the button a class, an attribute, and puts the text within the button.
// Then it appends the button to the view button div.
function populateButtons() {
    $("#view-button").empty();

    for (var i = 0; i < shows.length; i++) {
        var a = $("<button>");
        a.addClass("favShow-btn");
        a.attr("data-type", shows[i])
        a.text(shows[i]);
        $("#view-button").append(a);
    }
};

// When the submit button is clicked it pushes the user's input to the show array and then the populateButtons() function is called and creates that button.
$("#submit-button").on("click", function (event) {

    var usersShow = $("#series-input").val().trim();

    shows.push(usersShow);

    populateButtons();
});



populateButtons();