import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import { Top } from './pages/top.jsx';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<Top />);
