import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { Procon } from "../components/procn.jsx";

const axios = require('axios');

const ProconStatusFetcher = ({ destinationServer, setFetchEnabled }) => {
  const [pressedButtons, setPressedButtons] = useState([]);
  const [proconLeftStickX, setProconLeftStickX] = useState(0);
  const [proconLeftStickY, setProconLeftStickY] = useState(0);

  const fetchProcon = (destinationServer) => {
    (async () => {
      try {
        const response = await axios.get(`http://${destinationServer}`)
        console.log(response.data);
        setPressedButtons(response.data.buttons)
        setProconLeftStickX(response.data.left_analog_stick.x)
        setProconLeftStickX(response.data.left_analog_stick.y)
      } catch (error) {
        setFetchEnabled(false);
        alert("Raspberry PIと接続ができませんでした");
        console.error(error.response);
      }
    })();
  }

  useEffect(() => {
    const timerid = setInterval(() => {
      fetchProcon(destinationServer);
    }, 140);

    return () => {
      clearInterval(timerid);
    };
  }, []);

  return(
    <>
      {<Procon pressedButtons={pressedButtons || []} />}
      <hr />
      <div>
        {pressedButtons}
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
  const [serverName, setServerName] = useState('192.168.50.122:9900');
  const [fetchEnabled, setFetchEnabled] = useState(false);

  return(
    <>
      <div>
        接続先IPアドレス: <input type="text" value={serverName} onChange={e => setServerName(e.target.value)} />
      </div>
      <div>
        <label>
          状態を取得する: <input type="checkbox" checked={fetchEnabled} onChange={e => setFetchEnabled(e.target.checked)} />
        </label>
      </div>
      <div>
        <label>
          背景色を変更する:
        </label>
      </div>
      <div style={{ "marginTop": "100px" }}></div>

      {fetchEnabled && <ProconStatusFetcher destinationServer={serverName} setFetchEnabled={setFetchEnabled} />}
      {!fetchEnabled && <Procon pressedButtons={[]}/>}
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
