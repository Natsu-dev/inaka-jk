# Inaka-jk
Jokura-Inaka-Server Discord Bot

version 0.2.0

## Installation

- Discordのボットを作成します。
- Minecraftサーバーとして使うサーバーにこのリポジトリをクローンします。
- クローンしたディレクトリで`npm install discord.js`と実行します。→ [参考: discord.jsのインストール - Discord.js ガイド](https://guide.discordjs-japan.org/preparations/#discord-js%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)
- `.env.sample`の中身を書き換えたものを`.env`として保存します。
- Minecraftサーバーの起動、再起動、終了用のシェルスクリプトにそれぞれ`index.js`を起動、終了させるコマンドを追加します。（screen等）
- シェルスクリプトを実行します。

- （任意で`phrases.js`の中身も書き換えることができます。）


## Main-Functions

サーバPCが稼働中はステータスメッセージにて "情クラ＠田舎鯖をプレイ中" と表示します。

Discordのテキストチャンネルで`%restart`と入力するとサーバーを再起動します。 

## Sub-Functions

チャンネル上で "おはよ" が含まれるメッセージが書き込まれた際に返事します。

### Next

追々はサーバPCの稼働とMinecraftサーバの稼働を別々に確認できるようにしたいです。
