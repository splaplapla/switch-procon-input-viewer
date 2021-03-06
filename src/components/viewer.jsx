import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { Procon } from "react-nintendo-switch-procon-renderer";
import { ColorPicker } from "../components/color_picker.jsx";
import { Storage } from "../lib/storage.js"

const axios = require('axios');

const ProconStatusFetcher = ({ destinationServer, outputTextEnabled, savedPollingInterval }) => {
  const port = "9900";
  const [pressedButtons, setPressedButtons] = useState([]);
  const [proconLeftStickX, setProconLeftStickX] = useState(0);
  const [proconLeftStickY, setProconLeftStickY] = useState(0);

  const fetchProcon = (destinationServer) => {
    (async () => {
      try {
        const response = await axios.get(`http://${destinationServer}:${port}/input`)
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
    }, savedPollingInterval);

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

export const Viewer = () => {
  const savedServerName = Storage.read("serverName") || "";
  const [serverName, setServerName] = useState(savedServerName);

  const savedPollingInterval = Storage.read("pollingInterval") || 250;
  const [pollingInterval, setPollingInterval] = useState(Number(savedPollingInterval));

  const [fetchEnabled, setFetchEnabled] = useState(false);
  const [outputTextEnabled, setOutputTextEnabled] = useState(false);

  const setAndSaveServerName = (sn) => {
    setServerName(sn);
    Storage.write("serverName", sn);
  }

  const setAndSavePollingInterval = (sn) => {
    setPollingInterval(sn);
    Storage.write("pollingInterval", sn);
    if(fetchEnabled) {
      setFetchEnabledAndValidate(false);
      alert("???????????????????????????????????????????????????????????????????????????????????????")
    }
  }

  const setFetchEnabledAndValidate = (value) => {
    if(value) {
      if(!serverName) {
        alert("?????????????????????????????????????????????????????????????????????")
        return;
      }
    }
    setFetchEnabled(value);
  }

  return(
    <>
      <div>
        <label>
          ?????????IP????????????: <input type="text" value={serverName} onChange={e => setAndSaveServerName(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          ?????????????????????(ms): <input type="text" value={pollingInterval} onChange={e => setAndSavePollingInterval(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          ????????????????????????: <ColorPicker />
        </label>
      </div>
      <div>
        <label>
          ????????????????????????????????????: <input type="checkbox" checked={outputTextEnabled} onChange={e => setOutputTextEnabled(e.target.checked)} />
        </label>
      </div>
      <div>
        <label>
          raspberry pi???????????????????????????: <input type="checkbox" checked={fetchEnabled} onChange={e => setFetchEnabledAndValidate(e.target.checked)} />
        </label>
      </div>
      <div style={{ "marginTop": "100px" }}></div>

      {fetchEnabled && <ProconStatusFetcher destinationServer={serverName} outputTextEnabled={outputTextEnabled} savedPollingInterval={savedPollingInterval} />}
      {!fetchEnabled && <Procon pressedButtons={[]}/>}
    </>
  );
}
