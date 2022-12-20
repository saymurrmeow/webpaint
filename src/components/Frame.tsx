import React, { MouseEvent, useEffect, useRef, useState } from 'react';

import './Frame.scss';

const DEFAULT_CANVAS_WIDTH = 800;
const DEFAULT_CANVAS_HEIGHT = 600;

const createMouse = (canvas) => {
  const mouse = {
    x: 0,
    y: 0,
    left: false,
    pLeft: false,
    over: false,
    startX: 0,
    startY: 0,
  };

  mouse.tick = mouseTick;

  function mouseTick() {
    mouse.pLeft = mouse.left;
  }

  canvas.addEventListener('mouseenter', mouseenterHandler);
  canvas.addEventListener('mousemove', mousemoveHandler);
  canvas.addEventListener('mouseleave', mouseleaveHandler);
  canvas.addEventListener('mousedown', mousedownHandler);
  canvas.addEventListener('mouseup', mouseupHandler);

  function mouseenterHandler(event) {
    mouse.over = true;
  }

  function mousemoveHandler(event) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
  }

  function mouseleaveHandler(event) {
    mouse.over = false;
  }

  function mousedownHandler(event) {
    if (event.buttons === 1) {
      mouse.left = true;
      mouse.startX = mouse.x;
      mouse.startY = mouse.y;
    }
  }

  function mouseupHandler(event) {
    if (event.button === 0) {
      mouse.left = false;
    }
  }

  return mouse;
};

export const Frame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef();

  const draw = () => {
    requestAnimationFrame(tick);

    function tick() {
      requestAnimationFrame(tick);

      const ctx = canvasRef.current?.getContext('2d');

      const mouse = mouseRef.current;
      mouse.tick();
      ctx?.clearRect(0, 0, DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT);
      if (mouse.left) {
        ctx?.beginPath();
        ctx?.moveTo(mouse.startX, mouse.startY);
        ctx?.lineTo(mouse.x, mouse.y);
        ctx?.stroke();
      }
    }
  };
  useEffect(() => {
    mouseRef.current = createMouse(canvasRef.current);
    draw();
  }, []);

  return (
    <div className="frame__container">
      <canvas width={DEFAULT_CANVAS_WIDTH} height={DEFAULT_CANVAS_HEIGHT} ref={canvasRef} />
    </div>
  );
};
