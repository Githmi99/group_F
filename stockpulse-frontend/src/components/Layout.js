// src/components/Layout.js
import React from 'react';
import NavigationPanel from './NavigationPanel';
import './Layout.css';

function Layout({ children }) {
  return (
    <div className="layout">
      <div className="navigation-panel">
        <NavigationPanel />
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default Layout;
