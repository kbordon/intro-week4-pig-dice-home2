// back-end
function Player(name) {
  this.playerName = name;
  this.totalScore = 0;
  this.turnScore = 0;
}

Player.prototype.rollDie = function() {
  debugger;
  var rollResult = Math.floor(Math.random() * (6-1 + 1)) + 1;
  if (rollResult === 1) {
    this.turnScore = 0;
  } else {
    this.turnScore = this.turnScore + rollResult;
    if (this.totalScore + this.turnScore >= 100) {
      this.totalScore = this.totalScore + this.turnScore;
      return "WINNER!";
    }
    return true;

  }
}

Player.prototype.holdDie = function() {
  this.totalScore = this.totalScore + this.turnScore;
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
    console.log(playerArray);

    var currentPlayerIndex = 0;

    $("button#button-play").click(function () {
      var notOne = playerArray[currentPlayerIndex].rollDie();
      if (notOne === "WINNER!") {
        $("#score-total").text(newPlayer.playerName + "WINS! Your Score is " + newPlayer.totalScore);
      } else if (notOne) {
        $("#score-total").text(newPlayer.playerName + " : " + newPlayer.turnScore);
        $("button#button-hold").show();
      } else {
        $("#score-total").text("You rolled a 1 and lost your turn! Next player!")
      }

    });

    $("button#button-hold").click(function () {
      newPlayer.holdDie();
      $("#score-total").text(newPlayer.playerName + " total score: " + newPlayer.totalScore);
    })
  })


});
