const discord = require("discord.js");
const client = new discord.Client();
const config = require("./config.json");

client.on("ready", () => {
  //console.log("007Bot ready! Serving "+client.users.size+" users in "+client.guilds.size+" servers!");
  console.log(`Bot is ready! Logged in as ${client.user.username}.\nServing ${client.users.size} servers, in ${client.guilds.size} servers.`)
  //client.user.setGame(`Say ${config.prefix}help for help! | `+client.guilds.size+' servers | '+client.users.size+' users.');
  client.user.setGame(`Say ${config.prefix}help for help! | In ${client.guilds.size} servers | ${client.users.size} users.`)
});

client.on("message", message => {
    if(message.author.bot) return;
    if(message.content.indexOf(config.prefix) !== 0) return;

    console.log(message.content)

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
      let commandFile = require(`./commands/${command}.js`);
      commandFile.run(client, message, args, config);
    } catch (err) {
      console.error(err);
    }
});

client.login(config.token);
