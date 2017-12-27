exports.run = (client, message, args) => {
  if(!args || args.size < 1) return message.channel.send(`:x: You must specify a command to reload!`);
  if(!client.commands.has(args[0])) return message.channel.send(`:x: You can't reload a nonexistant command!`);
  let a = client.commands.get(args[0]);
  let cat = a.cfg.category;
  let name = a.cfg.name;
  require('decache')(`../${cat}/${a.cfg.name}.js`);
  let newCmd = require(`../${cat}/${a.cfg.name}.js`);
  newCmd.cfg.category = cat;
  client.commands.set(name, newCmd);
  message.channel.send(`:white_check_mark: Command \`${name}\` reloaded!`);
};

exports.cfg = {
  name: 'reload',
  desc: 'Reloads the given command.',
  usage: '{prefix}reload [command]',
  aliases: [],
  public: false
};