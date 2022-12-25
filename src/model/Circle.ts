import { Figure } from './Figure';
import Cursor from './Cursor';
import Point from './Point';

class Circle implements Figure {
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
    const center = this.point.getCordinates();
    const radius = this.point.distance(this.dPoint);
    this.ctx.beginPath();
    this.ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
    this.ctx.stroke();
  }
}
export default Circle;
