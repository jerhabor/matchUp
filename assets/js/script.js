$(document).ready(function() {
    var game = {
        leftDeck: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        rightDeck: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        init: function() {
            game.shuffleLeft()
            game.shuffleRight();
        },
        shuffleLeft: function() {
        var random = 0;
        var temp = 0;
        for (i = 1; i < game.leftDeck.length; i++) {
            random = Math.round(Math.random() * i);
            temp = game.leftDeck[i];
            game.leftDeck[i] = game.leftDeck[random];
            game.leftDeck[random] = temp;
            };
        console.log('Shuffled Left Deck Array: ' + game.leftDeck);
        },
        shuffleRight: function() {
        var random = 0;
        var temp = 0;
        for (i = 1; i < game.rightDeck.length; i++) {
            random = Math.round(Math.random() * i);
            temp = game.rightDeck[i];
            game.rightDeck[i] = game.rightDeck[random];
            game.rightDeck[random] = temp;
            };
        game.assignRightDeck();
        console.log('Shuffled Right Deck Array: ' + game.rightDeck);
        },
        assignRightDeck: function() {
            $('.right-card').each(function(index) {
            $(this).attr('data-card-value', game.rightDeck[index]);
            });
            game.clickHandlers();
        },
        clickHandlers: function() {
            $( ".right-card" ).on("click", function() {
                $(this).toggleClass("flip");
            }); // Function for the flip animation of the cards when clicked
            
            $('.right-card').on('click', function() {
            $(this).children('.card-front').html('<p>' + $(this).data('cardValue') + '</p>').addClass('selected');
            });
        }
    };
    game.init();


    $("#theme-toggle").click(function() {
        var lightDarkSwitch = $("#stylesheet");
        if (lightDarkSwitch.attr("href") == "assets/css/style.css") {
            lightDarkSwitch.attr("href", "assets/css/style-dark.css");
            console.log($("#stylesheet").attr("href"));
        }  else {
            lightDarkSwitch.attr("href", "assets/css/style.css");
            console.log($("#stylesheet").attr("href"));
        } // Function for the Light-Dark Theme Toggle
    });
    
});