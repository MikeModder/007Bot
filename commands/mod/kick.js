exports.run = (client, message, [mention, ...reason]) => {

    kMember = message.mentions.members.first();

    if(!message.member.permissions.has('KICK_MEMBERS') || !message.author.id === client.config.owner){
        message.channel.send(':x: You don\'t have permission to run that command!');
        return;
    }

    if(message.mentions.members.size === 0){
        message.channel.send(':x: Error! You must mention a user to kick!');
        return;
    }

    if(!message.guild.me.permissions.has('KICK_MEMBERS')){
        message.channel.send(':x: Error! I don\'t have permission to kick users!');
        return;
    }

    if(kMember.id === message.author.id){
        message.channel.send(':x: Error! You can\'t kick yourself!')
    }

    let fullReason = reason.join(' ') || 'No reason given.';

    kMember.send(`You have been kicked from the server **${message.guild.name}**\nReason: `+fullReason);

    kMember.ban(fullReason).then(member => {
        message.channel.send(`User **${member.user.username}** was kicked!`);
        return;
    })
    .catch(e => {
        message.channel.send(':x: There was an error kicked the user!')
    });
};

exports.cfg = {
    name: 'ban',
    desc: 'Bans the (first) mentioned user.',
    usage: '{prefix}ban [@User]',
    aliases: [],
    public: true
};
