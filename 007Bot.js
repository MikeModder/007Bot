const discord = require("discord.js");
const client = new discord.Client();
const enmap = require("enmap");
const enmapLevel = require("enmap-level");
const moment = require('moment');

client.config = require('./config.json');
client.tags = new enmap({provider: new enmapLevel({name: "tags"})});
client.ignores = new enmap({provider: new enmapLevel({name: "ignores"})});

client.on("ready", () => {
  console.log(`Bot is ready! Logged in as ${client.user.username}.\nServing ${client.users.size} servers, in ${client.guilds.size} servers.`);
  if(client.config.logs.enabled){
    client.addLog = (text) => {
      client.channels.get(client.config.logs.channelId).send(`[${moment().format('lll')}] ${text}`);
    };
  }
  client.addLog(`Bot started!`);
  client.user.setGame(`Say ${client.config.prefix}help for help! | In ${client.guilds.size} servers | ${client.users.size} users.`);
});

client.tags.defer.then(() => {
  console.log(`[TAGS] ${client.tags.size} tags loaded!`);
});
client.ignores.defer.then(() => {
  console.log(`[INGORES] ${client.ignores.size} users on the list.`);
});

client.on("message", message => {
    let id = message.author.id;
    if(message.author.bot) return;
    if(message.content.indexOf(client.config.prefix) !== 0) return;
    if(client.ignores.has(id)){
      message.channel.send(`Sorry, but the owner has restricted you from using ${client.user.username}'s commands.\nThe following reason was given: \`${client.ignores.get(id).reason}\``);
      return;
    }

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
      let commandFile = require(`./commands/${command}.js`);
      commandFile.run(client, message, args);
    } catch (err) { console.log(err); }
});

client.login(client.config.token);
