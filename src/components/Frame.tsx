import React, { MouseEvent, useEffect, useRef } from 'react';

import './Frame.scss';

const DEFAULT_CANVAS_WIDTH = 800;
const DEFAULT_CANVAS_HEIGHT = 600;

class Line {
  x = 0;
  y = 0;
  dx = 0;
  dy = 0;

  onDrawStart(x, y) {
    this.x = x;
    this.y = y;
  }

  update(dx: number, dy: number) {
    this.dx = dx;
    this.dy = dy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.dx, this.dy);
    ctx.stroke();
  }
}

const items: Line[] = [];

export const Frame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let line: Line;
  const mouse = {
    x: 0,
    y: 0,
    left: false,
  };

  const render = () => {
    requestAnimationFrame(tick);

    function tick() {
      requestAnimationFrame(tick);

      const ctx = canvasRef.current!.getContext('2d')!;
      ctx.clearRect(0, 0, DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT);

      if (mouse.left) {
        line.update(mouse.x, mouse.y);
        line.draw(ctx);
      }

      for (const item of items) {
        item.draw(ctx);
      }
    }
  };

  const mouseUpHandler = (e: MouseEvent) => {
    items.push(line);
    mouse.left = false;
  };

  const mouseDownHandler = (e: MouseEvent) => {
    mouse.left = true;
    line = new Line();
    line.onDrawStart(mouse.x, mouse.y);
  };

  const mouseMoveHandler = (e: MouseEvent) => {
    const { left, top } = canvasRef.current!.getBoundingClientRect();
    const { clientX, clientY } = e;
    mouse.x = clientX - left;
    mouse.y = clientY - top;
  };

  useEffect(() => {
    render();

    const canvas = canvasRef.current;
    canvas?.addEventListener('mouseup', mouseUpHandler);
    canvas?.addEventListener('mousedown', mouseDownHandler);
    canvas?.addEventListener('mousemove', mouseMoveHandler);
  }, []);

  return (
    <div className="frame__container">
      <canvas width={DEFAULT_CANVAS_WIDTH} height={DEFAULT_CANVAS_HEIGHT} ref={canvasRef} />
    </div>
  );
};
