import Cursor from './Cursor';
import { Tool } from './Tool';

type Point = {
  x: number;
  y: number;
};

const points: Point[] = [];

class Pencil implements Tool {
  constructor(private ctx: CanvasRenderingContext2D, private cursor: Cursor) { }

  update(): void {
    const { x, y } = this.cursor.getMouse();
    points.push({ x, y });
  }

  draw(): void {
    this.ctx.beginPath();
    for (const point of points) {
      this.ctx.lineTo(point.x, point.y);
    }
    this.ctx.stroke();
  }
}

export default Pencil;
