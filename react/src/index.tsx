import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const setup = (element: HTMLElement|null) => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    element
  );
};
setup(document.getElementById('root'));
export default setup;


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
