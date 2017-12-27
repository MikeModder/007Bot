exports.run = (client, message, args) => {
    switch(args[0]){
        case "kick":
            message.channel.send("Usage:\n"+
            "```"+client.config.prefix+"kick [@user] [reason]```"+
            "Kicks the (first) mentioned user.");
            return;
        case "ban":
            message.channel.send("Usage:\n"+
            "```"+client.config.prefix+"ban [@user] [reason]```"+
            "Bans the (first) mentioned user.");
            return;
        case "info":
            message.channel.send("Usage:\n"+
            "```"+client.config.prefix+"info (@user)```"+
            "Shows info about the tagged user. If no user is tagged, the authors info is shown.");
            return;
        case "reload":
            message.channel.send("Usage:\n"+
            "```"+client.config.prefix+"reload [command]```"+
            "Reloads the given command. Requires bot ownership.");
            return;
        case "config":
            message.channel.send("Usage:\n"+
            "```"+client.config.prefix+"config [set/view] [option] [value]```"+
            "Sets/displays the value of the config option.");
            return;
          case "tag":
            message.channel.send("Usage:\n"+
            `\`\`\`${client.config.prefix}tag [create/info/tag name] [tag name/tag content]\`\`\``);
            break;
        default:
            message.channel.send("**Available Commands**\n"+
            "```"+client.config.prefix+"kick\n"+
            client.config.prefix+"kick\n"+
            client.config.prefix+"ban\n"+
            client.config.prefix+"info\n"+
            client.config.prefix+"config\n"+
            client.config.prefix+"tag\n"+
            client.config.prefix+"reload```");
            return;

    }
};

exports.cfg = {
    name: 'help',
    desc: 'Shows help for a given command, or a list of commands.',
    usage: '{prefix}help [command]',
    aliases: ['halp'],
    public: true
};
