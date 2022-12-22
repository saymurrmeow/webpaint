import React, { useEffect, useRef } from 'react';

import './Frame.scss';
import Line from '../useCase/Line';
import Cursor from '../useCase/Cursor';

const DEFAULT_CANVAS_WIDTH = 800;
const DEFAULT_CANVAS_HEIGHT = 600;

const items: Line[] = [];

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

      const line = new Line(ctx, cursor);

      if (cursor.mouse.left) {
        line.update();
        line.draw();
      }

      if (!cursor.mouse.left && cursor.mouse.prevLeft) {
        line.update();
        items.push(line);
      }

      for (const item of items) {
        item.draw();
      }

      cursor.tick();
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
