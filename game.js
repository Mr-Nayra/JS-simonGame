  var sequence;
  var userClickedPattern;
  var a = ["red", "blue", "green", "yellow"];
  var level;
  var click;

  function musictime(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
  function nextSequence() {
    $("body").unbind()

    $("h1").text("Level " + level);

    b = Math.floor(Math.random() * 3);

    randomChosenColor = a[b];
    sequence.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(200);
    musictime(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(200);
  }

  function checkanswer() {

    if (sequence[click] == userClickedPattern[click]) {
      console.log("success");
      click++;
      if (click == level + 1) {
        userClickedPattern = [];
        click = 0;
        level++;
        setTimeout(nextSequence, 1000);
      }
    } else {
      $("h1").text("Game over,Press any key to restart");
      $("body").addClass('game-over');
      var music = new Audio('sounds/wrong.mp3');
      music.play();
      setTimeout(function() {
        $("body").removeClass('game-over');
      }, 1000);
      reset();
    }
  }

  function playSound(event) {
    chosenColor = event.target.id;
    userClickedPattern.push(chosenColor);

    musictime(chosenColor);

    $("#" +chosenColor).addClass("pressed");
    setTimeout(function () {
      $("#" + chosenColor).removeClass("pressed");
    }, 100);

    checkanswer();
  }

  function reset() {
    $("body").keydown(function() {
      nextSequence();
    });
    sequence = [];
    userClickedPattern = [];
    level = 0;
    click = 0;
  }
  $(".btn").click(playSound)
  reset();
