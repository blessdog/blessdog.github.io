import * as T from "three";
import { INITIAL_SCREEN_DISTANCE } from "./constants";
import Camera from "./camera";
import Figure from "./figure";
import ScreenManager from "./screenManager";

class Game {
  constructor({ width, height, onUpdateScore, onEndGame }) {
    this.onUpdateScore = onUpdateScore;
    this.onEndGame = onEndGame;

    this.requestId = null;
    this.score = 0;

    this.figure = new Figure();
    this.camera = new Camera();
    this.scene = new T.Scene();
    this.renderer = new T.WebGLRenderer();
    this.screenManager = new ScreenManager();

    this.onUpdateScore(0);

    this.camera.setSize(width, height);
    this.updateCameraPosition();

    this.renderer.gammaInput = true;
    this.renderer.gammeOutput = true;
    this.renderer.setSize(width, height);

    this.scene.background = new T.Color(0x8bd9f2);
    this.scene.fog = new T.Fog(0x8bd9f2, 1, 1.5 * INITIAL_SCREEN_DISTANCE);

    this.scene.add(new T.AmbientLight(0x404040));

    const light = new T.DirectionalLight();
    light.position.set(-3, 5, 7);
    this.scene.add(light);

    this.scene.add(this.figure.mesh);

    this.screenManager.setNewHole(this.figure.getRandomProjection());
    this.screenManager.getScreens().forEach(s => {
      this.scene.add(s.mesh);
    });
  }

  animate = () => {
    this.requestId = requestAnimationFrame(this.animate);

    if (
      this.screenManager.isAtFigure() &&
      !this.screenManager.checkFit(this.figure.getCurrentProjection())
    ) {
      this.figure.turnRed();
      this.screenManager.stop();
      cancelAnimationFrame(this.requestId);
      this.requestId = null;
      this.onEndGame({ finalScore: this.score });
    }

    if (this.screenManager.isPastFigure()) {
      this.score += 1;
      this.onUpdateScore(this.score);
      this.figure.addBlocks();
      this.updateCameraPosition();
      this.screenManager.setNextScreen(this.figure.getRandomProjection());
    }

    this.figure.update();
    this.camera.update();
    this.screenManager.update();
    this.renderer.render(this.scene, this.camera.getCamera());
  };

  getDomElement = () => this.renderer.domElement;

  isRunning = () => !!this.requestId;

  reset = () => {
    this.score = 0;
    this.onUpdateScore(this.score);

    this.figure.reset();
    this.screenManager.reset();
    this.screenManager.setNewHole(this.figure.getRandomProjection());
    this.updateCameraPosition();
    this.animate();
  };

  updateCameraPosition = () => {
    this.camera.setDistance(500 + 0.5 * this.figure.maxDimension);
    this.camera.setOffset(90 + 0.5 * this.figure.maxDimension);
  };

  start = () => {
    this.animate();
  };

  resize = (width, height) => {
    this.camera.setSize(width, height);
    this.renderer.setSize(width, height);
  };

  rotateFigure = direction => {
    this.figure.rotate(direction);
  };

  toggleCamera = () => {
    this.camera.togglePosition();
  };

  zoom = () => {
    this.screenManager.zoom();
  };
}

export default Game;
