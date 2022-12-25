import { Figure } from './Figure';
import Cursor from './Cursor';
import Point from './Point';

class Rectangle implements Figure {
  private point: Point = new Point(0, 0);
  private dPoint: Point = new Point(0, 0);

  constructor(private ctx: CanvasRenderingContext2D, private cursor: Cursor) {
    const { startX, startY } = cursor.getMouse();
    this.point.updateCordinates(startX, startY);
  }

  update() {
    const { x, y } = this.cursor.getMouse();
    this.dPoint.updateCordinates(x, y);
  }

  draw() {
    const { x: diagX, y: diagY } = this.dPoint.subtact(this.point).getCordinates();
    const { x, y } = this.point.getCordinates();
    this.ctx.beginPath();
    this.ctx.rect(x, y, diagX, diagY);
    this.ctx.stroke();
  }
}

export default Rectangle;
