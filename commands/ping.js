exports.run = (client, message, args) => {
  message.channel.send(":ping_pong: -- Pong! The current ping is "+Math.round(client.ping)+"ms.");
};
