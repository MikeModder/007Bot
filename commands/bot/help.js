exports.run = (client, message, args) => {
    let command = args[0];
    const Discord = require('discord.js');
    let embed = new Discord.RichEmbed();
    if(!command){
        embed.setAuthor('Available commands');
        client.commands.forEach(cmd => {
            if(!cmd.cfg.public && message.author.id !== client.config.owner){

            } else {
                embed.addField(cmd.cfg.name, cmd.cfg.desc, false);
            }
        });
        message.author.send(embed)
            .then(() => {
                message.react('✅');
            })
            .catch(e => {
                message.channel.send(':x: I couldn\`t DM you the command list!');
            });
        return;
    }
    if(!client.commands.has(command) && !client.aliases.has(command)) return message.channel.send(`:x: \`${command}\` is not a valid command or alias!!`);

    let cmdInfo = client.commands.get(command).cfg || client.commands.get(client.aliases.get(command));
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
