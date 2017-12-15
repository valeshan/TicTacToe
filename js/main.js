//!function($){


  //****** VARIABLES ******//

  const $player1 = $("#player1");
  const $player2 = $("#player2");
  const $p1SVG = "url('img/o.svg')";
  const $p2SVG = "url('img/x.svg')";
  const $boxes = $(".boxes");
  const $box = $(".box");
  const filledBoxes = [];


  //****** PLAYER OBJECTS ******//
  //player objects

  const genPlayer1 = {
    person : $player1,
    icon : $p1SVG,
    squares : 0,
    win : [],
    winscreen: "screen-win-one"
  };

  const genPlayer2 = {
    person : $player2,
    icon : $p2SVG,
    squares : 0,
    win : [],
    winscreen: "screen-win-two"
  };


  //****** WIN CONDITIONS ******//

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


  const winCheckP1 = function(box){
    return box.hasClass("box-filled-1");
  }

  const winCheckP2 = function(box){
    return box.hasClass("box-filled-2");
  }


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

  $box.hover(checkWin1);
  $box.hover(checkWin2);
  $box.mouseleave(()=>{
    if(genPlayer1.squares + genPlayer2.squares == 9){
      alert("Game Over");
    }
  })

  //***WIN SCREEN***//

  function winScreen(player){
    if(player.win == true){
      $("#finish").addClass(player.winscreen);
      $("#finish").show();
    }
  }


  //****** BOX STATE  ******//

  function boxState(){
    for (let i = 0; i <= $box.length; i++){
      if($box[i].is("[class*='box-filled']")){
        filledBoxes.append($box[i]);
      }
    }
  }


  //****** START SEQUENCE ******//

  //hide finish screen by default, other elements are hidden by start screen
  $("#finish").hide();

  //hide start screen when start button is clicked
  $("#start a[class=button]").click(()=>{
    $("header").fadeIn();
    $(".boxes").fadeIn();
    $("#start").fadeOut();
    game.firstPlayer();
  })


  //****** CLICK AND HOVER STATE ******//

  //*** HOVER STATE ***//

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


  //*** CLICK STATE ***//

  //other genPlayer to get active prop to true and current genPlayer set to false; squares +=1
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


  //****** GAME OBJECT ******//
  //game object containing firstplayer, currentplayer and coinflip

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
