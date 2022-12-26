const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let levelNumber = 0;
let successOrFailure;
let sequenceRunning = false;
let showPatternAgainNumber = 3;
let highscore = 0;




makeHighscoreBigger();

function makeHighscoreSmaller() {
    $("#high-score").removeClass("make-bigger");
    $("#high-score").addClass("make-smaller");
}

function makeHighscoreBigger() {
    $("#high-score").removeClass("make-smaller");
    $("#high-score").addClass("make-bigger");
}



function sequenceRunningCheck() {

if (!sequenceRunning){
    $(".btn, .btn-show-pattern").removeClass("not-allowed")

} 
if (sequenceRunning === true){
    $(".btn, .btn-show-pattern").addClass("not-allowed")
}

}

/* $(".btn, .btn-show-pattern").addClass("not-allowed") */



    
    $(".btn-show-pattern").on("click", function(){

        

        

        if (started === true){

            if (sequenceRunning === false){

               

                if (showPatternAgainNumber >= 0){

                    if (showPatternAgainNumber === 0){

                    }else {
                        showPatternAgainNumber--
                    /* } */
                    

                    $(".btn-show-pattern").text("Show Full Pattern Again (" + showPatternAgainNumber + " Left)")

                
               sequenceRunning = true;

               //checking so cursor chenges
                sequenceRunningCheck();

               userClickedPattern = []



               $.each(gamePattern, function(index){
            
                setTimeout(() => {
            
                $("#" + this).fadeOut(100).fadeIn(100);
                playSound(this);

                if (index === gamePattern.length - 1){

                    setTimeout(() => {
                        sequenceRunning = false;

                        //checking so cursor chenges
                        sequenceRunningCheck();

                    }, 600)
                   
                    
                } 
    
                }, 600 * index)
            
                 });

                 if (showPatternAgainNumber === 0){
                    showPatternAgainNumber--
                 }


                }   // from top else statement
                

               
            } /* from if (showPatternAgainNumber >= 0) */
        

                     
            } // from if (seqenceRunning === false){

        }

    });
    

   




$(".btn").on("click", function(){

    if (!started){
        
        /* alert("The game isn't active right now. Press any key to either start or restart the game"); */

    } 

     if (started === true) {

    if (!sequenceRunning){


     const userChosenColor = $(this).attr("id"); 

     userClickedPattern.push(userChosenColor);


     playSound(userChosenColor);



     animatePress(userChosenColor);

     checkanswer(userClickedPattern.length -1);
     }

}

 
});



function checkanswer(currentLevel){

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        /* console.log("success") */
        if(userClickedPattern.length === gamePattern.length){

            sequenceRunning = true;

            //checking so cursor chenges
            sequenceRunningCheck();

            $("#level-title").text("Correct!")

            if (levelNumber < highscore){
                console.log("level number smaller than highscore")

            } else if (highscore < levelNumber){
                console.log("level number bigger than highscore. Should add one to highscore")
                highscore++
                $("#high-score").text("High Score: Level " + highscore)

            } else if (highscore === levelNumber){
                console.log("level number and highscore are equal")
            }
            

            
          
             setTimeout(function(){
                nextSequence();
             },1000)

        }

    } else {
        

        /* if (!gameOver){ */

       

        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over");
        } , 200);

        let wrong = new Audio("sounds/wrong.mp3");
        wrong.play();


        startOver();
       
         /* } */

        
    }

}

function startOver() {
      levelNumber = 0;
      gamePattern = [];
      started = false;
      sequenceRunning = false;

      showPatternAgainNumber = 3;

      makeHighscoreBigger();
      
      
}



$(document).on("keydown", function(){
    if (!started){
        
        $("#level-title").text("Level " + levelNumber);
        $(".btn-show-pattern").text("Show Full Pattern Again (" + showPatternAgainNumber + " Left)")

        nextSequence();


        started = true;
    }
    
})


function nextSequence(){


    makeHighscoreSmaller();

    

    sequenceRunning = true;

   //checking so cursor chenges
   sequenceRunningCheck();

   /* gameOver = false; */

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

            /* console.log(index)  0, 1, 2, 3, 4 ... (all in array) */

            if (index === gamePattern.length - 1){

                setTimeout(() => {
                    sequenceRunning = false;

                   //checking so cursor chenges
                   sequenceRunningCheck();

                }, 600)

            } 
            

        }, 600 * index)

    });

    /* console.log(callback); */
    
    /* alert(this); */
    

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
