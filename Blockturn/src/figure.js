import { Group, Quaternion, Euler, Mesh, BoxBufferGeometry } from "three";
import max from "lodash/max";
import {
  UNIT_SIZE,
  MATERIAL,
  LOSER_MATERIAL,
  ROTATION_DECAY,
  INITIAL_FIGURE
} from "./constants";
import { rotate as _rotate } from "./rotations";
import { getDimensions } from "./measurements";
import { getProjection, getRandomProjection as _getRandomProjection } from "./projections";
import { addRandomUnit } from "./addUnit";

const unit = new BoxBufferGeometry(UNIT_SIZE, UNIT_SIZE, UNIT_SIZE);
const mesh = new Group();
const desiredRotation = new Quaternion();
let unitCoordinates = [].concat(INITIAL_FIGURE);
let cubes = [];

class Figure {
  constructor() {
    desiredRotation.setFromEuler(new Euler(0, 0, 0));

    this._generateCubesAndMesh();

    this.mesh = mesh;
  }

  rotate = direction => {
    _rotate(direction, desiredRotation);
  };

  getCurrentProjection = () => {
    const rotatedCoordinates = unitCoordinates.map(c =>
      c.clone().applyQuaternion(desiredRotation).round()
    );
    return getProjection({ axis: "z", coordinates: rotatedCoordinates });
  };

  getRandomProjection = () => _getRandomProjection(unitCoordinates);

  addBlocks = () => {
    addRandomUnit(unitCoordinates);
    this._generateCubesAndMesh();
  };

  turnRed = () => {
    cubes.forEach(cube => {
      cube.material = LOSER_MATERIAL;
    });
  };

  reset = () => {
    unitCoordinates = [].concat(INITIAL_FIGURE);
    this._generateCubesAndMesh();
  };

  update = () => {
    Quaternion.slerp(
      mesh.quaternion,
      desiredRotation,
      mesh.quaternion,
      ROTATION_DECAY
    );
  };

  _generateCubesAndMesh = () => {
    cubes.forEach(cube => {
      mesh.remove(cube);
    });

    const { width, height, depth, x, y, z } = getDimensions(unitCoordinates);

    cubes = unitCoordinates.map(c => {
      const cube = new Mesh(unit, MATERIAL);
      cube.position.set(c.x * UNIT_SIZE, c.y * UNIT_SIZE, c.z * UNIT_SIZE);
      cube.translateX(-0.5 * width - x);
      cube.translateY(-0.5 * height - y);
      cube.translateZ(-0.5 * depth - z);
      return cube;
    });

    cubes.forEach(cube => {
      mesh.add(cube);
    });

    this.maxDimension = max([width, height, depth]);
  };
}

export default Figure;
