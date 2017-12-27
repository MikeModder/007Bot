exports.run = (client, message, args) => {
    //message.channel.send("007Bot: info placeholder!")
    if(message.mentions.members.size === 0){
        let usr = message.author;
        message.channel.send(`Info about \`${usr.tag}\`:\n`+
        `Username: ${usr.username}\n`+
        `ID: ${usr.id}`);
        return;
    } else {
        let usr = message.mentions.members.first();
        let dbgMsg = "";

        let msg = `Info about \`${usr.user.tag}\`:\n`+
        `Username: ${usr.user.username}\n`+
        `ID: ${usr.id}`;

        message.channel.send(msg);
        return;
    }
};

exports.cfg = {
    name: 'info',
    desc: 'Shows info about the mentioned user, or the author.',
    usage: '{prefix}info [@User]',
    aliases: [],
    public: true
};
