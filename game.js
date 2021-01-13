var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//track of whether if the game has started or not, only call nextSequence() on the first keypress.
var started = false;

//variable called level
var level = 0;





//keyboard key has been pressed
$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});





$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

// check answer function
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){

    console.log("success");
    if(userClickedPattern.length === gamePattern.length){

      setTimeout(function(){

        nextSequence();
        userClickedPattern=[];

      },1000);
    }
  }
  else{
    console.log("wrong");
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $('body').addClass('game-over');
    setTimeout(function(){
      $('body').removeClass('game-over');
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


function nextSequence() {
  userClickedPattern=[];
  // increase the level by 1 every time nextSequence() is called.
  level++;

  //update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}




function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}




function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}






//start over function

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
