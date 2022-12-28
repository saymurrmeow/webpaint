import Cursor from './Cursor';
import { Shape } from './Shape';
import Point from './Point';

class Line implements Shape {
  private point = new Point(0, 0);
  private dPoint = new Point(0, 0);

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
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(dx, dy);
    this.ctx.stroke();
  }
}

export default Line;
