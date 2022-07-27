import { Vector3, Vector2 } from "three";
import { addUnit } from "../addUnit";

it("Adds a unit", () => {
  const coordinates = [new Vector3(0, 0, 0)];
  const axis = "x";
  const direction = "positive";
  const column = new Vector2(0, 0);

  addUnit({ coordinates, axis, direction, column });

  expect(coordinates).toEqual([
    new Vector3(0, 0, 0),
    new Vector3(1, 0, 0)
  ]);
});

it("Adds a unit to different coordinates", () => {
  const coordinates = [new Vector3(10, 10, 10)];
  const axis = "x";
  const direction = "positive";
  const column = new Vector2(10, 10);

  addUnit({ coordinates, axis, direction, column });

  expect(coordinates).toEqual([
    new Vector3(10, 10, 10),
    new Vector3(11, 10, 10)
  ]);
});
