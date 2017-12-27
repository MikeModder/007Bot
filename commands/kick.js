exports.run = (client, message, [mention, ...reason]) => {
    if(!message.member.permissions.has('KICK_MEMBERS') || !message.author.id === client.config.owner){
        message.channel.send(":x: You don't have permission to run that command!");
        return;
    }

    if(message.mentions.members.size === 0){
        message.channel.send(":x: Error! You must mention a user to kick!");
        return;
    }

    if(!message.guild.me.permissions.has("KICK_MEMBERS")){
        message.channel.send(":x: Error! I don't have permission to kick users!");
        return;
    }

    kMember = message.mentions.members.first();

    let fullReason = reason.join(" ") || "No reason given.";

    kMember.send(`You have been kicked from the server **${message.guild.name}**\nReason: `+fullReason);

    kMember.kick(fullReason).then(member => {
        message.channel.send(`User **${member.user.username}** was kicked!`);
        return;
    });
};

exports.cfg = {
    name: 'kick',
    desc: 'Kicks the (first) mentioned user.',
    usage: '{prefix}kick [@User]',
    aliases: [],
    public: true
};