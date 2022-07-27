import { Vector3, Vector2 } from "three";
import { getProjection, isEquivalent } from "../projections";

const coordinates = [
  new Vector3(0, 0, 0),
  new Vector3(-1, 0, 0),
  new Vector3(-1, 1, 0),
  new Vector3(1, 0, 0)
];

it("Gets projection for z-axis", () => {
  expect(getProjection({ axis: "z", coordinates })).toEqual([
    new Vector2(0, 0),
    new Vector2(-1, 0),
    new Vector2(-1, 1),
    new Vector2(1, 0)
  ]);
});

it("Gets projection for x-axis", () => {
  expect(getProjection({ axis: "x", coordinates })).toEqual([
    new Vector2(0, 0),
    new Vector2(1, 0)
  ]);
});

it("Marks equal projections as equivalent", () => {
  expect(isEquivalent([new Vector2(0, 0)], [new Vector2(0, 0)])).toBe(true);
});

it("Marks unequal projections as different", () => {
  expect(
    isEquivalent([new Vector2(0, 0)], [new Vector2(0, 0), new Vector2(1, 0)])
  ).toBe(false);
});

it("Marks translations as equivalent", () => {
  expect(isEquivalent([new Vector2(0, 0)], [new Vector2(1, 0)])).toBe(true);
});

it("Marks different shapes as different", () => {
  expect(
    isEquivalent(
      [new Vector2(0, 0), new Vector2(0, 1)],
      [new Vector2(0, 0), new Vector2(1, 0)]
    )
  ).toBe(false);
});

it("Ignores coordinates that have different order", () => {
  expect(
    isEquivalent(
      [new Vector2(0, 0), new Vector2(0, 1)],
      [new Vector2(0, 1), new Vector2(0, 0)]
    )
  ).toBe(true);
});
