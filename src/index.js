import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { HashRouter } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

const root = createRoot(document.querySelector('#root'));
root.render(<Provider store={ store }>
  <ErrorBoundary>
  <HashRouter>
    <App />
  </HashRouter>
  </ErrorBoundary>
</Provider>);
