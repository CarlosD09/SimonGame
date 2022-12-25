const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let levelNumber = 0;
let successOrFailure;

if (window.navigator.userAgentData.mobile === true){
    alert("you're on mobile")
}


$(".btn").on("click", function(){
    const userChosenColor = $(this).attr("id"); 

    userClickedPattern.push(userChosenColor);

    
    playSound(userChosenColor);

    

    animatePress(userChosenColor);

    checkanswer(userClickedPattern.length -1);

 
});



function checkanswer(currentLevel){

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success")
        if(userClickedPattern.length === gamePattern.length){
          
             setTimeout(function(){
                nextSequence();
             },1000)

        }

    } else {
        
        $("#level-title").text("Game Over, Press Any Key to Restart");

        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over");
        } , 200);

        let wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        startOver();
    }

}

function startOver() {
      levelNumber = 0;
      gamePattern = [];
      started = false;
}



$(document).on("keydown", function(){
    if (!started){
        
        $("#level-title").text("Level " + levelNumber);

        nextSequence();


        started = true;
    }
    
})


function nextSequence(){

    levelNumber++;

    userClickedPattern = []

    $("#level-title").text("Level " + levelNumber);


    const randomNumber = Math.floor(Math.random() * 4);
    
    const randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    // so the pattern repeats everytime
    
    $.each(gamePattern, function(index){
        /* alert(this + " each") */
        /* console.log(index) */
        setTimeout(() => {
        
            $("#" + this).fadeOut(100).fadeIn(100);
            playSound(this);

        }, 600 * index)
        
    });

    //




    /* before: playSound(randomChosenColor); */

}


function playSound(name){

    const audio = new Audio("sounds/" + name + ".mp3");
        audio.play();

}

function animatePress(currentColor){

    $("#" + currentColor).addClass("pressed")

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}
