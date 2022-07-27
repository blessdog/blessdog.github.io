import { UNIT_SIZE } from "./constants";

export const getDimensions = cubeCoordinates => {
  let xMin = null,
    xMax = null,
    yMin = null,
    yMax = null,
    zMin = null,
    zMax = null;

  cubeCoordinates.forEach(coor => {
    if (xMin === null || coor.x < xMin) {
      xMin = coor.x;
    }
    if (yMin === null || coor.y < yMin) {
      yMin = coor.y;
    }
    if (zMin === null || coor.z < zMin) {
      zMin = coor.z;
    }
    if (xMax === null || coor.x > xMax) {
      xMax = coor.x;
    }
    if (yMax === null || coor.y > yMax) {
      yMax = coor.y;
    }
    if (zMax === null || coor.z > zMax) {
      zMax = coor.z;
    }
  });

  return {
    width: (xMax - xMin + 1) * UNIT_SIZE,
    height: (yMax - yMin + 1) * UNIT_SIZE,
    depth: (zMax - zMin + 1) * UNIT_SIZE,
    x: xMin * UNIT_SIZE - 0.5 * UNIT_SIZE,
    y: yMin * UNIT_SIZE - 0.5 * UNIT_SIZE,
    z: zMin * UNIT_SIZE - 0.5 * UNIT_SIZE
  };
};
