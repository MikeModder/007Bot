exports.run = (client, message, args, config) => {
  message.channel.send(":ping_pong: -- Pong! The current ping is "+Math.round(client.ping)+"ms.");
};
