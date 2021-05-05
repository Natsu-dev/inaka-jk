const path = require('path');
var fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') }); // 環境変数に.env使う

var phrases = require("./phrases.js"); // JK語

// ログイン処理
const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
    client.user.setStatus("online"); //online, idle, dnd, invisible
    client.user.setActivity(phrases.activity //, {  //ステータスメッセージ
        // type: "STREAMING", //PLAYING: WATCHING: LISTENING: STREAMING: // unused?
        //url: "" }
    );
    //if (fs.existsSync("manual-restart.json")) {
    //
    //    var data = JSON.parse(fs.readFileSync("manual-restart.json", 'utf8'));
    //
    //    time = new Date(data.time);
    //    nowtime = new Date();
    //
    //    // 5分以内に再起動が行われていてかつ再起動が未完了のとき
    //    if (nowtime <= Date(time.setMinutes(Date(time.getMinutes()) + 5)) && data.finished === false) {
    //
    //        data.finished = true;
    //
    //        data.channel.send(phrases.afterRestart)
    //            .then(message => console.log(`Restart done.`))
    //            .catch(console.error);
    //
    //        fs.writeFileSync("manual-restart.json", JSON.stringify(data, null, 4))
    //            .then(console.log("'manual-restart.json' updated.")); // 再起動完了を記録
    //    }
    //}

    console.log("ready...");
});

client.on("guildCreate", guild => { // 入室時の挨拶

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

    // 自分のだったら無視
    if (message.author.bot) {
        return;
    }

    // let channel = message.channel; 送り先判定
    let author = message.author.username; // 送り主の取得

    // おはよう
    if (message.content.match(/おはよ/)) {

        message.channel.send(phrases.goodMorning) //メッセ送信
            .then(message => console.log(`Message: ${phrases.goodMorning} to ${author}.`)) // コンソールにも出す
            .catch(console.error);
        return;
    }

    // コマンド系
    if (message.content.startsWith("%")) {

        var i = 0;
        for (i = 0; message.content.substr(1).charAt(i) == " "; i++); // % の続きについて空白文字でなくなるまで i を加算
        var commandArray = message.content.substr(i + 1).split(/\s+/); // 空白でない部分からを任意長の空白で区切る

        if (commandArray[0].match("restart")) { // restartコマンド: サーバーの再起動を実行

            var mrlog = {
                time: new Date(),
                finished: false,
                channel: message.channel
            };
            fs.writeFileSync("manual-restart.json", JSON.stringify(mrlog, null, 4)); // 手動再起動の完了を記録
            console.log("'manual-restart.json' saved.");

            message.channel.send(phrases.beforeRestart)
                .then(message => console.log(`Restart message.`))
                .catch(console.error);

            const exec = require('child_process').exec;
            exec(process.env.RESTART_BASH, function (err, stdout, stderr) {
                if (err) {
                    console.log(`stderr: ${stderr}`)
                    return
                }
                console.log(`stdout: ${stdout}`)
            });
            return;
        }

        // マジで何でも出来ちゃうっぽいので一旦削除

        // if (commandArray[0].match("ex")) { // exコマンド: シェルスクリプトを実行
        // 
        //     const execSync = require('child_process').execSync;
        //     var bash = commandArray.slice(1, commandArray.length); // commandArray[1] 以降をbash[]とする
        // 
        //     message.channel.send(execSync(bash.join(" ")).toString());
        // }

        return;
    }
});

client.login(process.env.DISCORD_TOKEN);
