exports.run = (client, message, [mention, ...reason]) => {

    kMember = message.mentions.members.first();

    if(!message.member.permissions.has('KICK_MEMBERS')){
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
        message.channel.send(':x: Error! You can\'t kick yourself!');
        return;
    }

    let fullReason = reason.join(' ') || 'No reason given.';

    kMember.send(`You have been kicked from the server **${message.guild.name}**\nReason: `+fullReason);

    kMember.ban(fullReason).then(member => {
        message.channel.send(`User **${member.user.username}** was kicked!`);
        return;
    })
    .catch(e => {
        message.channel.send(':x: There was an error kicking the user!');
    });
};

exports.cfg = {
    name: 'kick',
    desc: 'Kick the (first) mentioned user.',
    usage: '{prefix}kick [@User]',
    aliases: [],
    public: true
};
