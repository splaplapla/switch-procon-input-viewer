import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { Procon } from "../components/procn.jsx";
import { ColorPicker } from "../components/color_picker.jsx";
import { Storage } from "../lib/storage.js"

const axios = require('axios');

const ProconStatusFetcher = ({ destinationServer, outputTextEnabled }) => {
  const port = "9900";
  const [pressedButtons, setPressedButtons] = useState([]);
  const [proconLeftStickX, setProconLeftStickX] = useState(0);
  const [proconLeftStickY, setProconLeftStickY] = useState(0);

  const fetchProcon = (destinationServer) => {
    (async () => {
      try {
        const response = await axios.get(`http://${destinationServer}:${port}`)
        setPressedButtons(response.data.buttons)
        setProconLeftStickX(response.data.left_analog_stick.x)
        setProconLeftStickX(response.data.left_analog_stick.y)
      } catch (error) {
        console.error(error);
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

      {outputTextEnabled && <>
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
      </>}
    </>
  );
}

const Viewer = () => {
  const savedServerName = Storage.read("serverName") || "";
  const [serverName, setServerName] = useState(savedServerName);
  const [fetchEnabled, setFetchEnabled] = useState(false);
  const [outputTextEnabled, setOutputTextEnabled] = useState(false);

  const setAndSaveServerName = (sn) => {
    setServerName(sn);
    Storage.write("serverName", sn);
  }

  return(
    <>
      <div>
        <label>
          接続先IPアドレス: <input type="text" value={serverName} onChange={e => setAndSaveServerName(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          背景色を変更する: <ColorPicker />
        </label>
      </div>
      <div>
        <label>
          テキストで入力を表示する: <input type="checkbox" checked={outputTextEnabled} onChange={e => setOutputTextEnabled(e.target.checked)} />
        </label>
      </div>
      <div>
        <label>
          raspberry piから状態を取得する: <input type="checkbox" checked={fetchEnabled} onChange={e => setFetchEnabled(e.target.checked)} />
        </label>
      </div>
      <div style={{ "marginTop": "100px" }}></div>

      {fetchEnabled && <ProconStatusFetcher destinationServer={serverName} outputTextEnabled={outputTextEnabled} />}
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
