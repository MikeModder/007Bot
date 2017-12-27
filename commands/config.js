exports.run = (client, message, args) => {

    if(message.author.id!==client.config.owner) return message.channel.send(":x: You don't have permission to do that!");

    switch(args[0]){
        case "set":
            switch(args[1]){
                case "allow_invites":
                    switch(args[2]){
                        case "true":
                            client.config.invtes.allowInvite = true;
                            message.channel.send(":white_check_mark: Ok, users can now use the invite command. Make sure you have an invite set in the config!");
                            return;
                        case "false":
                            client.config.invites.allowInvite = false;
                            message.channel.send(":white_check_mark: Ok, users can't use the invite command!");
                            return;
                        default:
                            message.channel.send(":x: You must use either `true` or `false` for this option!");
                            return;
                    }
                default:
                    message.channel.send(":x: You need to pick a option to change!\nValid options are: `allow_invites`");
                    return;
            }
        case "view":
            switch(args[1]){
                case "allow_invites":
                    message.channel.send("The current status of that option is: "+config.allowInvite);
                    return;
                default:
                    message.channel.send(":x: You need to provied a option to view the status of!\nValid choices are `allow_invites`");
                    return;
            }
        default:
            message.channel.send(":x: You need to pick either `set` or `view`!");
            return;
    }

    message.channel.send(":x: If you are seeing this message, report it as a bug immediatly! :x:\nBe sure to include the command that triggered it!");
    return;
};

exports.cfg = {
    name: 'config',
    desc: 'Sets configuration options.',
    usage: '{prefix}config [set/view] [option] [value]',
    aliases: [],
    public: false
};
