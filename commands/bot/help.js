exports.run = (client, message, args) => {
    let command = args[0];
    if(!command){
        let msg = `Available commands:\n`;
        client.commands.forEach(cmd => {
            //msg += `\`${cmd.cfg.name}\` - \`${cmd.cfg.desc}\`\n`;
            if(!cmd.cfg.public && message.author.id !== client.config.owner){

            } else {
                msg += `\`${cmd.cfg.name}\` - \`${cmd.cfg.desc}\`\n`;
            }
        });
        return message.channel.send(msg);
    }
    if(!client.commands.has(command)) return message.channel.send(`:x: \`${command}\` is not a valid command!`);

    let cmdInfo = client.commands.get(command).cfg;
    let msg = `Help for command \`${cmdInfo.name}\`:\n`;
    msg += `Description: \`${cmdInfo.desc}\`\n`;
    msg += `Usage: \`${cmdInfo.usage.replace('{prefix}', client.config.prefix)}\`\n`;
    message.channel.send(msg);

};

exports.cfg = {
    name: 'help',
    desc: 'Shows help for a given command, or a list of commands.',
    usage: '{prefix}help [command]',
    aliases: ['halp'],
    public: true
};
