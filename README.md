# SwitchProconInputViewer for procon_bypass_man
* 入力表示ができるWEBページです
* https://github.com/splaplapla/procon_bypass_man の 0.2.1 以上が必要です

## 使い方
※ このツールはプライベートネットワークにアクセスするので、Chromeを使っている場合は、`chrome://flags/#block` を開いて、 `Block insecure private network requests.` を `Disabled` にしてChromeを再起動してください。  

![image](https://user-images.githubusercontent.com/1664497/170820460-0f60c36c-2701-4620-a132-a1cae28238f4.png)

* http://procon_input_viewer.jiikko.com/ を開いて、 `接続先IPアドレス` に procon_bypass_manを起動しているraspberry piのIPアドレスを入力してください。
* `raspberry piから状態を取得する` をクリックすると、押しているボタンが画面のコントローラーに反映されます

## 対応ブラウザ
* MacOS Chrome
  * `Block insecure private network requests.`を無効にする必要があります
* iOS Chrome

確認はしてませんが、Windonwsでも動くはずです

## 開発
* npm ci
* npm run server
* http://localhost:8080/ を開く

## リリース
* npm run release

## TODO
* スティックを動くようにする
