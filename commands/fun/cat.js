exports.run = (client, message, args) => {
    const snek = require('snekfetch');
    const Discord = require('discord.js');
    snek.get('http://random.cat/meow')
        .then(res => {
            if(!res.ok){
                message.channel.send(`:x: There was an error getting your random cat!`)
            }

            let url = JSON.parse(res.text).file;

            let embed = new Discord.RichEmbed();
            embed.setTitle('Random cat')
                .setImage(url)
                .setURL(url);

            message.channel.send(embed);

        })
        .catch(e => {
            message.channel.send(`:x: There was an error getting your random cat!`)
        });
};

exports.cfg = {
    name: 'cat',
    desc: 'Get a random cat from random.cat',
    usage: '{prefix}cat',
    aliases: ['meow'],
    public: true
};