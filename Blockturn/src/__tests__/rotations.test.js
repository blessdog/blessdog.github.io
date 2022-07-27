import { rotate } from "../rotations";
import { Euler, Quaternion } from "three";

it("rotates left", () => {
  const direction = new Quaternion();
  direction.setFromEuler(new Euler(0, 0, 0));

  rotate("left", direction);

  const e = new Euler();
  e.setFromQuaternion(direction);

  expect(e.x).toBeCloseTo(0);
  expect(e.y).toBeCloseTo(-0.5 * Math.PI);
  expect(e.z).toBeCloseTo(0);
});

it("rotates left after rotating up", () => {
  const direction = new Quaternion();
  direction.setFromEuler(new Euler(-0.5 * Math.PI, 0, 0));

  rotate("left", direction);

  const e = new Euler();
  e.setFromQuaternion(direction);

  expect(e.x).toBeCloseTo(-0.5 * Math.PI);
  expect(e.y).toBeCloseTo(0);
  expect(e.z).toBeCloseTo(-0.5 * Math.PI);
});

it("rotates right", () => {
  const direction = new Quaternion();
  direction.setFromEuler(new Euler(0, 0, 0));

  rotate("right", direction);

  const e = new Euler();
  e.setFromQuaternion(direction);

  expect(e.x).toBeCloseTo(0);
  expect(e.y).toBeCloseTo(0.5 * Math.PI);
  expect(e.z).toBeCloseTo(0);
});

it("rotates up", () => {
  const direction = new Quaternion();
  direction.setFromEuler(new Euler(0, 0, 0));

  rotate("up", direction);

  const e = new Euler();
  e.setFromQuaternion(direction);

  expect(e.x).toBeCloseTo(-0.5 * Math.PI);
  expect(e.y).toBeCloseTo(0);
  expect(e.z).toBeCloseTo(0);
});

it("rotates down", () => {
  const direction = new Quaternion();
  direction.setFromEuler(new Euler(0, 0, 0));

  rotate("down", direction);

  const e = new Euler();
  e.setFromQuaternion(direction);

  expect(e.x).toBeCloseTo(0.5 * Math.PI);
  expect(e.y).toBeCloseTo(0);
  expect(e.z).toBeCloseTo(0);
});
