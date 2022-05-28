import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { Storage } from "../lib/storage.js"

export const ColorPicker = () => {
  const readDefaultColor = () => {
    const defaultColor = "#ffffff";
    const c = Storage.read("backgroudColor") || defaultColor;
    document.body.style.backgroundColor = c;
    return c;
  }
  const defaultColor = readDefaultColor();
  const [color, setColor] = useState(defaultColor);

  const changeColor = (c) => {
    setColor(c);
    document.body.style.backgroundColor = c;
    Storage.write("backgroudColor", c);
  }

  return (
    <input type="color" value={color} onChange={e => changeColor(e.target.value)} />
  );
}
