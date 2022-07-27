export const initializeKeyboard = ({
  getGameRunning,
  getGamePlayed,
  rotateFigure,
  toggleCamera,
  zoom,
  startGame,
  restartGame
}) => {
  window.addEventListener("keydown", evt => {
    if (["ArrowDown", "ArrowUp", "Space", "Tab"].includes(evt.code)) {
      evt.preventDefault();
    }

    if (getGameRunning()) {
      switch (evt.code) {
        case "ArrowDown":
          rotateFigure("down");
          break;
        case "ArrowUp":
          rotateFigure("up");
          break;
        case "ArrowLeft":
          rotateFigure("left");
          break;
        case "ArrowRight":
          rotateFigure("right");
          break;
        case "BracketLeft":
          rotateFigure("counter-clockwise");
          break;
        case "BracketRight":
          rotateFigure("clockwise");
          break;
        case "KeyQ":
        case "Tab":
          toggleCamera();
          break;
        case "Space":
          zoom();
          break;
        default:
          break;
      }
    } else {
      if (evt.code === "Space") {
        if (getGamePlayed()) {
          restartGame();
        } else {
          startGame();
        }
      }
    }
  });
};

