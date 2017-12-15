!function($){


  //**************** VARIABLES ****************//


  const $player1 = $("#player1");
  const $player2 = $("#player2");
  const $p1SVG = "url('img/o.svg')";
  const $p2SVG = "url('img/x.svg')";
  const $boxes = $(".boxes");
  const $box = $(".box");
  const filledBoxes = [];


  //**************** PLAYER NAME ****************//

  //need to insert input element here (exceeds)
  //$("#start h1").insertAfter("<div id='name-block'><input class = 'player-name' type='text'></div>")


  //**************** PLAYER OBJECTS ****************//


  //player objects
  const genPlayer1 = {
    person : "Player 1",
    icon : $p1SVG,
    squares : 0,
    win : false,
    winscreen: "screen-win-one"
  };

  const genPlayer2 = {
    person : "Player 2",
    icon : $p2SVG,
    squares : 0,
    win : false,
    winscreen: "screen-win-two"
  };


  //**************** COIN TOSS OBJECT ****************//


  //coin toss to decide who starts first
  const coinToss = {
    //coin flip generator
    chance : Math.floor(Math.random(1)*2),

    //randomise first player
    firstPlayer : function (){
      if(this.chance == 0){
        $player1.addClass("active");
        return (this.currentPlayer = $player1)
      } else{
        $player2.addClass("active");
        return (this.currentPlayer = $player2)
      }
    }
  }


  //**************** START SEQUENCE ****************//


  //hide finish screen by default, other elements are hidden by start screen
  $("#finish").hide();

  //hide start screen when start button is clicked
  $("#start a[class=button]").click(()=>{
    $("header").fadeIn();
    $(".boxes").fadeIn();
    $("#start").fadeOut();
    coinToss.firstPlayer();
  })


  //**************** HOVER AND CLICK ****************//


  //*** HOVER FUNCTION ***//


  //change background depending on which player is active, except if box is filled
  const bkgdChange = function(){
    if(!$(this).is("[class*='box-filled']")){
      if($player1.hasClass("active")){
        $(this).css("background-image", genPlayer1.icon);
      } else{
        $(this).css("background-image", genPlayer2.icon);
      }
    }
  }

  //clear box function when mouse leaves except if box is filled
  const boxClear = function(){
    if(!$(this).is("[class*='box-filled']")){
      $(this).css("background-image", "none");
    }
  }

  //hover handler
  $box.hover(bkgdChange,boxClear);


  //*** CLICK FUNCTION ***//


  //other genPlayer to get active class and current genPlayer remove active class; squares +=1
  $box.click(function(){
    if(!$(this).is("[class*='box-filled']")){
      if($player1.hasClass("active")){
        $(this).css("background-image", $p1SVG);
        $(this).addClass("box-filled-1");
        $player1.removeClass("active");
        $player2.addClass("active");
        genPlayer1.squares +=1;
      } else{
        $(this).css("background-image", $p2SVG);
        $(this).addClass("box-filled-2");
        $player2.removeClass("active");
        $player1.addClass("active");
        genPlayer2.squares +=1;
      }
    }
  });


  //**************** WIN CONDITIONS ****************//


  //*** WIN COMBINATIONS ***//


  //vertical conditions
  const left = [$($box[0]), $($box[3]), $($box[6])];
  const vMid = [$($box[1]), $($box[4]), $($box[7])];
  const right = [$($box[2]), $($box[5]), $($box[8])];

  //horizontal conditions
  const tops = [$($box[0]), $($box[1]), $($box[2])];
  const hMid = [$($box[3]), $($box[4]), $($box[5])];
  const bot = [$($box[6]), $($box[7]), $($box[8])];

  //diagonal conditions
  const desc = [$($box[0]), $($box[4]), $($box[8])];
  const asc = [$($box[6]), $($box[4]), $($box[2])];


  //*** WIN VERIFICATION FUNCTIONS ***//


  //verification functions to determine if each box in array win condition is true;
  const winCheckP1 = function(box){
    return box.hasClass("box-filled-1");
  }

  const winCheckP2 = function(box){
    return box.hasClass("box-filled-2");
  }

  //functions that check whether either player has met any of the win conditions
  function checkWin1(){
    if(left.every(winCheckP1) || vMid.every(winCheckP1) || right.every(winCheckP1) || tops.every(winCheckP1) ||
        hMid.every(winCheckP1) || bot.every(winCheckP1) || desc.every(winCheckP1) || asc.every(winCheckP1)){
        genPlayer1.win = true;
        winScreen(genPlayer1);
    }
  };

  function checkWin2(){
    if(left.every(winCheckP2) || vMid.every(winCheckP2) || right.every(winCheckP2) || tops.every(winCheckP2) ||
        hMid.every(winCheckP2) || bot.every(winCheckP2) || desc.every(winCheckP2) || asc.every(winCheckP2)){
        genPlayer2.win = true;
        winScreen(genPlayer2);
    }
  };

  // event handlers for win condition check
  $box.hover(checkWin1);
  $box.hover(checkWin2);


    //**************** PLAYER WIN SCREEN ****************//

    //win screen when player wins, takes player argument
    function winScreen(player){
      if(player.win == true){
        $("#finish").addClass(player.winscreen);
        $(".message").text(`${player.person} wins!`);
        $("#finish").show();
      }
    }


  //**************** GAME DRAW & DRAW SCREEN ****************//

  //event handler and function when there is a tie; when all squares are full
  $box.mouseleave(()=>{
    if(genPlayer1.squares + genPlayer2.squares == 9){
      $("#finish").addClass("screen-win-tie");
      $(".message").text("It's a Tie!");
      $("#finish").show();
    }
  })



  //**************** RESTART GAME ****************//


  $("#finish a[class=button]").click(()=>{
    $("#finish").removeClass("screen-win-tie");
    $("#finish").removeClass("screen-win-one");
    $("#finish").removeClass("screen-win-two");
    $(".message").empty();
    $box.removeClass("box-filled-1");
    $box.removeClass("box-filled-2");
    $box.css("background-image", "");
    genPlayer1.win = false;
    genPlayer2.win = false;
    genPlayer1.squares = 0;
    genPlayer2.squares = 0;
    $("#finish").hide();
  })
}(jQuery);
