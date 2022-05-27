import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import styled from "styled-components";

const axios = require('axios');

const Procon = () => {
  const defaultColor = "#7C8388";
  const pressedColor = "red";

  const Svg = styled.svg`
    * {
      user-select: none;
    }
  `;

  return(
    <Svg width={"480"} viewBox="0 0 1024 830" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" >
      {/* Left Grip */}
      <path
        d="M4.50003 710C7.00003 742 4 783.5 57.5 818.5C111 853.5 163.5 800 178.5 761.5C193.5 723 239.5 640 257 629.5C208.167 572.269 99.9 437.125 57.5 354.403C22.265 494.962 2.74123 687.487 4.50003 710Z"
        fill="#3F4245" />
      {/* Right Grip */}
      <path
        d="M942.5 818.5C996 783.5 993 742 995.5 710C997.259 687.487 977.735 494.962 942.5 354.403C900.1 437.125 791.833 572.269 743 629.5C760.5 640 806.5 723 821.5 761.5C836.5 800 889 853.5 942.5 818.5Z"
        fill="#3F4245" />
      {/* Outlines */}
      <path
        d="M4.50003 710C7.00003 742 4 783.5 57.5 818.5C111 853.5 163.5 800 178.5 761.5C193.5 723 239.5 640 257 629.5C208.167 572.269 99.9 437.125 57.5 354.403C22.265 494.962 2.74123 687.487 4.50003 710Z"
        stroke="black"
        strokeWidth="4" />
      <path
        d="M942.5 818.5C996 783.5 993 742 995.5 710C997.259 687.487 977.735 494.962 942.5 354.403C900.1 437.125 791.833 572.269 743 629.5C760.5 640 806.5 723 821.5 761.5C836.5 800 889 853.5 942.5 818.5Z"
        stroke="black" strokeWidth="4" />
      <path
        d="M257 629.5C271 621.1 424.833 620.333 500 621C575.167 620.333 729 621.1 743 629.5C791.833 572.268 900.1 437.125 942.5 354.403C927.651 295.168 910.0162 245.163 890 221C857.466 181.718 761.592 162.969 667 155.109C610 151 548 151 500 151C452 151 390 151 333 155.109C238.408 162.969 142.534 181.718 110 221C89.9878 245.163 72.3488 295.168 57.5 354.403C99.9 437.125 208.167 572.268 257 629.5Z"
        fill="#23282B" stroke="black" strokeWidth="4" />

      {/* Stick Backgrounds */}
      <circle cx="224" cy="347" r="87" fill="#030407" />
      <circle cx="632" cy="483" r="87" fill="#030407" />

      {/* Left Stick */}
      <circle cx="224" cy="347" r="59" onMouseDown={(e) => onStickDown(e, "left")} />

      {/* Right Stick */}
      <circle cx="632" cy="483" r="59" onMouseDown={(e) => onStickDown(e, "right")} />

      {/* Direction Up */}
      <path d="M325 411.5H346.5H368V462.5L346.5 484L325 462.5V411.5Z" fill={defaultColor} stroke="#030407" strokeWidth="4" />

      {/* Direction Right */}
      <path d="M419 462.5L419 484L419 505.5L368 505.5L346.5 484L368 462.5L419 462.5Z" fill={defaultColor} stroke="#030407" strokeWidth="4" />

      {/* Direction Down */}
      <path d="M325 556.5H346.5H368V505.5L346.5 484L325 505.5V556.5Z" fill={defaultColor} stroke="#030407" strokeWidth="4" />

      {/* Direction Left */}
      <path d="M274 462.5L274 484L274 505.5L325 505.5L346.5 484L325 462.5L274 462.5Z" stroke="#030407" fill={defaultColor} strokeWidth="4" />

      {/* Button X */}
      <circle cx="764" cy="277" r="37" fill={defaultColor} stroke="#030407" strokeWidth="4" />

      {/* Button Y */}
      <circle cx="686" cy="345" r="37" fill={defaultColor} stroke="#030407" strokeWidth="4" />

      {/* Button A */}
      <circle cx="842" cy="345" r="37" fill={defaultColor} stroke="#030407" strokeWidth="4" />

      {/* Button B */}
      <circle cx="764" cy="415" r="37" fill={defaultColor} stroke="#030407" strokeWidth="4" />

      {/* Plus */}
      <circle cx="625" cy="269" r="22" fill={defaultColor} stroke="#030407" strokeWidth="4" />

      {/* Minus */}
      <circle cx="375" cy="269" r="22" fill={defaultColor} stroke="#030407" strokeWidth="4" />

      {/* Home */}
      <circle cx="570" cy="347" r="22" fill={defaultColor} stroke="#030407" strokeWidth="4" />

      {/* ScreenShot */}
      <rect x="408" y="326" width="42" height="42" rx="6" fill={defaultColor} stroke="#030407" strokeWidth="4" />

      {/* R */}
      <path d="M890 221C857.466 181.718 761.592 162.969 667 155.109C673.167 151.239 687.4 142.9 695 140.5C704.5 137.5 755.5 142.5 806.5 152.5C847.3 160.5 879.167 201.5 890 221Z"
        fill={defaultColor} stroke="black" strokeWidth="4" />

      {/* L */}
      <path
        d="M110 221C142.534 181.718 238.408 162.969 333 155.109C326.833 151.239 312.6 142.9 305 140.5C295.5 137.5 244.5 142.5 193.5 152.5C152.7 160.5 120.833 201.5 110 221Z"
        fill={defaultColor} stroke="black" strokeWidth="4" />

      {/* ZR */}
      <path
        d="M722.379 30.8329C712.477 34.4403 704.001 82.3138 701 105.8C706.626 110.873 750.508 112 777.513 112C804.517 112 847.275 105.8 852.338 100.727C857.401 95.6539 832.084 42.6697 821.958 34.7785C811.831 26.8872 734.756 26.3236 722.379 30.8329Z"
        fill={defaultColor} stroke="black" strokeWidth="4" />

      {/* ZL */}
      <path
        d="M276.621 30.8329C286.523 34.4403 294.999 82.3138 298 105.8C292.374 110.873 248.492 112 221.487 112C194.483 112 151.725 105.8 146.662 100.727C141.599 95.6539 166.916 42.6697 177.042 34.7785C187.169 26.8872 264.244 26.3236 276.621 30.8329Z"
        fill={defaultColor} stroke="black" strokeWidth="4" />
    </Svg>
  )
}

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
