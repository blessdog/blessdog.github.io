import registerServiceWorker from "./registerServiceWorker";
import Game from "./game";
import debounce from "lodash/debounce";
import { deviceHasTouch } from "./utils";
import { initializeKeyboard } from "./keyboard";
import { initializeTouch } from "./touch";
import "./styles/reset.css";
import "./styles/styles.css";

const startScreenEl = document.getElementById("start-screen");
const startButtonEl = document.getElementById("start-button");
const endScreenEl = document.getElementById("end-screen");
const finalScoreEl = document.getElementById("final-score");
const highScoreEl = document.getElementById("high-score");
const restartButtonEl = document.getElementById("restart-button");
const scoreEl = document.getElementById("score");

let highScore = localStorage.getItem("high-score") || 0;
let gamePlayed = false;

const handleUpdateScore = score => {
  scoreEl.innerText = score;
};

const handleEndGame = ({ finalScore }) => {
  if (finalScore > highScore) {
    highScore = finalScore;
    localStorage.setItem("high-score", highScore);
  }
  finalScoreEl.innerText = finalScore;
  highScoreEl.innerText = highScore;
  endScreenEl.style.display = "block";
  endScreenEl.className = "inactive";
  requestAnimationFrame(() => {
    endScreenEl.className = "active";
  });
};

const game = new Game({
  width: window.innerWidth,
  height: window.innerHeight,
  onUpdateScore: handleUpdateScore,
  onEndGame: handleEndGame
});

const startGame = () => {
  startScreenEl.style.display = "none";
  game.start();
  gamePlayed = true;
};

const restartGame = () => {
  endScreenEl.style.display = "none";
  game.reset();
};

startButtonEl.addEventListener("click", startGame);
restartButtonEl.addEventListener("click", restartGame);

window.addEventListener(
  "resize",
  debounce(() => {
    game.resize(window.innerWidth, window.innerHeight);
  }, 300)
);

initializeKeyboard({
  rotateFigure: game.rotateFigure,
  zoom: game.zoom,
  toggleCamera: game.toggleCamera,
  getGameRunning: game.isRunning,
  getGamePlayed: () => gamePlayed,
  startGame,
  restartGame
});

if (deviceHasTouch()) {
  initializeTouch({
    rotateFigure: game.rotateFigure,
    zoom: game.zoom
  });
}

document.body.appendChild(game.getDomElement());
registerServiceWorker();
