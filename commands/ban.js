exports.run = (client, message, [mention, ...reason], config) => {
    if(!message.member.permissions.has('BAN_MEMBERS')){
        message.channel.send(":x: You don't have permission to run that command!")
        return;
    }

    console.log(mention);

    if(message.mentions.members.size === 0){
        message.channel.send(":x: Error! You must mention a user to ban!")
        return;
    }

    if(!message.guild.me.permissions.has("BAN_MEMBERS")){
        message.channel.send(":x: Error! I don't have permission to ban users!")
        return;
    }

    kMember = message.mentions.members.first();

    kMember.send("You have been banned from the server **${message.guild.name}**\nReason: "+reason.join(" "));

    kMember.ban(reason.join(" ")).then(member => {
        message.channel.send("User **${member.user.username}** was banned!")
        return;
    })
};
