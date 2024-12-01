import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';

// Create a root using ReactDOM.createRoot and render the App component
ReactDOM.createRoot(document.getElementById('root')).render(
  // Wrap the App component with a Redux Provider to provide the Redux store
  <Provider store={store}>
    <App />
  </Provider>
);
