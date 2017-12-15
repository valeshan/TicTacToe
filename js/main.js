//!function($){

    //variables
    const $player1 = $("#player1");
    const $player2 = $("#player2");
    const $p1SVG = "url('img/o.svg')";
    const $p2SVG = "url('img/x.svg')";
    const $boxes = $(".boxes");
    const $box = $(".box");

    //player objects
    const genPlayer1 = {
      player : $player1,
      icon : $p1SVG,
      squares : 0,
      win : [],
      active: false
    };

    const genPlayer2 = {
      player : $player2,
      icon : $p2SVG,
      squares : 0,
      win : [],
      active: false
    };

  //hide finish screen by default, other elements are hidden by start screen
  $("#finish").hide();

  //hide start screen when start button is clicked
  $("#start a[class=button]").click(()=>{
    $("header").fadeIn();
    $(".boxes").fadeIn();
    $("#start").fadeOut();
    game.firstPlayer();
  })


  //change background depending on which player is active
  const bkgdChange = function(){
    if($player1.hasClass("active")){
      $(this).css("background-image", $p1SVG);
    } else{
      $(this).css("background-image", $p2SVG);
    }
  }

  $box.hover(bkgdChange);

  //

  const game = {
    //coin flip generator
    coinFlip : Math.floor(Math.random(1)*2),

    //current player
    currentPlayer : [],

    //randomise first player
    firstPlayer : function (){
      if(this.coinFlip == 0){
        $player1.addClass("active");
        return (this.currentPlayer = $player1)
      } else{
        $player2.addClass("active");
        return (this.currentPlayer = $player2)
      }
    }
  }





//}(jQuery);
