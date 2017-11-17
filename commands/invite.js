exports.run = (client, message, args) => {
    if(!client.config.invites.allowInvite) return message.channel.send(":x: The bot owner has disabled this bot joining other guilds!")
    message.channel.send("You want to invite 007Bot to your server?\nIf you say so!\nHave a link: "+config.invites.inviteURL)
};
