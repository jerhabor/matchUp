$(document).ready(function() {
    
    // Countdown timer!
    var secondsLeftDisplay = $('#seconds-left');
    var secondsLeft = $('#seconds-left').text();
    
    console.log("Amount of seconds for this level: " + secondsLeft)
    
    $('.right-card').addClass('flip');

    countdown = function() {
        if (secondsLeft <= 1) {
            $('#timer').css("display","none");
            $('.right-card').removeClass('flip');
            $('.right-card').removeClass('disabled');
            $('.left-card').removeClass("no-display");
        } else {
        secondsLeft--;
        secondsLeftDisplay.text(secondsLeft);
        };
    };

    setInterval(countdown, 1000);

        

    // Game Play!
    var lives = 3;
    var livesRemaining = $('#lives-remaining');
    var currentLevel = 1;
    var newLevel = $('#level');

    var game = {
        allLeftDeck: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        leftDeck: [],
        rightDeck: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        selectedLeftCard: [],
        selectedRightCard: [],
        
        init: function() {
            game.shuffleLeft();
            game.shuffleRight();
        },

        shuffleLeft: function() { // Shuffles the left deck of cards
        var random = 0;
        var temp = 0;
        var j = 1;
        for (j; j < game.allLeftDeck.length; j++) { // Need to check that this shuffle method is ok!!!
            random = Math.round(Math.random() * j);
            temp = game.allLeftDeck[j];
            game.allLeftDeck[j] = game.allLeftDeck[random];
            game.allLeftDeck[random] = temp;
            }
        // game.leftDeck = [];
        game.leftDeck.push(game.allLeftDeck[0], game.allLeftDeck[1], game.allLeftDeck[2]);
        game.assignLeftDeck();
        console.log('Shuffle Left Deck Array: ' + game.leftDeck);
        },

        shuffleRight: function() { // Shuffles the right deck of cards
        var random = 0;
        var temp = 0;
        var i = 1;
        for (i; i < game.rightDeck.length; i++) {  // Need to check that this shuffle method is ok!!!
            random = Math.round(Math.random() * i);
            temp = game.rightDeck[i];
            game.rightDeck[i] = game.rightDeck[random];
            game.rightDeck[random] = temp;
            }
        game.assignRightDeck();
        console.log('Shuffled Right Deck Array: ' + game.rightDeck);
        },

        assignLeftDeck: function() {
            $('.left-card').each(function(index) {
                $(this).attr('data-card-value', game.leftDeck[index]);
                $(this).html('<p>' + $(this).data('cardValue') + '</p>');
            });
        },

        assignRightDeck: function() { // Gives each card a data value
            $('.right-card').each(function(index) {
                $(this).attr('data-card-value', game.rightDeck[index]);
                $(this).children('.card-front').html('<p>' + $(this).data('cardValue') + '</p>');
            });
            game.clickHandlers();
        },
        
        clickHandlers: function() {
            
            $('.left-card').on('click', function() { // Adds a '.selected' class to the element to cards on the right deck
            $(this).css("border","#000 2px solid");
                $(this).html('<p>' + $(this).data('cardValue') + '</p>').addClass('selected2');

                if (game.selectedLeftCard.length >= 0) {
                    game.selectedLeftCard = [];
                    $('.left-card').css("border","#000 1px solid").removeClass('selected2');
                    $(this).css("border","#000 2px solid").addClass('selected2');
                    game.selectedLeftCard.push($(this).data('cardValue'));
                    console.log(game.selectedLeftCard);
                } else {
                    game.selectedLeftCard = [];
                    game.selectedLeftCard.push($(this).data('cardValue'));
                }
            });

            $('.right-card').on('click', function() { // Adds a '.selected' class to the element to cards on the right deck
                $(this).toggleClass("flip");
                    game.selectedRightCard.push($(this).data('cardValue'));
                    console.log(game.selectedRightCard);
                    game.checkMatch();
            });
            
                
        },
        
        checkMatch: function() {
            if (game.selectedLeftCard[0] === game.selectedRightCard[0]) {
                $('.flip').css("opacity", "0");
                $('.selected2').css("opacity", "0");
                $('.selected2').removeClass('unmatched');
                game.selectedRightCard = [];
                game.selectedLeftCard = [];
                game.checkWin();
                // Remember to add sound effect of "Great" / "Well Done!"
            } else if ((game.selectedLeftCard.length === 0) && (game.selectedRightCard.length !== -1)) {
                alert ('Please select card from left deck first!');
                $('.right-card').removeClass('flip');
                $('.card-front').removeClass('selected');
                game.selectedRightCard = [];
            } else {
                alert('Unlucky!')
                $('.selected').parent().removeAttr('style');
                $('.left-card').css("border","#000 1px solid").removeClass('selected2');
                $('.right-card').removeClass('flip');
                $('.right-card').children().removeClass('selected');
                game.selectedRightCard = [];
                game.selectedLeftCard = [];
                game.decrementLife();
                
            }
        },

        decrementLife: function() {
            lives--;
            livesRemaining.text(lives);
            if (lives == 0) {
                alert('You have failed this level. Click ok to try this level again!');
                window.location.reload();
            } else {
                livesRemaining.text(lives);
            }
        },
        checkWin: function() {
            if ($('.unmatched').length === 0) {
                alert("WELL DONE ON COMPLETING THIS LEVEL!");
                currentLevel++;
                newLevel.text(currentLevel); // Increments user's level by 1 after user has successfully matched the left-side cards to the right-side.
                lives = 3;
                countdown();
                game.newGame();
            }   
        },
        newGame: function() {
        $('.right-card').removeAttr('style');
        $('.right-card').removeClass('flip');
        $('.left-card').removeAttr('style');
        $('.left-card').addClass('unmatched')
        game.selectedRightCard = [];
        game.selectedLeftCard = [];
        },
    };
    

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
    game.init();
});