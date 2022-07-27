import { PerspectiveCamera, Vector3 } from "three";
import {
  INITIAL_SCREEN_DISTANCE,
  CAMERA_POSITION_DECAY,
  INITIAL_CAMERA_DISTANCE,
} from "./constants";

class Camera {
  constructor() {
    this.side = "left";
    this.orientation = null;
    this.distance = INITIAL_CAMERA_DISTANCE;
    this.camera = new PerspectiveCamera(
      75,
      1,
      1,
      INITIAL_SCREEN_DISTANCE + this.distance + 10
    );

    this.camera.lookAt(new Vector3(0, 0, -INITIAL_SCREEN_DISTANCE));
  }

  getCamera = () => this.camera;

  setOffset = offset => {
    this.offset = offset;
  };

  setDistance = distance => {
    this.distance = distance;
  };

  togglePosition = () => {
    this.side = this.side === "left" ? "right" : "left";
  };

  update = () => {
    const desiredX = this.orientation === "landscape"
      ? this.side === "left" ? -this.offset : this.offset
      : 0;
    const desiredY = this.orientation === "landscape" ? 0.5 * this.offset : this.offset;
    this.camera.translateZ(CAMERA_POSITION_DECAY * (this.distance - this.camera.position.z));
    this.camera.translateX(CAMERA_POSITION_DECAY * (desiredX - this.camera.position.x));
    this.camera.translateY(CAMERA_POSITION_DECAY * (desiredY - this.camera.position.y));
  };

  setSize = (width, height) => {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.orientation = height > width ? "portrait" : "landscape";
    if (this.orientation === "portrait") {
      this.camera.setViewOffset(width, height, 0, 0.2 * height, width, height);
    } else {
      this.camera.setViewOffset(width, height, 0, 0, width, height);
    }
  };
}

export default Camera;
