const discord = require("discord.js");
const client = new discord.Client();
const enmap = require("enmap");
const enmapLevel = require("enmap-level");

client.on("ready", () => {
  console.log(`Bot is ready! Logged in as ${client.user.username}.\nServing ${client.users.size} servers, in ${client.guilds.size} servers.`);
  client.user.setGame(`Say ${client.config.prefix}help for help! | In ${client.guilds.size} servers | ${client.users.size} users.`);
});

client.config = require('./config.json');
client.tags = new enmap({provider: new enmapLevel({name: "tags"})});
client.ignores = new enmap({provider: new enmapLevel({name: "ignores"})});

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

    if(message.cleanContent.includes('<@318450217802530823>')){
      message.channel.send(`Hey... <@${message.author.id}> <:ping_pong~1:384522816701333506>`);
    }

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
      let commandFile = require(`./commands/${command}.js`);
      commandFile.run(client, message, args);
    } catch (err) {
      console.error(err);
    }
});

client.login(client.config.token);
