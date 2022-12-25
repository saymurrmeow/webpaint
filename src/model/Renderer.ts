import Cursor from './Cursor';
import { Figure } from './Figure';
import { DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT } from '../constaints';

import Line from './Line';
import Pencil from './Pencil';
import Rectangle from './Rectangle';
import Elipse from './Elipse';

//TODO refactor
class Renderer {
  private cursor: Cursor;
  private activeTool = Elipse;
  private items: Figure[] = [];
  private figure = null;

  constructor(private canvasInstance: HTMLCanvasElement) {
    this.cursor = new Cursor(canvasInstance);
  }

  private clear() {
    const ctx = this.canvasInstance.getContext('2d');
    ctx?.clearRect(0, 0, DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT);
  }

  private update() {
    const mouse = this.cursor.getMouse();
    if (mouse.left) {
      // TODO the worst thing in life
      if (!this.figure) {
        this.figure = new this.activeTool(this.canvasInstance.getContext('2d'), this.cursor);
      }
      this.figure.update();
      this.figure.draw();
    }

    if (mouse.prevLeft && !mouse.left) {
      this.figure.update();
      this.items.push(this.figure);
      this.figure = null;
    }

    this.cursor.tick();
  }

  private render() {
    for (const item of this.items) {
      item.draw();
    }
  }

  tick() {
    this.clear();
    this.update();
    this.render();
    requestAnimationFrame(() => this.tick());
  }
}

export default Renderer;
