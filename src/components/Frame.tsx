import React, { useEffect, useRef } from 'react';

import './Frame.scss';
import Renderer from '../model/Renderer';
import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH } from '../constaints';
import { connect } from 'react-redux';
import { RootState } from 'src/store';

type Props = {
  activeTool: string;
};

export const Frame: React.FC<Props> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    // TODO
    console.log(props.activeTool);
    const renderer = new Renderer(canvas);
    rendererRef.current = renderer;
    renderer.tick();
  }, []);

  useEffect(() => {
    rendererRef.current.setActiveTool(props.activeTool);
  }, [props.activeTool]);

  return (
    <div className="frame__container">
      <canvas width={DEFAULT_CANVAS_WIDTH} height={DEFAULT_CANVAS_HEIGHT} ref={canvasRef} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  activeTool: state.toolReducer.activeTool,
});

export default connect(mapStateToProps)(Frame);
