exports.run = (client, message, args) => {
    const snek = require('snekfetch');
    const Discord = require('discord.js');
    snek.get('https://random.dog/woof.json')
        .then(res => {
            if(!res.ok){
                message.channel.send(`:x: There was an error getting your random dog!`)
            }

            let url = JSON.parse(res.text).url;

            let embed = new Discord.RichEmbed();
            embed.setTitle('Random dog')
                .setImage(url)
                .setURL(url);

            message.channel.send(embed);

        })
        .catch(e => {
            message.channel.send(`:x: There was an error getting your random dog!`)
        });
}

exports.cfg = {
    name: 'dog',
    desc: 'Get a random dog from random.dog',
    usage: '{prefix}dog',
    aliases: ['bark'],
    public: true
}