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
    console.log("You lose! Your points for this turn are " + this.turnScore);
  } else {
    this.turnScore = this.turnScore + rollResult;
  }
}

Player.prototype.holdDie = function() {
  this.totalScore = this.totalScore + this.turnScore;
}

// front-end
$(document).ready(function(){
  $("#player-form").submit(function(event) {
    event.preventDefault();

    var nameInput = $("#player-one").val();
    console.log(nameInput);
    var newPlayer = new Player(nameInput);

    $("button#button-play").click(function () {
      newPlayer.rollDie();
      $("#score-total").text(newPlayer.playerName + " : " + newPlayer.turnScore);
    });

    $("button#button-hold").click(function () {
      newPlayer.holdDie();
      $("#score-total").text(newPlayer.playerName + " total score: " + newPlayer.totalScore);
    })
  })


});
