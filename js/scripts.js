// back-end
function Player(name) {
  this.playerName = name;
  this.totalScore = 0;
  this.turnScore = 0;
}

Player.prototype.rollDie = function() {
  var rollResult = Math.floor(Math.random() * (6-1 + 1)) + 1;
  if (rollResult === 1) {
    this.turnScore = 0;
  } else {
    this.turnScore = this.turnScore + rollResult;
    if (this.totalScore + this.turnScore >= 100) {
      this.totalScore = this.totalScore + this.turnScore;
      return "WINNER!";
    }
    return rollResult;

  }
}

Player.prototype.holdDie = function() {
  this.totalScore = this.totalScore + this.turnScore;
  this.turnScore = 0;
}

// front-end
$(document).ready(function(){
  $("#player-form").submit(function(event) {
    event.preventDefault();

    // var nameInput = $("#player-one").val();
    // var newPlayer = new Player(nameInput);
    var playerArray = [];
    $("input").each(function() {
      var newPlayer = new Player($(this).val());
      playerArray.push(newPlayer);
    })

    playerArray.forEach(function(player) {
      $("#score-keeper").append("<div class='container'>" + player.playerName + "<br><span class='" + player.playerName + "-total'>" + 0 + "</span></div>");
    });

    var currentPlayerIndex = 0;

    $("button#button-play").click(function () {
      var notOne = playerArray[currentPlayerIndex].rollDie();
      // $("#score-total").text(playerArray[currentPlayerIndex].playerName + " text ");
      if (notOne === "WINNER!") {
        $("#score-total").text(playerArray[currentPlayerIndex].playerName + " WINS! Your Score is " + playerArray[currentPlayerIndex].totalScore);
      } else if (notOne) {
        $("#score-total").text(playerArray[currentPlayerIndex].playerName + " rolled a " + notOne  + ". Turn Score: " + playerArray[currentPlayerIndex].turnScore);
        $("button#button-hold").show();
      } else {
        $("#score-total").text(playerArray[currentPlayerIndex].playerName + " rolled a 1, and lost their turn! Next player!")
        if ((playerArray.length - 1) === currentPlayerIndex) {
          currentPlayerIndex = 0;
        } else {
          currentPlayerIndex++;
        }
      }

    });

    $("button#button-hold").click(function () {
      playerArray[currentPlayerIndex].holdDie();
      $("#score-total").text(playerArray[currentPlayerIndex].playerName + " held.");
      $("." + playerArray[currentPlayerIndex].playerName + "-total").text(playerArray[currentPlayerIndex].totalScore);
      if ((playerArray.length - 1) === currentPlayerIndex) {
        currentPlayerIndex = 0;
      } else {
        currentPlayerIndex++;
      }
    })
  })


});
