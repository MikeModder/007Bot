exports.run = (client, message, args) => {

    const Discord = require('discord.js');
    const shell = require('shelljs');
    const upFor = require('moment')(Date.now() - client.uptime).toNow(true);
    let multipleOwners = client.config.owners.length > 1;
    let ranBy;
    let tags = [];
    if(multipleOwners){
        //There are more than one "owners" of the bot
        for(let o of client.config.owners){
            let tag = client.users.get(o).tag;
            tags.push(`${tag} (${o})`);
        }
        ranBy = tags.join(', ');
    } else {
        let ownerId = client.config.owners[0];
        let tag = client.users.get(ownerId).tag;
        ranBy = `${tag} (${ownerId})`;
    }
    let embed = new Discord.RichEmbed();
    
    shell.exec('git rev-parse --short HEAD', { silent: true }, (code, out) => {
        embed.setTitle(`About ${client.user.tag}`)
            .setThumbnail(client.user.avatarURL)
            .addField('Commit ', out, true)
            .addField('NodeJS Version', process.versions.node, true)
            .addField('Commands loaded', client.commands.size, true)
            .addField('Commands ran', client.commandsRan, true)
            .addField('Up for', upFor, true)
            .addField(multipleOwners ? 'Instance owners' : 'Instance owner', ranBy)
            .addField('Programmed by', 'mikemodder007#7678 (152541437068705793)');

        message.channel.send(embed);
    });

};

exports.cfg = {
    name: 'about',
    desc: 'Gives some information on the bot.',
    usage: '{prefix}about',
    aliases: [],
    public: true
};