import React from 'react';

import './MainMenu.scss';

export const MainMenu: React.FC = () => {
  return (
    <div className="header__container">
      <ul className="menu__container">
        <li className="menu__element">File</li>
        <li className="menu__element">Edit</li>
        <li className="menu__element">View</li>
        <li className="menu__element">Image</li>
        <li className="menu__element">Options</li>
        <li className="menu__element">Help</li>
      </ul>
    </div>
  );
};
