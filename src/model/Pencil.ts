import Cursor from './Cursor';
import { Shape } from './Shape';
import Point from './Point';

class Pencil implements Shape {
  private points: Point[] = [];
  constructor(private ctx: CanvasRenderingContext2D, private cursor: Cursor) { }

  update(): void {
    const { x, y } = this.cursor.getMouse();
    const point = new Point(x, y);
    this.points.push(point);
  }

  draw(): void {
    this.ctx.beginPath();
    for (const point of this.points) {
      const { x, y } = point.getCordinates();
      this.ctx.lineTo(x, y);
    }
    this.ctx.stroke();
  }
}

export default Pencil;
