$(document).ready(function(){
    window.addEventListener('contextmenu', function(e){
        e.preventDefault();
    })

    let buttonStart = $('#start-test')
    let core = $(".main-container");
    let text = $(".tutorial");
    let waitText = $(core).children('.wait-text');
    let roundText = $('.round');

    let currentRound = 1;

    let isScreenGreen = false;
    let testStarted = false;

    $(buttonStart).click(startTest);
    $(core).click(checkStateOfScreen);
    $(roundText).text("PREPARE FOR ROUND " + currentRound + " ...");

    function startTest(e){
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
            testResult();
        }
    }

    function isGreen(){
        isScreenGreen = true;
        $(waitText).hide();
        $(core).css("cursor", "pointer");
        $(core).css('background', '#33cc00');
        setInterval(recordMS, 10);
    }

    function tooSoon(){
        $(core.children()).show();
        $(waitText).hide();
        $(text).text("TEST FAILED - Don't click before the screen turn green")
        clearTimeout(randomTime);
    }

    function testResult(){
        testStarted = false;
        isScreenGreen = false;
        $(core).css("background", "#00aeff");
        $(text).text("Success");
        $(core.children().show())
        $(waitText).hide();
        clearTimeout(randomTime);
    }
})