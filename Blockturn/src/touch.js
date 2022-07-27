import clone from "lodash/clone";

const touchEl = document.getElementById("touch");

const UNIT = 60;
const TAP_TIME_THRESHOLD = 300;
const TAP_MOVEMENT_THRESHOLD = 9;

let initial = null;
let rotations = null;
let touchStartTime = null;
let tapMovementThresholdPast = false;

const distanceBetween = (p1, p2) => {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export const initializeTouch = ({ zoom, rotateFigure }) => {
  touchEl.style.display = "block";

  touchEl.addEventListener("touchstart", evt => {
    evt.preventDefault();

    initial = { x: evt.touches[0].clientX, y: evt.touches[0].clientY };
    rotations = { x: 0, y: 0 };
    touchStartTime = new Date().getTime();
    tapMovementThresholdPast = false;
  });

  touchEl.addEventListener("touchmove", evt => {
    const current = { x: evt.touches[0].clientX, y: evt.touches[0].clientY };

    if (
      !tapMovementThresholdPast &&
      distanceBetween(initial, current) > TAP_MOVEMENT_THRESHOLD
    ) {
      tapMovementThresholdPast = true;
    }

    const previousRotations = clone(rotations);

    rotations.x = Math.round((current.x - initial.x) / UNIT);
    rotations.y = Math.round((current.y - initial.y) / UNIT);

    if (rotations.x > previousRotations.x) {
      rotateFigure("right");
    } else if (rotations.x < previousRotations.x) {
      rotateFigure("left");
    }

    if (rotations.y > previousRotations.y) {
      rotateFigure("down");
    } else if (rotations.y < previousRotations.y) {
      rotateFigure("up");
    }
  }, { passive: true });

  touchEl.addEventListener("touchend", evt => {
    evt.preventDefault();

    const time = new Date().getTime();

    if (
      time - touchStartTime < TAP_TIME_THRESHOLD &&
      !tapMovementThresholdPast
    ) {
      zoom();
    }
  });
};
