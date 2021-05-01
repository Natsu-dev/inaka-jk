require('dotenv').config(); // 環境変数に.env使う

// ログイン処理
const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
    client.user.setStatus("online"); //online, idle, dnd, invisible
    client.user.setActivity(`情クラ＠田舎鯖 `, {  //ステータスメッセージ
        // type: "STREAMING", //PLAYING: WATCHING: LISTENING: STREAMING: // unused?
        url: "https://jokura.work/"
    });
    console.log("ready...");
});

// メッセージ受け取り時
client.on("message", message => {

    // 自分のだったら無視
    if (message.author.bot) {
        return;
    }

    // let channel = message.channel; 送り先判定
    let author = message.author.username; // 送り主の取得

    // おはよう
    if (message.content.match(/おはよ/)) {

        message.channel.send("おはよー！") //メッセ送信
            .then(message => console.log(`Sent message: ${reply_text} to ${author}`)) // コンソールにも出す
            .catch(console.error);
        return;
    }

});


client.login(process.env.DISCORD_TOKEN);
