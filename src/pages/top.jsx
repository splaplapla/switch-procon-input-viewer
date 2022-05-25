import React from "react";
import ReactDOM from "react-dom";

export const Top = () => {
  return(
    <>
      <div>
        接続先IPアドレス: <input type="text" value="http://192.168.50.122:9900/" />
      </div>
      <div>
        <label>
        状態を取得する: <input type="checkbox" />
        </label>
      </div>
    </>
  );
}
