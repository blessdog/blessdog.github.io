import * as T from "three";

export const UNIT_SIZE = 60;

export const INITIAL_SCREEN_DISTANCE = 10000;
export const INITIAL_CAMERA_DISTANCE = 500;
export const CAMERA_POSITION_DECAY = 0.3;

export const ROTATION_DECAY = 0.4;

export const SCREEN_WIDTH = 40 * UNIT_SIZE;
export const SCREEN_HEIGHT = 30 * UNIT_SIZE;
export const MATERIAL = new T.MeshLambertMaterial({
  color: 0x78aede
});
export const TRANSPARENT_MATERIAL = new T.MeshLambertMaterial({
  color: 0x78aede,
  transparent: true,
  opacity: 0.4
});
export const LOSER_MATERIAL = new T.MeshLambertMaterial({
  color: 0xff0000,
});

export const INITIAL_RATE = 12;
export const ZOOM_RATE = 400;

export const INITIAL_FIGURE = [
  new T.Vector3(0, 0, 0),
  new T.Vector3(0, 0, 1),
  new T.Vector3(0, 1, 0),
  new T.Vector3(0, 1, 1),
  new T.Vector3(1, 0, 0),
  new T.Vector3(1, 0, 1),
  new T.Vector3(1, 1, 0),
  new T.Vector3(1, 1, 1)
];
