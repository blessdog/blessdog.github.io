import { Shape, Path, ExtrudeGeometry, Mesh, Vector2 } from "three";
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  MATERIAL,
  TRANSPARENT_MATERIAL,
  INITIAL_RATE,
  ZOOM_RATE,
  INITIAL_CAMERA_DISTANCE
} from "./constants";
import { getOutline } from "./shapes";
import { isEquivalent } from "./projections";

const extrudeSettings = { depth: 1, bevelEnabled: false };

class Screen {
  constructor() {
    let projection;
    let isZooming = false;
    const shape = new Shape([
      new Vector2(-0.5 * SCREEN_WIDTH, 0.5 * SCREEN_HEIGHT),
      new Vector2(-0.5 * SCREEN_WIDTH, -0.5 * SCREEN_HEIGHT),
      new Vector2(0.5 * SCREEN_WIDTH, -0.5 * SCREEN_HEIGHT),
      new Vector2(0.5 * SCREEN_WIDTH, 0.5 * SCREEN_HEIGHT)
    ]);
    const mesh = new Mesh(
      new ExtrudeGeometry(shape, extrudeSettings),
      MATERIAL
    );

    this.mesh = mesh;

    this.moveTo = distance => {
      mesh.position.set(0, 0, distance);
      if (mesh.position.z < 0) {
        mesh.material = MATERIAL;
      }
    };

    this.zoom = () => {
      isZooming = true;
    };

    this.setNewHole = p => {
      isZooming = false;
      projection = p;
      const outline = getOutline(projection);
      const hole = new Path(outline);
      shape.holes = [hole];
      mesh.geometry = new ExtrudeGeometry(shape, extrudeSettings);
    };

    this.checkFit = figureProjection =>
      isEquivalent(figureProjection, projection);

    this.isAtFigure = () =>
      isZooming
        ? mesh.position.z + ZOOM_RATE >= 0
        : mesh.position.z + INITIAL_RATE >= 0;

    this.isPastFigure = () => mesh.position.z > 0;

    this.isOffCamera = () => mesh.position.z > INITIAL_CAMERA_DISTANCE;

    this.update = () => {
      if (mesh.position.z >= 0) {
        isZooming = false;
        mesh.material = TRANSPARENT_MATERIAL;
        mesh.material.opacity = 1 - (mesh.position.z / INITIAL_CAMERA_DISTANCE);
      }

      if (isZooming) {
        if (mesh.position.z + ZOOM_RATE > 0) {
          mesh.translateZ(Math.max(INITIAL_RATE, -mesh.position.z));
        } else {
          mesh.translateZ(ZOOM_RATE);
        }
      } else {
        mesh.translateZ(INITIAL_RATE);
      }
    };
  }
}

export default Screen;
