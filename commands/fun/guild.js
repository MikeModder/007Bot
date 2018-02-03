exports.run = (client, message, args) => {
  const Discord = require('discord.js');
  let embed = new Discord.RichEmbed();

  let guild = message.guild;

  embed.setTitle(`Info about ${guild.name}`)
    .addField('Owner: ', guild.owner.user.tag, true)
    .addField('Members: ', guild.memberCount, true)
    .addField('Channels: ', guild.channels.size, true)
    .addField('Region: ', guild.region, true);

  message.channel.send(embed);
};

exports.cfg = {
  name: 'guild',
  desc: 'Shows info about the current guild.',
  usage: '{prefix}guild',
  aliases: [],
  public: true
};