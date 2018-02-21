exports.run = (client, message, args) => {
  message.channel.send(":ping_pong: -- Pong! The current ping is "+Math.round(client.ping)+"ms.");
};

exports.cfg = {
  name: 'ping',
  desc: 'Responds with the current ping.',
  usage: '{prefix}ping',
  aliases: [],
  public: true
};