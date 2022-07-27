import { Vector2 } from "three";
import { getOutline } from "../shapes";
import { UNIT_SIZE } from "../constants";

it("Gets an outline for a unit square", () => {
  expect(getOutline([new Vector2(0, 0)])).toEqual([
    new Vector2(-0.5 * UNIT_SIZE, -0.5 * UNIT_SIZE),
    new Vector2(0.5 * UNIT_SIZE, -0.5 * UNIT_SIZE),
    new Vector2(0.5 * UNIT_SIZE, 0.5 * UNIT_SIZE),
    new Vector2(-0.5 * UNIT_SIZE, 0.5 * UNIT_SIZE)
  ]);
});

it("Gets an outline for a double unit", () => {
  // * *
  expect(getOutline([
    new Vector2(0, 0),
    new Vector2(1, 0)
  ])).toEqual([
    new Vector2(-UNIT_SIZE, -0.5 * UNIT_SIZE),
    new Vector2(UNIT_SIZE, -0.5 * UNIT_SIZE),
    new Vector2(UNIT_SIZE, 0.5 * UNIT_SIZE),
    new Vector2(-UNIT_SIZE, 0.5 * UNIT_SIZE)
  ]);
});

it("Gets an outline for a small L", () => {
  // *
  // * *
  expect(getOutline([
    new Vector2(0, 0),
    new Vector2(1, 0),
    new Vector2(0, 1)
  ])).toEqual([
    new Vector2(-UNIT_SIZE, -UNIT_SIZE),
    new Vector2(UNIT_SIZE, -UNIT_SIZE),
    new Vector2(UNIT_SIZE, 0),
    new Vector2(0, 0),
    new Vector2(0, UNIT_SIZE),
    new Vector2(-UNIT_SIZE, UNIT_SIZE)
  ]);
});

it("Gets an outline for a shape that doesn't start on origin", () => {
  // * *
  //   *
  expect(getOutline([
    new Vector2(1, 0),
    new Vector2(0, 1),
    new Vector2(1, 1)
  ])).toEqual([
    new Vector2(0, -UNIT_SIZE),
    new Vector2(UNIT_SIZE, -UNIT_SIZE),
    new Vector2(UNIT_SIZE, UNIT_SIZE),
    new Vector2(-UNIT_SIZE, UNIT_SIZE),
    new Vector2(-UNIT_SIZE, 0),
    new Vector2(0, 0)
  ]);
});

it("Gets an outline for another shape", () => {
  // * * *
  // *
  expect(getOutline([
    new Vector2(-1, 0),
    new Vector2(0, 0),
    new Vector2(1, 0),
    new Vector2(-1, -1)
  ])).toEqual([
    new Vector2(-1.5 * UNIT_SIZE, -UNIT_SIZE),
    new Vector2(-0.5 * UNIT_SIZE, -UNIT_SIZE),
    new Vector2(-0.5 * UNIT_SIZE, 0),
    new Vector2(1.5 * UNIT_SIZE, 0),
    new Vector2(1.5 * UNIT_SIZE, UNIT_SIZE),
    new Vector2(-1.5 * UNIT_SIZE, UNIT_SIZE)
  ]);
});
