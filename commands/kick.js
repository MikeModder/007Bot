exports.run = (client, message, [mention, ...reason], config) => {
    if(!message.author.id === (config.owner)){
        message.channel.send(":x: You don't have permission to run that command!")
        return;
    }

    if(message.mention.members.size === 0){
        message.channel.send(":x: Error! You must mention a user to kick!")
        return;
    }

    if(message.guild.me.permissions.has("KICK_MEMBERS")){
        message.channel.send(":x: Error! I don't have permission to kick users!")
        return;
    }

    kMember = message.mentions.members.first();

    console.log("Sending DM to user")
    kMember.send("You have been kicked from the server **${message.guild.name}**\nReason: "+reason.join(" "));

    kMember.kick(reason.join(" ")).then(member => {
        message.channel.send("User **${member.user.username}** was kicked!")
        return;
    })
};