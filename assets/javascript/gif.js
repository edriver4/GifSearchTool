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

var shows = [
    "entourage",
    "game of thrones",
    "ozark",
    "frontier",
    "ballers",
    "westworld",
    "hard knocks",
    "dragon ball z",
    "band of brothers",
    "californication",
];


$(document).on("click", ".favShow-btn", function() {
    var type = $(this).attr("data-type")
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${type}&api_key=nAYiFzfJkuua9j5fYUuu56apbYxVYmEp`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log('Response from giphy====>', response);
        var { data } = response
        console.log('data', data);
    })

});



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


$("#submit-button").on("click", function(event){

    var usersShow = $("#series-input").val().trim();

    shows.push(usersShow);

    populateButtons();
});



populateButtons();