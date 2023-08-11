import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';


function render() {
  const domNode = document.getElementById('root');
  const root = createRoot(domNode);
  root.render(<App/>);
}

render();