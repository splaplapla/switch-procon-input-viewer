import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";

export const ColorPicker = () => {
  const [color, setColor] = useState("#ffffff");
  const changeColor = (c) => {
    setColor(c);
    document.body.style.backgroundColor = c;
  }

  return (
    <input type="color" value={color} onChange={e => changeColor(e.target.value)} />
  );
}
