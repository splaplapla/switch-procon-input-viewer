import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { Viewer } from "../components/viewer.jsx";

import GitHubForkRibbon from 'react-github-fork-ribbon';
const GFRibbon = () => (
  <GitHubForkRibbon href="https://github.com/splaplapla/switch-procon-input-viewer" target="_blank" position="right">
    Fork me on GitHub
  </GitHubForkRibbon>
);

export const Top = () => {
  return(
    <>
      <GFRibbon />
      <h1>SwitchProconInputViewer for PBM</h1>
      <Viewer />
    </>
  );
}
