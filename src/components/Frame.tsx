import React, { MouseEvent, useEffect, useRef, useState } from 'react';

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

const items = [];

class Cursor {
  private x = 0;
  private y = 0;
  private left = false;

  private activeTool!: Line;

  constructor(private canvasInstance: HTMLCanvasElement) {
    canvasInstance.addEventListener('mousemove', this.handleMouseMove.bind(this));
    canvasInstance.addEventListener('mousedown', this.handleMouseDown.bind(this));
    canvasInstance.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  handleMouseMove(e: MouseEvent) {
    const { left, top } = this.canvasInstance.getBoundingClientRect();
    const { clientX, clientY } = e;
    this.x = clientX - left;
    this.y = clientY - top;
    if (this.left) {
      this.activeTool.update(this.x, this.y);
      this.activeTool.draw(this.canvasInstance.getContext('2d'));
    }
  }

  handleMouseDown() {
    this.left = true;
    this.activeTool = new Line();
    this.activeTool.onDrawStart(this.x, this.y);
  }

  handleMouseUp() {
    this.left = false;
    items.push(this.activeTool);
  }
}

export const Frame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const render = () => {
    requestAnimationFrame(tick);

    function tick() {
      requestAnimationFrame(tick);

      const ctx = canvasRef.current!.getContext('2d')!;
      ctx?.clearRect(0, 0, DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT);

      for (const item of items) {
        item.draw(ctx);
      }
    }
  };
  useEffect(() => {
    render();
    const cursor = new Cursor(canvasRef.current);
  }, []);

  return (
    <div className="frame__container">
      <canvas width={DEFAULT_CANVAS_WIDTH} height={DEFAULT_CANVAS_HEIGHT} ref={canvasRef} />
    </div>
  );
};
