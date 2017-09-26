exports.run = (client, message, args, config) => {
  message.channel.send(":ping_pong: -- Pong! The current ping is "+client.ping+"ms.");
};
