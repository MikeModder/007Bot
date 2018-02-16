exports.run = (client, message, args) => {
    let searchUser = args.join(' ');
    let RichEmbed = require('discord.js').RichEmbed;
    let embed = new RichEmbed();

    if(searchUser){
        let results = getByTag(searchUser.toLowerCase(), message.guild.members);

        if(results.length === 0){
            message.channel.send(`:x: No user found matching \`${searchUser}\`!`);
            return;
        }

        if(results.length > 1){
            embed.setTitle(`Multiple users matching input!`);
            results.forEach(r => {
                let tag =`${r.user.username}#${r.user.discriminator}`;
                embed.addField('Matched:', tag, true);
            });
            return message.channel.send(embed);
        }

        let id = results[0].user.id;
        let member = message.guild.members.get(id);
        let user = message.guild.members.get(id).user;
        let game;
        if(message.guild.members.get(id).presence.game){
            game = message.guild.members.get(id).presence.game.name;
        }

        embed.setTitle(`Info about ${user.tag}`)
            .setThumbnail(user.avatarURL)
            .addField('ID: ', id, true)
            .addField('Nickname: ', member.nickname ? member.nickname : 'Not set', true)
            .addField('Playing:', game ? game : 'Nothing', true);

        message.channel.send(embed);
        
    } else {
        let id = message.author.id;
        let member = message.guild.members.get(id);
        let user = message.guild.members.get(id).user;
        let game;
        if(message.guild.members.get(id).presence.game){
            game = message.guild.members.get(id).presence.game.name;
        }

        embed.setTitle(`Info about ${user.tag}`)
            .setThumbnail(user.avatarURL)
            .addField('ID: ', id, true)
            .addField('Nickname: ', member.nickname ? member.nickname : 'Not set', true)
            .addField('Playing:', game ? game : 'Nothing', true);

        message.channel.send(embed);
    }

};

exports.cfg = {
    name: 'info',
    desc: 'Shows info about the given user, or the author.',
    usage: '{prefix}info [User#1234]',
    aliases: [],
    public: true
};

function getByTag(search, members){

    let r = members.filterArray(m => m.user.tag.toLowerCase().includes(search));
    return r;

}
