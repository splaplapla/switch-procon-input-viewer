import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";

const ProconStatusFetcher = () => {
  const [intervalCount, setIntervalCount] = useState(0);

  useEffect(() => {
    const timerid = setInterval(() => {
      setIntervalCount(c => c + 1);
    }, 500);

    return () => {
      clearInterval(timerid);
    };
  }, []);

  return(
    <>

      <div>
        {intervalCount}
      </div>
    </>
  );
}

const Viewer = () => {
  const [serverName, setserverName] = useState('');
  const [checked, setChecked] = useState(false);
  // 接続先IPアドレス: <input type="text" value="http://192.168.50.122:9900/" />

  const handleCheckbox = () => {
    debugger;
  }

  return(
    <>
      <div>
        接続先IPアドレス: <input type="text" value={serverName} onChange={console.log} />
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
      {checked && <ProconStatusFetcher />}
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
