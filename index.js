let buttonColours= ["red" , "blue" , "green" , "yellow"];
let gamePattern =[];
let userClickedPattern =[];
let level = 0;
let gameStarted = false;

let randomNumber = ()=> {
    return Math.floor(Math.random()*4)
}
function playSound(name) {
    let sound = new Audio (`sounds/${name}.mp3`)  // in a single line new Audio (`sounds/${name}.mp3`).play();
    sound.play();
}

function nextSequence() {
    userClickedPattern =[];
    level ++;
    $("#level-title").text("Level "+ level)

    let randomChosenColour= buttonColours[randomNumber()]
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn();      //Change animation
    playSound(randomChosenColour)
    gamePattern.push(randomChosenColour)
}

$(".btn").click((event)=>{       //Always use class name or id for selecting using button which was not ele
    let userChosenColour =event.target.id;
    playSound(userChosenColour)
    animatePress(userChosenColour)
    userClickedPattern.push(userChosenColour)
    checkAnswer(userClickedPattern.length -1)   
})

// console.log(userClickedPattern)

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass("pressed")
    setTimeout(() => {
        $(`#${currentColour}`).removeClass("pressed")
    }, 100);
}

$(document).keydown(()=>{
    if(!gameStarted){
    $("#level-title").text("Level "+ level)
    gameStarted =true;
        nextSequence();
    }
}
);

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){  //check at individual lvl
        if(userClickedPattern.length == gamePattern.length){    //check whole 
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
        else{       //triggered when a wrong button clicked
            playSound("wrong")
            $("h1").text("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over");
            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 200);
            startOver()
        }
    }

function startOver() {
    level=0
    gamePattern=[]
    gameStarted =false;
}