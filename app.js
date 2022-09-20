//UPPERCASE COMMENT --- Category
//lowercase comment --- Line explanation

// Check if document is fully loaded
$(document).ready(function(){
    //VARIABLES
    // Important element declaration
    let buttonStart = $('#start-test')
    let core = $(".main-container");

    let text = $(".tutorial");
    let waitText = $(core).children('.wait-text');
    let roundText = $('.round');
    let remainingTime = $(".remaining-time");
    // Declare number of rounds
    let currentRound = 1;
    // Declare the speed in ms
    let speed = 390;
    // Declare boolean
    let isScreenGreen = false;
    let testStarted = false;
    // LISTENERS
    // Start the test after clicking the button
    $(buttonStart).click(startTest);
    $(core).click(checkStateOfScreen);
    //Set the text of these elements with the variable above
    $(roundText).text("ROUND " + currentRound + " ...");
    $(remainingTime).text("time left to react : " + speed + "ms");
    // FUNCTIONS
    // Function to start the test
    function startTest(e){
        $(core).css("background", "#00aeff");
        // Stop propagation of the click
        e.stopPropagation();
        testStarted = true;
        $(text).text('Click anywhere as fast as possible when the screen turn green.');
        $(core.children()).hide();
        $(waitText).show();
        // Set a timer with an ID of "randomTime" with random time between 1 and 5 seconds and call the isGreen function
        randomTime = setTimeout(isGreen, Math.floor(Math.random() * 5000));
    }
    // Function to check if the screen background is green after we cicked it 
    function checkStateOfScreen(e){
        // Check if the test started and the screen is NOT green
        if (testStarted && !isScreenGreen) {
            tooSoon();
            // Check if the test started and the screen is green
        }else if(testStarted && isScreenGreen){
            RoundPassed();
        }
    }
    // Do some changes if the screen is green
    function isGreen(){
        isScreenGreen = true;
        $(waitText).hide();
        $(core).css("cursor", "pointer");
        $(core).css('background', '#33cc00');
        // Set a timer with an ID of "windowInterval" with the variable 'speed' as miliseconds and will be the time left to click before failing the test 
        windowInterval = setTimeout(tooLate, speed);
    }
    // Stop the test if we clicked before screen turned green
    function tooSoon(){
        currentRound = 1

        $(core.children()).show();
        $(waitText).hide();
        $(text).text("TEST FAILED - CLICKED TOO SOON")
        $(roundText).text("ROUND " + currentRound + " ...");

        clearTimeout(randomTime);

        speed = 390;
        $(remainingTime).text("time left to react : " + speed + "ms");
    }
    // Stop the test if it's too late (depend on the speed variable in milliseconds wich is 390ms by default)
    function tooLate(){
        currentRound = 1;

        testStarted = false;
        isScreenGreen = false;

        $(core).css("cursor", "default");
        $(core.children()).show();
        $(core).css("background", "#ff0000");
        $(waitText).hide();
        $(text).text("TOO LATE, TRY AGAIN");
        $(roundText).text("ROUND " + currentRound + " ...");

        clearTimeout(randomTime);

        speed = 390;
        $(remainingTime).text("time left to react : " + speed + "ms");
    }
    // Function if we win the round 
    function RoundPassed(){
        testStarted = false;
        isScreenGreen = false;

        currentRound++;

        $(core).css("cursor", "default");
        $(core).css("background", "#00aeff");
        $(text).text("Round passed ! Speed will increase.");
        $(core.children().show())
        $(waitText).hide();
        $(roundText).text("ROUND " + currentRound + " ...");
        
        speed -= 30;
        $(remainingTime).text("time left to react : " + speed + "ms");

        clearTimeout(randomTime);
        clearTimeout(windowInterval);
    }
})