import classNames from 'classnames';
import React from 'react';

import './Tool.scss';

type Props = {
  name: string;
  isActive: boolean;
  setActiveTool: () => void;
};

export const Tool: React.FC<Props> = (props) => {
  const classes = classNames('tool__container', {
    'tool__container--active': props.isActive,
  });

  return (
    <div className={classes}>
      <button onClick={props.setActiveTool}>
        <span className={`tool_icon tool_icon__${props.name}`} />
      </button>
    </div>
  );
};
