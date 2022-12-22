import Cursor from './Cursor';
import { Tool, ToolName } from './Tool';
import { DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT } from '../constaints';

import Line from './Line';
import Pencil from './Pencil';

type ToolConfig = {
  name: ToolName;
  ctx: CanvasRenderingContext2D;
  cursor: Cursor;
};

// TODO refactor
const toolFactory = ({ name, ctx, cursor }: ToolConfig) => {
  switch (name) {
    case ToolName.Line:
      return new Line(ctx, cursor);
    case ToolName.Pencil:
      return new Pencil(ctx, cursor);
  }
};

//TODO refactor
class Renderer {
  private cursor: Cursor;
  private activeToolName: ToolName = ToolName.Line;
  private items: Tool[] = [];

  constructor(private canvasInstance: HTMLCanvasElement) {
    this.cursor = new Cursor(canvasInstance);
  }

  private clear() {
    const ctx = this.canvasInstance.getContext('2d');
    ctx?.clearRect(0, 0, DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT);
  }

  private initTool() {
    return toolFactory({
      name: this.activeToolName,
      ctx: this.canvasInstance.getContext('2d'),
      cursor: this.cursor,
    });
  }

  private update() {
    const tool = this.initTool();
    const mouse = this.cursor.getMouse();
    if (mouse.left) {
      tool.update();
      tool.draw();
    }

    if (mouse.prevLeft && !mouse.left) {
      const tool = this.initTool();
      tool.update();
      this.items.push(tool);
    }

    this.cursor.tick();
  }

  private render() {
    for (const item of this.items) {
      item.draw();
    }
  }

  tick = () => {
    this.clear();
    this.update();
    this.render();
    requestAnimationFrame(this.tick);
  };
}

export default Renderer;
