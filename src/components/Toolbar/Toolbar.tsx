import React from 'react';

import Tool from './ToolContainer';
import './Toolbar.scss';

const tools = [
  { name: 'select_star' },
  { name: 'select_rectangle' },
  { name: 'eraser' },
  { name: 'pouring' },
  { name: 'pipette' },
  { name: 'magnifier' },
  { name: 'pen', active: true },
  { name: 'brush' },
  { name: 'spray' },
  { name: 'text' },
  { name: 'line' },
  { name: 'curve' },
  { name: 'rectangle' },
  { name: 'crooked' },
  { name: 'elipse' },
  { name: 'rounded_rectangle' },
];

export const Toolbar: React.FC = () => {
  return (
    <div className="toolbar__container">
      <ul>
        {tools.map((item) => (
          <Tool name={item.name} key={item.name} />
        ))}
      </ul>
    </div>
  );
};
