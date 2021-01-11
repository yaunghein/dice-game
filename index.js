const alertText = document.getElementsByClassName("alert")[0];
const player1Score = document.getElementById("player1-score");
const player2Score = document.getElementById("player2-score");
const player1Dice = document.getElementsByClassName("player1-dice")[0];
const player2Dice = document.getElementsByClassName("player2-dice")[0];
const rollBtn = document.getElementsByClassName("roll-btn")[0];
const resetBtn = document.getElementsByClassName("reset-btn")[0];
const model = document.getElementsByClassName("model")[0];
const h1 = document.getElementsByClassName("modelH1")[0];
const winnerPopup = document.getElementsByClassName("winner-popup")[0];
let player1Turn = true;
let player1TotalScore = 0;
let player2TotalScore = 0;
let player1TurnCount = 0;
let player2TurnCount = 0;

const playLottie = () => {
  const svg = document.createElement("svg");
  svg.classList.add("svg");
  winnerPopup.appendChild(svg);
  const animateLottie = bodymovin.loadAnimation({
    wrapper: svg,
    animType: "svg",
    loop: false,
    autoplay: false,
    path: "https://assets2.lottiefiles.com/packages/lf20_u4yrau.json",
  });
  animateLottie.goToAndPlay(0, true);
  animateLottie.addEventListener("complete", () => {
    svg.remove();
  });
};

const announceWinner = (winnerMessage) => {
  h1.textContent = winnerMessage;
  model.classList.add("active");
  playLottie();
};

const resetGame = () => {
  model.classList.remove("active");
  player1Dice.classList.remove("active");
  player2Dice.classList.remove("active");
  player1TotalScore = 0;
  player2TotalScore = 0;
  player1TurnCount = 0;
  player2TurnCount = 0;
  player1Dice.textContent = "-";
  player2Dice.textContent = "-";
  player1Score.textContent = player1TotalScore;
  player2Score.textContent = player2TotalScore;
  alertText.textContent = "Player 1 Turn!";
  player1Turn = true;
};

player1Dice.classList.add("active");
const rollTheDice = () => {
  let randomDiceNumber = Math.floor(Math.random() * 6) + 1;
  if (player1Turn) {
    player1Dice.textContent = randomDiceNumber;
    player1TotalScore += randomDiceNumber;
    player1Score.textContent = player1TotalScore;
    alertText.textContent = "Player 2 Turn!";
    player1TurnCount++;
    player1Dice.classList.remove("active");
    player2Dice.classList.add("active");
  } else {
    player2Dice.textContent = randomDiceNumber;
    player2TotalScore += randomDiceNumber;
    player2Score.textContent = player2TotalScore;
    alertText.textContent = "Player 1 Turn!";
    player2TurnCount++;
    player1Dice.classList.add("active");
    player2Dice.classList.remove("active");
  }
  if (player1TotalScore >= 20 && player1TurnCount === player2TurnCount) {
    if (player2TotalScore >= 20) {
      setTimeout(() => {
        h1.innerHTML = "🥳 Draw Match !!! 🥳";
        model.classList.add("active");
      }, 1000);
      playLottie();
      return;
    }
    setTimeout(announceWinner, 1000, "🥳 Player 1 wins!!! 🥳");
  }
  if (player2TotalScore >= 20 && player2TurnCount === player1TurnCount) {
    setTimeout(announceWinner, 1000, "🥳 Player 2 wins!!! 🥳");
  }
  player1Turn = !player1Turn;
};

rollBtn.addEventListener("click", rollTheDice);
resetBtn.addEventListener("click", resetGame);
