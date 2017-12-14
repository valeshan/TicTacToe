!function($){

  //hide finish screen by default, other elements are hidden by start screen
  $("#finish").hide();

  //hide start screen when start button is clicked
  $("#start a[class=button]").click(()=>{
    $("header").fadeIn();
    $(".boxes").fadeIn();
    $("#start").fadeOut();
    firstPlayer();
  })

  //variables
  const $player1 = $("#player1");
  const $player2 = $("#player2");
  const $p1SVG = $("#player1 svg");
  const $p2SVG = $("#player2 svg");
  const $boxes = $(".boxes");
  const $box = $(".box");

  //change background depending on which player is active
  const bkgdChange = function(){
    if($player1.hasClass("active")){
      $(this).css("background-image", $p1SVG);
    } else{
      $(this).css("background-image", $p2SVG);
    }
  }

  $box.click(bkgdChange);

  //randomise first player
  const firstPlayer = function(){
    let coinFlip = Math.floor(Math.random(1)*2);
    if(coinFlip == 0){
      $player1.addClass("active");
    } else{
      $player2.addClass("active");
    }
  }


}(jQuery);
