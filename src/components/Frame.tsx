import React, { useEffect, useRef } from 'react';

import './Frame.scss';

export const Frame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onDrawStart = () => {
    /* TODO */
  };

  const onDrawEnd = () => {
    /* TODO */
  };

  const draw = () => {
    onDrawStart();
    onDrawEnd();
    /* TODO */
  };

  useEffect(() => {
    const reqId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(reqId);
  }, []);

  return (
    <div className="frame__container">
      <canvas ref={canvasRef} />
    </div>
  );
};
