exports.run = (client, message, args) => {

    const Discord = require('discord.js');
    const shell = require('shelljs');
    let embed = new Discord.RichEmbed();
    
    shell.exec('git rev-parse --short HEAD', { silent: true }, (code, out) => {
        embed.setTitle(`About ${client.user.tag}`)
            .addField('Commit ', out, true)
            .addField('NodeJS Version', process.versions.node, true)
            .addField('Instance hosted by', client.users.get(client.config.owner).tag, true)
            .addField('Programmed by', 'mikemodder007#7676 (152541437068705793)');

        message.channel.send(embed);
    })

}

exports.cfg = {
    name: 'about',
    desc: 'Gives some information on the bot.',
    usage: '{prefix}about',
    aliases: [],
    public: true
};