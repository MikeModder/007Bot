exports.run = (client, message, args) => {
    switch(args[0]){
        case "kick":
            message.channel.send("Usage:\n"+
            "```"+config.prefix+"kick [@user] [reason]```"+
            "Kicks the (first) mentioned user.")
            return;
        case "ban":
            message.channel.send("Usage:\n"+
            "```"+config.prefix+"ban [@user] [reason]```"+
            "Bans the (first) mentioned user.")
            return;
        case "info":
            message.channel.send("Usage:\n"+
            "```"+config.prefix+"info (@user)```"+
            "Shows info about the tagged user. If no user is tagged, the authors info is shown.")
            return;
        case "reload":
            message.channel.send("Usage:\n"+
            "```"+config.prefix+"reload [command]```"+
            "Reloads the given command. Requires bot ownership.")
            return;
        case "config":
            message.channel.send("Usage:\n"+
            "```"+config.prefix+"config [set/view] [option] [value]```"+
            "Sets/displays the value of the config option.")
            return;
        default:
            message.channel.send("**Available Commands**\n"+
            "```"+config.prefix+"kick\n"+
            config.prefix+"kick\n"+
            config.prefix+"ban\n"+
            config.prefix+"info\n"+
            config.prefix+"config\n"+
            config.prefix+"reload```")
            return;

    }
};
