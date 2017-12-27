exports.run = (client, message, args) => {
    if(!args || args.size < 1) return message.channel.send(`:x: You must specify a command to unload!`);
    if(!client.commands.has(args[0])) return message.channel.send(`:x: You can't unload a nonexistant command!`);
    let a = client.commands.get(args[0]);
    let name = a.cfg.name;
    client.commands.delete(name);
    message.channel.send(`:white_check_mark: Command \`${name}\` unloaded!`);
  };
  
  exports.cfg = {
    name: 'unload',
    desc: 'Unloads the given command.',
    usage: '{prefix}unload [command]',
    aliases: [],
    public: false
  };