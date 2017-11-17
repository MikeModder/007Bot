exports.run = (client, message, args) => {
  let codeBlock = "```";
  message.channel.send(`${codeBlock}Info about ${message.guild.name}:\nOwner: ${message.guild.owner.tag}\nMembers: ${message.guild.members.size}\nChannels: ${message.guild.channels.size} ${codeBlock}`)
};
