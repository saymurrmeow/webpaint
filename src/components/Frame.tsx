import { current } from '@reduxjs/toolkit';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';

import './Frame.scss';

const DEFAULT_CANVAS_WIDTH = 800;
const DEFAULT_CANVAS_HEIGHT = 600;

class Line {
  x = 0;
  y = 0;
  dx = 0;
  dy = 0;

  constructor(startX: number, startY: number) {
    this.x = startX;
    this.y = startY;
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

class Cursor {
  private mouse = {
    x: 0,
    y: 0,
    startX: 0,
    startY: 0,
    left: false,
    prevLeft: false,
  };
  // TODO how bind canvas intead pass in constructor
  constructor(private canvasInstance: HTMLCanvasElement) {
    // TODO typing
    canvasInstance.addEventListener('mouseup', this.mouseUpHandler);
    canvasInstance.addEventListener('mousedown', this.mouseDownHandler);
    canvasInstance.addEventListener('mousemove', this.mouseMoveHandler);
  }

  mouseUpHandler = () => {
    this.mouse.left = false;
  };

  mouseDownHandler = () => {
    this.mouse.left = true;
    Object.assign(this.mouse, { startX: this.mouse.x, startY: this.mouse.y });
  };

  mouseMoveHandler = (e: MouseEvent) => {
    const { left, top } = this.canvasInstance.getBoundingClientRect();
    const { clientX, clientY } = e;
    Object.assign(this.mouse, { x: clientX - left, y: clientY - top });
  };

  tick() {
    Object.assign(this.mouse, { prevLeft: this.mouse.left });
  }
}

export const Frame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef();

  const render = () => {
    requestAnimationFrame(tick);

    function tick() {
      requestAnimationFrame(tick);
      const cursor = cursorRef.current;
      const ctx = canvasRef.current!.getContext('2d')!;
      ctx.clearRect(0, 0, DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT);
      const line = new Line(cursor.mouse.startX, cursor.mouse.startY);
      if (cursor.mouse.left) {
        line.update(cursor.mouse.x, cursor.mouse.y);
        line.draw(ctx);
      }

      if (!cursor.mouse.left && cursor.mouse.prevLeft) {
        line.update(cursor.mouse.x, cursor.mouse.y);
        items.push(line);
      }

      cursor.tick();
      for (const item of items) {
        item.draw(ctx);
      }
    }
  };

  useEffect(() => {
    render();
    const canvas = canvasRef.current!;

    const cursor = new Cursor(canvas);
    cursorRef.current = cursor;
  }, []);

  return (
    <div className="frame__container">
      <canvas width={DEFAULT_CANVAS_WIDTH} height={DEFAULT_CANVAS_HEIGHT} ref={canvasRef} />
    </div>
  );
};
