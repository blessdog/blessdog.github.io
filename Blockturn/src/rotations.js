import { Matrix4, Quaternion } from "three";

const QUARTER_TURN = 0.5 * Math.PI;
const r = new Matrix4();
const TURN_LEFT = new Quaternion();
const TURN_RIGHT = new Quaternion();
const TURN_UP = new Quaternion();
const TURN_DOWN = new Quaternion();
const TURN_COUNTER_CLOCKWISE = new Quaternion();
const TURN_CLOCKWISE = new Quaternion();
TURN_LEFT.setFromRotationMatrix(r.makeRotationY(-QUARTER_TURN));
TURN_RIGHT.setFromRotationMatrix(r.makeRotationY(QUARTER_TURN));
TURN_UP.setFromRotationMatrix(r.makeRotationX(-QUARTER_TURN));
TURN_DOWN.setFromRotationMatrix(r.makeRotationX(QUARTER_TURN));
TURN_COUNTER_CLOCKWISE.setFromRotationMatrix(r.makeRotationZ(QUARTER_TURN));
TURN_CLOCKWISE.setFromRotationMatrix(r.makeRotationZ(-QUARTER_TURN));

export const rotate = (direction, rotation) => {
  switch (direction) {
    case "left":
      rotation.premultiply(TURN_LEFT);
      break;
    case "right":
      rotation.premultiply(TURN_RIGHT);
      break;
    case "up":
      rotation.premultiply(TURN_UP);
      break;
    case "down":
      rotation.premultiply(TURN_DOWN);
      break;
    case "counter-clockwise":
      rotation.premultiply(TURN_COUNTER_CLOCKWISE);
      break;
    case "clockwise":
      rotation.premultiply(TURN_CLOCKWISE);
      break;
    default:
      break;
  }
};
