import Cursor from './Cursor';
import { Tool } from './Tool';

class Pencil implements Tool {
  constructor(private ctx: CanvasRenderingContext2D, private cursor: Cursor) { }

  update(): void { }

  draw(): void { }
}

export default Pencil;
