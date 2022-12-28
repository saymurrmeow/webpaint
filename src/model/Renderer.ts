import Cursor from './Cursor';
import { Shape } from './Shape';
import { DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT } from '../constaints';

import Line from './Line';
import Pencil from './Pencil';
import Rectangle from './Rectangle';
import Ellipse from './Ellipse';

//TODO refactor
class Renderer {
  private cursor: Cursor;
  private activeTool = Ellipse;
  private items: Shape[] = [];
  private figure = null;

  constructor(private canvasInstance: HTMLCanvasElement) {
    this.cursor = new Cursor(canvasInstance);
  }

  setActiveTool(name: string) {
    switch (name) {
      case 'pen':
        this.activeTool = Pencil;
        return;
      case 'line':
        this.activeTool = Line;
        return;
      case 'rectangle':
        this.activeTool = Rectangle;
        return;
      case 'ellipse':
        this.activeTool = Ellipse;
        return;
      default:
        alert('NOT IMPLEMENTED!');
    }
  }

  private clear() {
    const ctx = this.canvasInstance.getContext('2d');
    ctx?.clearRect(0, 0, DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT);
  }

  private update() {
    const mouse = this.cursor.getMouse();

    if (mouse.left && !mouse.prevLeft) {
      // TODO the worst thing in life
      if (!this.figure) {
        this.figure = new this.activeTool(this.canvasInstance.getContext('2d'), this.cursor);
      }
      this.items.push(this.figure);
    }

    if (mouse.left) {
      this.figure.update();
    }

    if (mouse.prevLeft && !mouse.left) {
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
