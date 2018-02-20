exports.run = (client, message, args) => {
  let id;
  if(message.mentions.members.first() === undefined){
    id = args[1];
  } else {
    id = message.mentions.members.first().id;
  }

  if(!id){
    message.channel.send(':x: You must provide an ID or tag a user!');
  }

  switch (args[0]) {
    case "add":
      //add someone to the ignore list
      if(client.ignores.has(id)){
        let igUsr = client.ignores.get(id);
        message.channel.send(`:x: That user is already ignored! Reason: \`${igUsr.reason}\``);
        break;
      }

      args.shift();
      args.shift();

      let igReason = args.join(" ");

      if(!args[0]){
        igReason = 'No reason given.';
      }

      let igData = {
        reason: igReason
      };

      client.ignores.set(id, igData);
      client.addLog(`User \`${id}\` added to ignore list. Reason: \`${igReason}\``);
      message.channel.send(`:white_check_mark: User with ID \`${id}\` will now be ignored!`);

      break;
    case "remove":
      //remove someone from the ignore list
      if(!client.ignores.has(id)){
        message.channel.send(`:x: That ID isn't being ingnored!`);
        break;
      }

      client.ignores.delete(id);
      client.addLog(`User \`${id}\` removed from ignore list.`);
      message.channel.send(`:white_check_mark: User with ID \`${id}\` was removed from the ignore list.`);

      break;
    default:
      message.channel.send(':x: You must provide a valid option (`add` or `remove`).');
      break;

  }
};

exports.cfg = {
  name: 'ignores',
  desc: 'Manage bot ignores.',
  usage: '{prefix}ignores [remove/add] [@User/ID]',
  aliases: [],
  public: false
};