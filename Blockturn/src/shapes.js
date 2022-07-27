import { Vector2 } from "three";
import { UNIT_SIZE } from "./constants";

const center = vertices => {
  let xMin = null, xMax = null, yMin = null, yMax = null;

  vertices.forEach(vertex => {
    if (xMin === null || vertex.x < xMin) {
      xMin = vertex.x;
    }
    if (yMin === null || vertex.y < yMin) {
      yMin = vertex.y;
    }
    if (xMax === null || vertex.x > xMax) {
      xMax = vertex.x;
    }
    if (yMax === null || vertex.y > yMax) {
      yMax = vertex.y;
    }
  });

  const xOffset = -xMin - 0.5 * (xMax - xMin);
  const yOffset = -yMin - 0.5 * (yMax - yMin);

  return vertices.map(
    vertex => new Vector2(vertex.x + xOffset, vertex.y + yOffset)
  );
};

export const getOutline = coordinates => {
  const vertices = [];

  const hasCoordinates = coor =>
    coordinates.some(c => c.x === coor.x && c.y === coor.y);

  const getRight = () => {
    switch (currentDirection) {
      case "right":
        return new Vector2(currentPosition.x + 1, currentPosition.y - 1);
      case "up":
        return new Vector2(currentPosition.x + 1, currentPosition.y + 1);
      case "left":
        return new Vector2(currentPosition.x - 1, currentPosition.y + 1);
      case "down":
        return new Vector2(currentPosition.x - 1, currentPosition.y - 1);
      default:
        break;
    }
  };

  const getStraight = () => {
    switch (currentDirection) {
      case "right":
        return new Vector2(currentPosition.x + 1, currentPosition.y);
      case "up":
        return new Vector2(currentPosition.x, currentPosition.y + 1);
      case "left":
        return new Vector2(currentPosition.x - 1, currentPosition.y);
      case "down":
        return new Vector2(currentPosition.x, currentPosition.y - 1);
      default:
        break;
    }
  };

  const turnRight = () => {
    switch (currentDirection) {
      case "right":
        vertices.push(
          new Vector2(
            (currentPosition.x + 1) * UNIT_SIZE,
            currentPosition.y * UNIT_SIZE
          )
        );
        currentPosition = getRight();
        currentDirection = "down";
        break;
      case "up":
        vertices.push(
          new Vector2(
            (currentPosition.x + 1) * UNIT_SIZE,
            (currentPosition.y + 1) * UNIT_SIZE
          )
        );
        currentPosition = getRight();
        currentDirection = "right";
        break;
      case "left":
        vertices.push(
          new Vector2(
            currentPosition.x * UNIT_SIZE,
            (currentPosition.y + 1) * UNIT_SIZE
          )
        );
        currentPosition = getRight();
        currentDirection = "up";
        break;
      case "down":
        vertices.push(
          new Vector2(
            currentPosition.x * UNIT_SIZE,
            currentPosition.y * UNIT_SIZE
          )
        );
        currentPosition = getRight();
        currentDirection = "left";
        break;
      default:
        break;
    }
  };

  const goStraight = () => {
    switch (currentDirection) {
      case "right":
        currentPosition = getStraight();
        break;
      case "up":
        currentPosition = getStraight();
        break;
      case "left":
        currentPosition = getStraight();
        break;
      case "down":
        currentPosition = getStraight();
        break;
      default:
        break;
    }
  };

  const turnLeft = () => {
    switch (currentDirection) {
      case "right":
        vertices.push(
          new Vector2(
            (currentPosition.x + 1) * UNIT_SIZE,
            currentPosition.y * UNIT_SIZE
          )
        );
        currentDirection = "up";
        break;
      case "up":
        vertices.push(
          new Vector2(
            (currentPosition.x + 1) * UNIT_SIZE,
            (currentPosition.y + 1) * UNIT_SIZE
          )
        );
        currentDirection = "left";
        break;
      case "left":
        vertices.push(
          new Vector2(
            currentPosition.x * UNIT_SIZE,
            (currentPosition.y + 1) * UNIT_SIZE
          )
        );
        currentDirection = "down";
        break;
      case "down":
        vertices.push(
          new Vector2(
            currentPosition.x * UNIT_SIZE,
            currentPosition.y * UNIT_SIZE
          )
        );
        currentDirection = "right";
        break;
      default:
        break;
    }
  };

  const getStart = () => {
    let start = null;

    coordinates.forEach(c => {
      if (!start) {
        start = c;
        return;
      }

      if (c.y < start.y) {
        start = c;
        return;
      }

      if (c.y === start.y && c.x < start.x) {
        start = c;
      }
    });

    return start;
  };

  const start = getStart();
  let currentPosition = start;
  let currentDirection = "right";

  vertices.push(new Vector2(start.x * UNIT_SIZE, start.y * UNIT_SIZE));

  do {
    if (hasCoordinates(getRight())) {
      turnRight();
    } else if (hasCoordinates(getStraight())) {
      goStraight();
    } else {
      turnLeft();
    }
  } while (
    currentPosition.x !== start.x ||
    currentPosition.y !== start.y ||
    currentDirection !== "down"
  );

  return center(vertices);
};
