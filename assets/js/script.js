$(document).ready(function() {
    var game = {
        leftDeck: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        rightDeck: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        selectedLeftCard: [],
        selectedRightCard: [],
        init: function() {
            game.shuffleLeft()
            game.shuffleRight();
        },

        shuffleLeft: function() { // Shuffles the left deck of cards
        var random = 0;
        var temp = 0;
        for (j = 1; j < game.leftDeck.length; j++) { // Need to check that this shuffle method is ok!!!
            random = Math.round(Math.random() * j);
            temp = game.leftDeck[j];
            game.leftDeck[j] = game.leftDeck[random];
            game.leftDeck[random] = temp;
            };
        console.log('Shuffled Left Deck Array: ' + game.leftDeck);
        },

        shuffleRight: function() { // Shuffles the right deck of cards
        var random = 0;
        var temp = 0;
        for (i = 1; i < game.rightDeck.length; i++) {  // Need to check that this shuffle method is ok!!!
            random = Math.round(Math.random() * i);
            temp = game.rightDeck[i];
            game.rightDeck[i] = game.rightDeck[random];
            game.rightDeck[random] = temp;
            };
        game.assignRightDeck();
        console.log('Shuffled Right Deck Array: ' + game.rightDeck);
        },

        assignRightDeck: function() { // Gives each card a data value
            $('.right-card').each(function(index) {
            $(this).attr('data-card-value', game.rightDeck[index]);
            });

            $('.left-card').each(function(index) {
            $(this).attr('data-card-value', game.leftDeck[index]);
            $(this).children('.card-front').html('<p>' + $(this).data('cardValue') + '</p>')
            });
            
            game.clickHandlers();
        },
        
        clickHandlers: function() {
            $('.right-card').on("click", function() { // Adds flip animation to the cards on the right deck when they are clicked
                $(this).toggleClass("flip");
            }); 

            $('.left-card').on("click", function() { // Function to toggle the border to indicate selection of cards on the left deck when clicked
                    $(this).css("border","#000 2px solid");
            });
            
            $('.left-card').on('click', function() { // Adds a '.selected' class to the element to cards on the right deck
                $(this).html('<p>' + $(this).data('cardValue') + '</p>').addClass('selected2');
                console.log($(this).data('cardValue'));

                if (game.selectedLeftCard.length > 0) {
                    game.selectedLeftCard = [];
                    $('.left-card').css("border","#000 1px solid").removeClass('selected2');
                    $(this).css("border","#000 2px solid").addClass('selected2');
                    game.selectedLeftCard.push($(this).data('cardValue'));
                    console.log(game.selectedLeftCard);
                } else {
                    game.selectedLeftCard = [];
                    game.selectedLeftCard.push($(this).data('cardValue'));
                    console.log(game.selectedLeftCard);
                };
            });

            $('.right-card').on('click', function() { // Adds a '.selected' class to the element to cards on the right deck
                $(this).children('.card-front').html('<p>' + $(this).data('cardValue') + '</p>').addClass('selected');
                console.log($(this).data('cardValue'));
                
                
                if (game.selectedRightCard.length > 0) {
                    alert('You can only pick one!'); // Alerts user that only one card on the right can be clicked!
                    game.selectedRightCard = [];
                    $('.right-card').removeClass('flip') // Turns all cards on the right deck to the back if more than one is clicked
                    $('.card-front').removeClass('selected');
                } else if ($(this).hasClass('flip')) {
                    game.selectedRightCard.push($(this).data('cardValue'));
                    console.log(game.selectedRightCard);
                } else {
                    game.selectedRightCard = [];
                    game.selectedRightCard.push($('.flip').data('cardValue'));
                    console.log(game.selectedRightCard);
                };
            game.checkMatch();
            });
            
        },

        checkMatch: function() {
            if (game.selectedLeftCard[0] === game.selectedRightCard[0]) {
                $('.selected').parent().css("opacity", "0");
                $('.selected2').css("opacity", "0");
                game.selectedRightCard = [];
                game.selectedLeftCard = [];
            } else {
                alert('Unlucky!');
                $('.left-card').css("border","#000 1px solid").removeClass('selected2');
                $('.right-card').removeClass('flip');
                game.selectedRightCard = [];
                game.selectedLeftCard = [];
            };
        }
    };
    game.init();

    // Function for the Light-Dark Theme Toggle
    $("#theme-toggle").click(function() {
        var lightDarkSwitch = $("#stylesheet");
        if (lightDarkSwitch.attr("href") == "assets/css/style.css") {
            lightDarkSwitch.attr("href", "assets/css/style-dark.css");
            console.log($("#stylesheet").attr("href"));
        }  else {
            lightDarkSwitch.attr("href", "assets/css/style.css");
            console.log($("#stylesheet").attr("href"));
        } 
    });
    
});