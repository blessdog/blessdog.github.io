import { Vector3 } from "three";
import random from "lodash/random";
import max from "lodash/max";
import min from "lodash/min";
import { getProjection } from "./projections";

export const addRandomUnit = coordinates => {
  const axis = ["x", "y", "z"][random(0, 2)];
  const direction = ["positive", "negative"][random(0, 1)];
  const projection = getProjection({ axis, coordinates });
  const column = projection[random(0, projection.length - 1)];

  addUnit({ coordinates, axis, direction, column });
};

const axisToIndex = {
  x: 0,
  y: 1,
  z: 2
};

export const addUnit = ({ coordinates, axis, direction, column }) => {
  const axesToGet = ["x", "y", "z"].filter(a => a !== axis);
  const columnCoordinates = coordinates
    .filter(c => c[axesToGet[0]] === column.x && c[axesToGet[1]] === column.y)
    .map(c => c[axis]);

  const newUnit = new Vector3();
  newUnit.setComponent(
    axisToIndex[axis],
    direction === "positive"
      ? max(columnCoordinates) + 1
      : min(columnCoordinates) - 1
  );
  newUnit.setComponent(axisToIndex[axesToGet[0]], column.x);
  newUnit.setComponent(axisToIndex[axesToGet[1]], column.y);

  coordinates.push(newUnit);
};
