// back-end
function Player(name) {
  this.playerName = name;
  this.totalScore = 0;
  this.turnScore = 0;
}

Player.prototype.rollDice = function(number) {
  var diceRolls = [];
  for (var diceIndex = 0; diceIndex < number; diceIndex++) {
    diceRolls.push(Math.floor(Math.random() * (6-1 + 1)) + 1);
  }
  if (diceRolls[0] === 1) {
    if (diceRolls[1] === 1) {
      this.turnScore = 0;
      this.totalScore = 0;
      return "Z";
    } else {
      this.turnScore = 0;
      return 0;
    }
  } else {
    // diceRolls.forEach(function(number) {
    //  this.turnScore += this.turnScore + number;
    // });
    this.turnScore += diceRolls[0];
    if (diceRolls[1]) {
      this.turnScore += diceRolls[1];
    }
    if (this.totalScore + this.turnScore >= 50) {
      this.totalScore = this.totalScore + this.turnScore;
      return "A";
    }
    return diceRolls;
  }
}

Player.prototype.hold = function() {
  this.totalScore = this.totalScore + this.turnScore;
  this.turnScore = 0;
}

// front-end
$(document).ready(function(){
  $("#player-form").submit(function(event) {
    event.preventDefault();
    var luckyHarry = new Audio('lucky.mp3');
    var oneSound = new Audio('one.mp3');
    var snakeEyes = new Audio('snakeeyes.mp3');
    luckyHarry.play();

    $("#create-players").hide();
    $(".game-box").show();
    $("button#button-hold").attr("disabled", "disabled");

    var playerArray = [];
    var diceInput = parseInt($("#diceQuantity").val());
    $("input.player").each(function() {
      var newPlayer = new Player($(this).val());
      playerArray.push(newPlayer);
    });
    debugger;

    for (var playersIndex = 0; playersIndex < playerArray.length; playersIndex++) {
      $("#score-keeper").append("<li class='player-" + playersIndex + "'>" + playerArray[playersIndex].playerName + "<br><span class='total-" + playersIndex + "'>" + 0 + "</span></li>");
    }

    var currentPlayerIndex = 0;

    $("button#button-play").click(function () {
      $(".player-" + currentPlayerIndex).addClass("score-current");
      $("#button-hold").removeAttr("disabled");
      var dieResult = playerArray[currentPlayerIndex].rollDice(diceInput);

      if (dieResult[0] === "A") {
        $("#button-play, #button-hold").attr("disabled", "disabled");
        $("#score-total").empty();
        $("#score-total").append("<img src='img/win.gif'><br><strong>" + playerArray[currentPlayerIndex].playerName + " WINS!</strong> Your Score is <strong>" + playerArray[currentPlayerIndex].totalScore + "</strong>!");
        $(".total-" + currentPlayerIndex).text(playerArray[currentPlayerIndex].totalScore);
      } else if (dieResult[0] === "Z") {
        snakeEyes.play();
        $("#button-hold").attr("disabled", "disabled");
        $(".player-" + currentPlayerIndex).removeClass("score-current");
        $("#score-total").text(playerArray[currentPlayerIndex].playerName + " rolled snake eyes, and lost everything! They're back at ZERO.")
        $(".total-" + currentPlayerIndex).text(playerArray[currentPlayerIndex].totalScore);
        if ((playerArray.length - 1) === currentPlayerIndex) {
          currentPlayerIndex = 0;
        } else {
          currentPlayerIndex++;
        }
        $(".player-" + currentPlayerIndex).addClass("score-current");
      } else if (dieResult === 0) {
        $("#button-hold").attr("disabled", "disabled");
        $(".player-" + currentPlayerIndex).removeClass("score-current");
        $("#score-total").text(playerArray[currentPlayerIndex].playerName + " rolled a 1, and lost their turn!")
        oneSound.play();
        if ((playerArray.length - 1) === currentPlayerIndex) {
          currentPlayerIndex = 0;
        } else {
          currentPlayerIndex++;
        }
        $(".player-" + currentPlayerIndex).addClass("score-current");
      } else {
        $("#score-total").text(playerArray[currentPlayerIndex].playerName + " rolled a " + dieResult.join(' & ') + ". Turn Score: " + playerArray[currentPlayerIndex].turnScore);
        if (dieResult[0] === dieResult[1]) {
          $("#button-hold").attr("disabled", "disabled");
          $("#score-total").append("<br>Doubles <em>must</em> roll again!");
        }
      }
    });

    $("button#button-hold").click(function () {
      playerArray[currentPlayerIndex].hold();
      $("#button-hold").attr("disabled", "disabled");
      $(".player-" + currentPlayerIndex).removeClass("score-current");
      $("#score-total").text(playerArray[currentPlayerIndex].playerName + " held.");
      $(".total-" + currentPlayerIndex).text(playerArray[currentPlayerIndex].totalScore);
      if ((playerArray.length - 1) === currentPlayerIndex) {
        currentPlayerIndex = 0;
      } else {
        currentPlayerIndex++;
      }
      $(".player-" + currentPlayerIndex).addClass("score-current");
      $("#score-total").append(" It's " + playerArray[currentPlayerIndex].playerName + "'s turn.");
    })

    $("button#button-reset").click(function() {
      window.location.reload();
    });
  });
});
