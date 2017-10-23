exports.run = (client, message, args, config) => {
    //message.channel.send("007Bot: info placeholder!")
    if(message.mentions.members.size === 0){
        let usr = message.author;
        message.channel.send(`Info about \`'${usr.tag}\`:\n`+
        `Username: ${usr.username}\n`+
        `ID: ${usr.id}`)
        return;
    } else {
        let usr = message.mentions.members.first();

        let msg = `Info about \`${usr.user.tag}\`:\n`+
        `Username: ${usr.user.username}\n`+
        `ID: ${usr.id}`

        if(config.dbans.usedbans){
            let DiscordBans = require('discord-bans')
            let dbans = new DiscordBans(config.dbans.key)

            dbans.isbanned(usr.id)
                .then(isBanned => msg += `\nUser ${isBanned ? 'is' : 'is not'} banned!`)

        }

        message.channel.send()
        return;
    }
};