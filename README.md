# SwitchProControllerInputViewer
* 入力表示ができるWEBページです
* https://github.com/splaplapla/procon_bypass_man の 0.2.1 が必要です

## 開発
* npm ci
* npm run server
* http://localhost:8080/ を開く

## TODO
* スティックを動くようにする
* cookieに書き込んで復元できるようにする
* no configurationの名前解決ができるようにする

```js
// ラズパイが返って来ない
var mdns = require('mdns-js');
var browser = mdns.createBrowser();
browser.on('ready', function () {
    browser.discover();
});
browser.on('update', function (data) {
  if(data.host) {
    console.log('data.host:', data.host, 'addresses:', data.addresses);
  }
});
```
