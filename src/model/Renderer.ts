import Cursor from './Cursor';
import { Shape } from './Shape';
import { DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT } from '../constaints';
import ShapeFactory, { ShapeType } from './ShapeFactory';

//TODO refactor
class Renderer {
  private cursor: Cursor;
  private factory: ShapeFactory = new ShapeFactory();
  private shapes: Shape[] = [];
  // not good actualy
  private activeShape: Shape | null = null;
  private activeShapeType: ShapeType = 'pen';

  constructor(private canvasInstance: HTMLCanvasElement) {
    this.cursor = new Cursor(canvasInstance);
  }

  setActiveTool(type: ShapeType) {
    this.activeShapeType = type;
  }

  private clear() {
    const ctx = this.canvasInstance.getContext('2d');
    ctx?.clearRect(0, 0, DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT);
  }

  private update() {
    const mouse = this.cursor.getMouse();

    if (mouse.isDown && !this.activeShape) {
      const ctx = this.canvasInstance.getContext('2d') as CanvasRenderingContext2D;
      this.activeShape = this.factory.create({
        type: this.activeShapeType,
        cursor: this.cursor,
        ctx,
      });
      this.shapes.push(this.activeShape);
    }

    if (mouse.left) {
      const lastShape = this.shapes[this.shapes.length - 1];
      lastShape.update();
    }

    if (mouse.isUp) {
      this.activeShape = null;
    }

    this.cursor.tick();
  }

  private render() {
    for (const item of this.shapes) {
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
