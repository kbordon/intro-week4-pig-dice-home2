$(document).ready(function(){
  $("button#button-play").click(function () {
    console.log(Math.floor(Math.random() * (6-1 + 1)) + 1);
  });
});
