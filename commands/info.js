exports.run = (client, message, args, config) => {
    //message.channel.send("007Bot: info placeholder!")
    if(message.mentions.members.size === 0){
        let usr = message.author;
        message.channel.send(`Info about \`${usr.tag}\`:\n`+
        `Username: ${usr.username}\n`+
        `ID: ${usr.id}`)
        return;
    } else {
        let usr = message.mentions.members.first();

        let msg = `Info about \`${usr.user.tag}\`:\n`+
        `Username: ${usr.user.username}\n`+
        `ID: ${usr.id}`

        if(true){
            let request = require('request')
            request.post('https://bans.discordlist.net/api',{ form: {userid: usr.id, token: config.dbans.key } }, (err, http, body) => {
                if(err || http.statusCode !== 200){
                    msg += `\nThere was an error checking DBans!`
                    message.channel.send(msg)
                    return;
                }
                dbgMsg += body;
                if(body==="True"){
                  msg += `\n:x: This user is listed on DiscordBans! :x:`
                } else if (body==="False"){
                  msg += `\nThis is user is not listed on DiscordBans!`
                }

            })

        }

        message.channel.send(msg)
        message.channel.send(dbgMsg)
        return;
    }
};
