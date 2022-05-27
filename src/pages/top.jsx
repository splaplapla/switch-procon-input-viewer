import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Procon } from "../components/procn.jsx";

const axios = require('axios');

const ProconStatusFetcher = ({ destinationServer }) => {
  const [proconButtons, setProconButtons] = useState([]);
  const [proconLeftStickX, setProconLeftStickX] = useState(0);
  const [proconLeftStickY, setProconLeftStickY] = useState(0);

  const fetchProcon = (destinationServer) => {
    // TODO no configurationの名前解決ができるようにする
    (async () => {
      try {
        const response = await axios.get(`http://${destinationServer}`)
        console.log(response.data);
        setProconButtons(response.data.buttons)
        setProconLeftStickX(response.data.left_analog_stick.x)
        setProconLeftStickX(response.data.left_analog_stick.y)
      } catch (error) {
        console.error(error.response);
      }
    })();
  }

  useEffect(() => {
    const timerid = setInterval(() => {
      fetchProcon(destinationServer);
    }, 200);

    return () => {
      clearInterval(timerid);
    };
  }, []);


  return(
    <>
      {<Procon />}
      <hr />
      <div>
        {proconButtons}
      </div>
      <div>
        x: {proconLeftStickX}
      </div>
      <div>
        y: {proconLeftStickY}
      </div>
    </>
  );
}

const Viewer = () => {
  // TODO cookieに書き込んで復元できるようにする
  const [serverName, setServerName] = useState('192.168.50.122:9900');
  const [checked, setChecked] = useState(false);

  return(
    <>
      <div>
        接続先IPアドレス: <input type="text" value={serverName} onChange={e => setServerName(e.target.value)} />
      </div>
      <div>
        <label>
        状態を取得する: <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} />
        </label>
      </div>
      <div>
        <label>
        背景色を変更する:
        </label>
      </div>
      {checked && <ProconStatusFetcher destinationServer={serverName} />}
      {!checked && <Procon />}
    </>
  );
}

export const Top = () => {
  return(
    <>
      <h1>SwitchProControllerInputViewer</h1>
      <Viewer />
    </>
  );
}
