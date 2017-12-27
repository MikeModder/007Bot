exports.run = (client, message, args) => {
  if(message.author.id !== client.config.owner) {
    return message.channel.send(":x: You don't have permission to do that!");
  }
  if(!args || args.size < 1) return message.reply("Must provide a command name to reload.");
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${args[0]}.js`)];
  message.reply(`The command ${args[0]} has been reloaded`);
};

exports.cfg = {
  name: 'reload',
  desc: 'Reloads the given command.',
  usage: '{prefix}reload [command]',
  aliases: [],
  public: false
};