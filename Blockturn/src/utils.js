export const deviceHasTouch = () =>
  "ontouchstart" in window ||
  (window.DocumentTouch && document instanceof window.DocumentTouch);
