import Cursor from './Cursor';
import { Mode } from './Mode';

class Line implements Mode {
  x = 0;
  y = 0;
  dx = 0;
  dy = 0;

  constructor(private ctx: CanvasRenderingContext2D, private cursor: Cursor) {
    const { startX, startY } = cursor.getMouse();
    this.x = startX;
    this.y = startY;
  }

  update() {
    const { x, y } = this.cursor.getMouse();
    this.dx = x;
    this.dy = y;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.dx, this.dy);
    this.ctx.stroke();
  }
}

export default Line;
