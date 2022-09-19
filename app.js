$(document).ready(function(){
    window.addEventListener('contextmenu', function(e){
        e.preventDefault();
    })

    let buttonStart = $('#start-test')
    let core = $(".main-container");

    let text = $(".tutorial");
    let waitText = $(core).children('.wait-text');
    let roundText = $('.round');
    let remainingTime = $(".remaning-time");

    let currentRound = 1;
    let speed = 390;

    let isScreenGreen = false;
    let testStarted = false;

    $(buttonStart).click(startTest);
    $(core).click(checkStateOfScreen);
    $(roundText).text("ROUND " + currentRound + " ...");
    $(remainingTime).text("time left to react : " + speed + "ms");

    function startTest(e){
        $(core).css("background", "#00aeff");
        e.stopPropagation();
        testStarted = true;
        $(text).text('Click anywhere as fast as possible when the screen turn green.');
        $(core.children()).hide();
        $(waitText).show();
        randomTime = setTimeout(isGreen, Math.floor(Math.random() * 5000));
    }

    function checkStateOfScreen(e){
        if (testStarted && !isScreenGreen) {
            tooSoon();
        }else if(testStarted && isScreenGreen){
            RoundPassed();
        }
    }

    function isGreen(){
        isScreenGreen = true;
        $(waitText).hide();
        $(core).css("cursor", "pointer");
        $(core).css('background', '#33cc00');
        windowInterval = setTimeout(tooLate, speed);
    }

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

        console.log(speed)
    }
})