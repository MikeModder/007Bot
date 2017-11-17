exports.run = (client, message, args) => {

  if (message.author.id !== client.config.owner){
    message.channel.send(':x: You don\'t have permission to run that command!');
    return;
  }

  let id = message.members.mentions.first() || args[1];
  console.log(id)

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
      }

      client.ignores.set(id, igData);
      message.channel.send(:white_check_mark: User with ID \`${id}\` will now be ignored!`)

      break;
    case "remove":
      //remove someone from the ignore list
      if(!client.ignores.has(id)){
        message.channel.send(`:x: That ID isn't being ingnored!`);
        break;
      }

      client.ignores.delete(id);
      message.channel.send(`:white_check_mark: User with ID \`${id}\` was removed from the ignore list.`);

      break;
    default:
      message.channel.send(':x: You must provide a valid option (`add` or `remove`).');
      break;

  }
};
