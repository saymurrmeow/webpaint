import React, { MouseEvent, useEffect, useRef } from 'react';

import './Frame.scss';

const DEFAULT_CANVAS_WIDTH = 800;
const DEFAULT_CANVAS_HEIGHT = 600;

export const Frame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleStartDrawing = (e: MouseEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.beginPath();
    ctx!.strokeStyle = 'blue';
    ctx?.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const handleEndDrawing = (e: MouseEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx?.stroke();
  };

  const draw = () => { };

  useEffect(() => {
    requestAnimationFrame(draw);
  }, []);

  return (
    <div className="frame__container">
      <canvas
        width={DEFAULT_CANVAS_WIDTH}
        height={DEFAULT_CANVAS_HEIGHT}
        onMouseDown={handleStartDrawing}
        onMouseUp={handleEndDrawing}
        ref={canvasRef}
      />
    </div>
  );
};
