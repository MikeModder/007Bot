exports.run = (client, message, args) => {
    //message.channel.send("007Bot: info placeholder!")
    if(message.mentions.members.size === 0){
        let usr = message.author;
        message.channel.send(`Info about \`'${usr.tag}\`:\n`+
        `Username: ${usr.username}\n`+
        `ID: ${usr.id}`)
        return;
    } else {
        let usr = message.mentions.members.first();
        message.channel.send(`Info about \`${usr.user.tag}\`:\n`+
        `Username: ${usr.user.username}\n`+
        `ID: ${usr.id}`)
        return;
    }
};