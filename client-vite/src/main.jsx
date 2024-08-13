import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Import Provider from React Redux
import store from './store'; // Import your Redux store
import App from './App';
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap your App component with the Provider */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
