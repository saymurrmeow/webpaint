import Cursor from './Cursor';
import { Tool } from './Tool';
import { DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT } from '../constaints';

import Line from './Line';

class Renderer {
  private cursor: Cursor;
  private activeTool!: Tool;
  private items: Tool[] = [];

  constructor(private canvasInstance: HTMLCanvasElement) {
    this.cursor = new Cursor(canvasInstance);
  }

  private clear() {
    const ctx = this.canvasInstance.getContext('2d');
    ctx?.clearRect(0, 0, DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT);
  }

  private update() {
    this.activeTool = new Line(this.canvasInstance.getContext('2d'), this.cursor);
    const mouse = this.cursor.getMouse();
    if (mouse.left) {
      this.activeTool.update();
      this.activeTool.draw();
    }

    if (mouse.prevLeft && !mouse.left) {
      this.activeTool.update();
      this.items.push(this.activeTool);
    }

    this.cursor.tick();
  }

  private render() {
    for (const item of this.items) {
      item.draw();
    }
  }

  tick = () => {
    this.clear();
    this.update();
    this.render();
    requestAnimationFrame(this.tick);
  };
}

export default Renderer;
