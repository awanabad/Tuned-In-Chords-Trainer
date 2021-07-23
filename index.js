window.onload = function() {
    

//Getting test audio to play at title screen 
var test = document.getElementsByClassName("title")[0]; 
var noise = new Audio("sounds/ambience.mp3");
var BalloonTimeOut;

test.addEventListener("mouseover", function() { //Audio Queue on Mouseover

    new Audio("sounds/test.wav").play();
    noise.play();
    titleDesc.innerHTML = "Click and hold to begin!";
    clearInterval(textCycleInterval);
});

//Repeated Code 
test.addEventListener("mouseup", function() { 
    //If mouse not up, don't pause track
    noise.play();
    titleDesc.innerHTML = "Click and hold to begin!";
    
    
        //Loading 
    test.classList.remove("loading")
    if (popped) {
        //If balloon is popped, play no sound.

    }
    else if(!popped) 
    {   clearTimeout(BalloonTimeOut); //Reset BalloonTimeOut
        titleDesc.innerHTML = "Click and hold to begin!";
        titleDesc.classList.remove("fade");
        clearInterval(textCycleInterval); 
        
                if (balloonToggle)
                    {
                    balloonToggle = false;
                    balloon_inflate.pause();
                    balloon_inflate.currentTime = 0;
                    new Audio("sounds/balloon-deflate.wav").play();
                    }
                else {
                    //Audio Queue on MouseLeave
                    balloonToggle = false;
                    new Audio("sounds/testrev.wav").play();
                    }
    }
})


test.addEventListener("mouseleave", function() { 

    noise.pause();
    titleDesc.classList.remove("fade"); 
    titleDesc.innerHTML = textList[i];
    textCycleInterval = setInterval(textCycle, 4000);

        //Loading 
    test.classList.remove("loading")
    if (popped) {
        //If balloon is popped, play no sound.

    }
    else if(!popped) 
    {   clearTimeout(BalloonTimeOut); //Reset BalloonTimeOut        
                if (balloonToggle)
                    {
                    balloonToggle = false;
                    balloon_inflate.pause();
                    balloon_inflate.currentTime = 0;
                    new Audio("sounds/balloon-deflate.wav").play();
                    }
                else {
                    //Audio Queue on MouseLeave
                    balloonToggle = false;
                    new Audio("sounds/testrev.wav").play();
                    }
    }
})

//Title Description Cycling
var titleDesc = document.getElementsByClassName("title-desc")[0];
var i = 0;
var textList = [
    "The web app that trains your ear to identify guitar chords.",
    "Hover over the logo to check audio."    //<h3 class="title-desc">The web app that trains your ear to identify guitar chords.</h3>
                                                    //<h3 class="title-desc">Hover over the logo above to check for audio.</h3>
]


function textCycle () {

    setTimeout( function () {
        titleDesc.classList.toggle("fade");
    })

    setTimeout( function () {
        titleDesc.innerHTML = textList[i];
        titleDesc.classList.toggle("fade");
    }, 700)
    
    if (i===(textList.length-1)) {
        i=-1;
    }
    i++;

}


//Click and Hold to Play //Remember: test is title 
var balloonToggle = false;
var popped = false;
var balloon_inflate =  new Audio("sounds/balloon-inflate.wav");
test.addEventListener("mousedown", function () {
    noise.pause();
    balloonToggle = true;
    test.classList.add("loading");
    titleDesc.classList.add("fade");
    balloon_inflate.play();
    

    BalloonTimeOut = setTimeout(function(){ //BalloonTimeOut prevents balloo from popping if logo is repeatedly clicked
        if (balloonToggle === true) {
            balloonToggle = false;
            popped = true;
            balloon_inflate.pause();
            balloon_inflate.currentTime = 0;
            new Audio("sounds/balloon-pop.wav").play();

            //remove starting page
            document.getElementById("starting-page").classList.add("hide");
            //show Boom and disappear after delay; 
            document.getElementById("pop-sound").classList.remove("hide");
            setTimeout(function(){
            document.getElementById("pop-sound").classList.add("hide");
           
            chordPreview();


            }, 520);

        } 
    }, 2000);

})

var currentChord = 1;
var currentPitch = 1;
function chordPreview() {
    //Show Listen Queue
    currentPitch = 1; //reset button sound pitch
    document.getElementsByClassName("listen-queue")[0].classList.remove("fade");
    currentChord = chordNumber();

    //Play chord after delay    
    setTimeout (function() {
        chordAudio(currentChord)
    }, 600);

    //Add SetTimeOut Here 
    setTimeout (function() {
        document.getElementsByClassName("listen-queue")[0].classList.add("fade");
    }, 2000);
    
    setTimeout (function() {
        document.getElementsByClassName("listen-queue")[0].classList.add("hide");
        document.getElementById("question").classList.remove("hide");
    }, 2500);
    setTimeout (function() {
        document.getElementById("question").classList.remove("fade");
        
    }, 2550);
}



//Generate Random Chord Number;
function chordNumber() {
    return (Math.floor((Math.random()*12)+1));

}
function chordAudio (number) {
    var chordAudioSound =   new Audio("chords/chord_" + number + ".wav");
    chordAudioSound.currentTime= 0 ;
    chordAudioSound.play();
}

//Hovering Over Replay plays current chord again
var replayButton = document.getElementsByClassName("replay-button")[0];
replayButton.addEventListener("mouseover", function () {
    chordAudio(currentChord);
});

//Chord Button Pitch Sequence AND Button Click Feedback
var PitchDescend = false;
var chordButton = document.querySelectorAll(".chord-button");
for (var z = 0; z < chordButton.length; z++ ) {
    chordButton[z].addEventListener("mouseover", function () {


        if(!PitchDescend){
            chordButtonAudio();     
            currentPitch++; 
            if (currentPitch===13) {
                PitchDescend = true;
                currentPitch = 12;
            }
        }
        else if(PitchDescend) {
            chordButtonAudio();   
            currentPitch--;
            if (currentPitch===0) {
                PitchDescend = false;
                currentPitch = 1;
            }
        }


    }
    )

    chordButton[z].addEventListener("mousedown", function () {
        checkAnswer(this.innerText, currentChord);
    })
}

function chordButtonAudio () {
    
    //Plays the Audio
    new Audio("buttons/button_" + currentPitch + ".wav").play();
   
}

function checkAnswer (button, sound) {
    switch(button){
        case "A":
            comparer(1,sound);
        break;
        case "A#":
            comparer(2,sound);
        break;
        case "B":
            comparer(3,sound);
            break;
        case "C":
            comparer(4,sound);
            break;  
        case "C#":
            comparer(5,sound);
            break;
        case "D":
            comparer(6,sound);
            break;
              
        case "D#":
            comparer(7,sound);
            break;
        case "E":
            comparer(8,sound);
            break;
        case "F":
            comparer(9,sound);
            break;
        case "F#":
            comparer(10,sound);
            break;  
        case "G":
            comparer(11,sound);
            break;
        case "G#":
            comparer(12,sound);
            break;
    }
}

function comparer (number1, chordNumber1)
{  
    if (number1 === chordNumber1)
    {
        showCorrectScreen();
        document.getElementsByClassName("listen-queue")[0].classList.remove("hide");
    setTimeout(function(){
        chordPreview();
    }, 2000)
       

    }
    else {
        console.log("BRUH...Wrong!") 
        //Show wrong screen 
    }
}

function showCorrectScreen() {
    document.getElementById("correct-screen").classList.remove("hide");
    document.getElementsByClassName("answer-text")[0].classList.remove("hide");
    document.getElementById("correct-screen").classList.remove("fade");
    new Audio("sounds/correct.wav").play();
    
    setTimeout(function(){
        document.getElementsByClassName("answer-text")[0].classList.remove("fade");
        //Hide question
        document.getElementById("question").classList.add("fade");
        document.getElementById("question").classList.add("hide");
    }, 500)


    setTimeout(function(){
        document.getElementById("correct-screen").classList.add("fade");
    }, 1500)

    setTimeout(function(){
        document.getElementById("correct-screen").classList.add("hide");
        document.getElementsByClassName("answer-text")[0].classList.add("hide");
        document.getElementsByClassName("answer-text")[0].classList.add("fade");
    }, 1900)


}

}