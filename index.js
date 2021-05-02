require('dotenv').config(); // 環境変数に.env使う

// ログイン処理
const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
    client.user.setStatus("online"); //online, idle, dnd, invisible
    client.user.setActivity(`情クラ＠田舎鯖 ` //, {  //ステータスメッセージ
        // type: "STREAMING", //PLAYING: WATCHING: LISTENING: STREAMING: // unused?
        //url: "" }
    );
    console.log("ready...");
});

client.on("guildCreate", guild => {

    var phrases = require("./phrases.js");

    let greetingChannel = "";
    guild.channels.cache.forEach((channel) => {
        if (channel.type == "text" && greetingChannel == "") {
            if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                greetingChannel = channel;
            }
        }
    })
    greetingChannel.send(phrases.guildCreateGreeting);
});

// メッセージ受け取り時
client.on("message", message => {

    var phrases = require("./phrases.js");

    // 自分のだったら無視
    if (message.author.bot) {
        return;
    }

    // let channel = message.channel; 送り先判定
    let author = message.author.username; // 送り主の取得

    // おはよう
    if (message.content.match(/おはよ/)) {

        message.channel.send(phrases.goodMorning) //メッセ送信
            .then(message => console.log(`Sent message: ${phrases.goodMorning} to ${author}`)) // コンソールにも出す
            .catch(console.error);
        return;
    }

    // コマンド系
    if (message.content.startsWith("%")) {

        var i = 0;
        for (i = 0; message.content.substr(1).charAt(i) == " "; i++); // % の続きについて空白文字でなくなるまで i を加算
        var commandArray = message.content.substr(i + 1).split(/\s+/); // 空白でない部分からを任意長の空白で区切る

        message.channel.send(commandArray[0]+commandArray[1]);
    }
});

client.login(process.env.DISCORD_TOKEN);
