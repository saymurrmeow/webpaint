import React from 'react';

import { Frame } from './Frame';
import { MainMenu } from './MainMenu';
import './App.scss';
import { Toolbar } from './Toolbar';

const App = () => {
  return (
    <div className="layout__container">
      <MainMenu />
      <div className="mid_layout__container">
        <Toolbar />
        <Frame />
      </div>
    </div>
  );
};

export default App;
