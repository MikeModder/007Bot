exports.run = (client, message, args) => {
  
  if(!message.member.permissions.has('MANAGE_MESSAGES')){
    message.channel.send(':x: You don\'t have permission to delete messages!');
    return;
  }

  if(!message.guild.me.permissions.has('MANAGE_MESSAGES')){
    message.channel.send(':x: I don\'t have permission to delete messages!');
    return;
  }

  let amount = args[0];
  if(amount < 2 || amount > 100 || !amount) {
    message.channel.send(':x: You must choose an amount between 2 and 100!');
    return;
  }

  message.channel.bulkDelete(amount)
    .then(() => {
      message.channel.send(`:white_check_mark: Successfully deleted \`${amount}\` messages!`);
    })
    .catch((e) => {
      message.channel.send(':x: There was an error deleting the messages!');
    });

};

exports.cfg = {
    name: 'purge',
    desc: 'Eradicate some messages!',
    usage: '{prefix}purge [2-100]',
    aliases: [],
    public: true
  };