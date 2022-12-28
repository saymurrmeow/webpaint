import Cursor from './Cursor';
import Line from './Line';
import Pencil from './Pencil';
import Rectangle from './Rectangle';
import Ellipse from './Ellipse';

export type ShapeType = 'line' | 'pen' | 'rectangle' | 'ellipse';
export type ShapeOptions = {
  type: ShapeType;
  ctx: CanvasRenderingContext2D;
  cursor: Cursor;
};

class ShapeFactory {
  create(options: ShapeOptions) {
    switch (options.type) {
      case 'line':
        return new Line(options.ctx, options.cursor);
      case 'pen':
        return new Pencil(options.ctx, options.cursor);
      case 'rectangle':
        return new Rectangle(options.ctx, options.cursor);
      case 'ellipse':
        return new Ellipse(options.ctx, options.cursor);
    }
  }
}

export default ShapeFactory;
