const discord = require('discord.js');
const client = new discord.Client();
const enmap = require('enmap');
const enmapLevel = require('enmap-level');
const moment = require('moment');
const { readdir } = require('fs');
const pmx = require('pmx');
const probe = pmx.probe();

let commandsPerMinute, guildCounter, memberCounter;

client.config = require('./config.json');
client.tags = new enmap({provider: new enmapLevel({name: 'tags'})});
client.ignores = new enmap({provider: new enmapLevel({name: 'ignores'})});
client.afk = new enmap({provider: new enmapLevel({name: 'afk'})});

client.commands = new enmap();
client.aliases = new enmap();

client.commandsRan = 0;
client.wolfram = client.config.wolfram.enabled;

client.tags.defer.then(() => {
  console.log(`[TAGS] ${client.tags.size} tags loaded!`);
});
client.ignores.defer.then(() => {
  console.log(`[INGORES] ${client.ignores.size} users on the list.`);
});

const categories = client.config.categories;

for(let i = 0; i < categories.length; i++){
  readdir(`./commands/${categories[i]}`, (err, files) => {
    console.log(`[COMMANDS] Loading ${files.length} commands in category ${categories[i]}...`);

    files.forEach((f) => {
      let command = require(`./commands/${categories[i]}/${f}`);
      command.cfg.category = categories[i];
      client.commands.set(command.cfg.name, command);
      command.cfg.aliases.forEach((a) => { 
        client.aliases.set(a, command.cfg.name);
      });
    });

  });
}

if(client.config.pmx){
  commandsPerMinute = probe.meter({
    name: 'commands/minute',
    samples: 1,
    timeframe: 60 * 60
  });
  memberCounter = probe.metric({
    name: 'User count',
    value: () => {
      return client.users.size;
    }
  });
  guildCounter = probe.metric({
    name: 'Guild count',
    value: () => {
      return client.guilds.size;
    }
  });
}

client.on("ready", () => {
  console.log(`Bot is ready! Logged in as ${client.user.username}.\nServing ${client.users.size} users, in ${client.guilds.size} servers.`);
  if(client.config.logs.enabled){
    client.addLog = (text) => {
      cleanedText = text.replace('@', '');
      client.channels.get(client.config.logs.channelId).send(`[${moment().format('lll')}] ${cleanedText}`);
    };
  } else { client.addLog = (t) => {}; }
  client.addLog(`Bot started!`);
  client.user.setGame(`Say ${client.config.prefix}help for help! | In ${client.guilds.size} servers | ${client.users.size} users.`);
});

client.on("message", message => {
    
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  //Ignore bots, and those on the ignore list
  let id = message.author.id;
  if(message.author.bot) return;

  //Check if the author was afk, or if they mentioned an afk user
  if(client.afk.has(id)){
    client.afk.delete(id);
    message.author.send(`Welcome back! Your AFK status has been removed!`);
  }

  message.mentions.users.forEach((m) => {
    if(client.afk.has(m.id)){
      let afkUsr = client.afk.get(m.id);
      message.channel.send(`**${m.tag}** is AFK: \`\`\`${afkUsr.msg}\`\`\``);
    } 
  });

  //Do we have that command? If not, don't do anything
  //Also check for the prefix
  if(message.content.indexOf(client.config.prefix) !== 0) return;
  if(!client.commands.has(command) && !client.aliases.has(command)) return;

  //Since the command is valid, check if the user is on the ignore list
  if(client.ignores.has(id)){
    message.channel.send(`Sorry, but the owner has restricted you from using ${client.user.username}'s commands.\nThe following reason was given: \`${client.ignores.get(id).reason}\``);
    return;
  }

  //We have that command and the user isn't ignored/a bot!
  let cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  if(!cmd.cfg.public && !client.config.owners.includes(id)) return message.channel.send(`:x: You don't have permission to run that command!`);
  client.commandsRan++;
  if(client.config.pmx) commandsPerMinute.mark();
  cmd.run(client, message, args);
});

client.on('guildCreate', (guild) => {
  client.addLog(`Joined guild \`${guild.name}\` owned by \`${guild.owner.user.tag}\` with \`${guild.memberCount}\` members.\nNow in \`${client.guilds.size}\` servers with \`${client.users.size}\` users.`);
  client.user.setGame(`Say ${client.config.prefix}help for help! | In ${client.guilds.size} servers | ${client.users.size} users.`);
});

client.on('guildDelete', (guild) => {
  client.addLog(`Left guild \`${guild.name.replace('@', '')}\` owned by \`${guild.owner.user.tag}\` with \`${guild.memberCount}\` members.\nNow in \`${client.guilds.size}\` servers with \`${client.users.size}\` users.`);
  client.user.setGame(`Say ${client.config.prefix}help for help! | In ${client.guilds.size} servers | ${client.users.size} users.`);
});

client.login(client.config.token);
