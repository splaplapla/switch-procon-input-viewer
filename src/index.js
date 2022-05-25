import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import { Top } from './pages/top.jsx';

function component() {
  const element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}
document.body.appendChild(component());

const axios = require('axios');
const port = 9900;
const host = '192.168.50.122';

function fetchProcon(port, host) {
  (async () => {
    try {
      const response = await axios.get(`http://${host}:${port}`)
      console.log(response.data.url);
      console.log(response.data.explanation);
    } catch (error) {
      console.log(error.response.body);
    }
  })();
};


fetchProcon(port, host)

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Top />);
