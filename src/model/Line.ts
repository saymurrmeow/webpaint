import Cursor from './Cursor';
import { Figure } from './Figure';
import Point from './Point';

class Line implements Figure {
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
    const dx = this.dPoint.getCordinates().x;
    const dy = this.dPoint.getCordinates().y;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(dx, dy);
    this.ctx.stroke();
  }
}

export default Line;
