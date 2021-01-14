function activateLowerBtn() {
  //activate rule button
  $("#rules").click(function() {
    $(".rules-box").fadeIn("fast");
    $("#close-btn").click(function() {
      $(".rules-box").fadeOut("fast");
    })
  })

  //activate play again button
  $("#play-again").click(function() {

    //open home section
    $("#in-game-section").hide();
    $("#home-section").fadeIn("slow");

    //remove winner effect
    $("#show-winner").text("WAIT..")
    $("#you-picked-btn").removeClass("winner");
    $("#oppo-picked-btn").removeClass("winner");

    //clear your button
    $("#you-picked-btn button").removeClass(yourChoiceBtnName);

    //clear opponent button
    $("#oppo-picked-btn button").addClass("btn-space");
    $("#oppo-picked-btn button").removeClass(oppoChoiceBtnName);
    $("#oppo-picked-btn img").attr("src", ``);
  })
}

function decideWinner(your, oppo) {
  let winner; //1 for you and 0 for oppo win
  if (your === oppo) { //both choose same button
    setTimeout(function() {
      console.log("DRAW !");
      $("#show-winner").text("DRAW !")
    }, 1000);
    return;
  }

  if (your === 'rock') {
    winner = (oppo === 'paper') ? 0 : 1;
  } else if (your === 'paper') {
    winner = (oppo === 'scissors') ? 0 : 1;
  } else {
    winner = (oppo === 'rock') ? 0 : 1;
  }

  if (winner === 1) { //you win
    setTimeout(function() {
      console.log("YOU WIN !");
      $("#you-picked-btn").addClass("winner");
      $("#show-winner").text("YOU WIN !")

      //update score
      var score = Number($("#score").text());
      $("#score").text(score + 1);
    }, 1000);

  } else { //oppo win
    setTimeout(function() {
      console.log("OPPO WIN!");
      $("#oppo-picked-btn").addClass("winner");
      $("#show-winner").text("YOU LOSE!");

      //update score
      var score = Number($("#score").text());
      $("#score").text(score - 1);
    }, 1000);
  }
}


let choices = ['rock', 'paper', 'scissors'];

function opponent(yourChoiceBtnName) {
  let n = (Math.floor(Math.random() * Date.now())) % 3; //Date.now() for number of seconds passed from 1970
  oppoChoiceBtnName = choices[n];
  console.log("OPPONENT CHOICE : " + oppoChoiceBtnName);

  //display opponent button
  setTimeout(function() {
    $("#oppo-picked-btn button").removeClass("btn-space");
    $("#oppo-picked-btn button").addClass(oppoChoiceBtnName);
    $("#oppo-picked-btn img").attr("src", `images/icon-${oppoChoiceBtnName}.svg`);
  }, 500);

  decideWinner(yourChoiceBtnName, oppoChoiceBtnName);
}


function start() {
  //add click event listener to all 3 color buttons on home section
  $("#home-section button").click(function(event) {
    yourChoiceBtnName = event.currentTarget.classList[1];
    console.log("YOUR CHOICE : " + yourChoiceBtnName);

    // $("#home-section").addClass("show-hide-section");
    // $("#in-game-section").removeClass("show-hide-section");
    $("#home-section").hide(); //hide
    $("#in-game-section").fadeIn("slow"); //show

    //show your selected button
    $("#you-picked-btn button").addClass(yourChoiceBtnName);
    $("#you-picked-btn img").attr("src", `images/icon-${yourChoiceBtnName}.svg`);

    opponent(yourChoiceBtnName);
  });
}

activateLowerBtn();
start();
