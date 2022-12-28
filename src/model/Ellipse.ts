import { Shape } from './Shape';
import Cursor from './Cursor';
import Point from './Point';

class Ellipse implements Shape {
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
    const { x, y } = this.point.getCordinates();
    const { x: dx, y: dy } = this.dPoint.getCordinates();
    this.ctx.save();
    this.ctx.beginPath();
    const scaleX = 1 * ((x - dx) / 2);
    const scaleY = 1 * ((y - dy) / 2);
    this.ctx.scale(scaleX, scaleY);
    const centerX = dx / scaleX + 1;
    const centerY = dy / scaleY + 1;
    this.ctx.arc(centerX, centerY, 1, 0, Math.PI * 2);
    this.ctx.restore();
    this.ctx.stroke();
  }
}
export default Ellipse;
