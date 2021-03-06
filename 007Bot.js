const discord = require('discord.js');
const client = new discord.Client();
const enmap = require('enmap');
const enmapLevel = require('enmap-level');
const moment = require('moment');
const { readdir } = require('fs');
const BlankServerConf = require('./Constants').DefServerConf;
const pmx = require('pmx');
const probe = pmx.probe();

let commandsPerMinute, guildCounter, memberCounter;

client.config = require('./config.json');
client.search = require('./helpers/Search');

client.tags = new enmap({provider: new enmapLevel({name: 'tags'})});
client.ignores = new enmap({provider: new enmapLevel({name: 'ignores'})});
client.afk = new enmap({provider: new enmapLevel({name: 'afk'})});
client.server_cfg = new enmap({provider: new enmapLevel({name: 'server_cfg'})});

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
client.server_cfg.defer.then(() => {
  console.log(`[CFG] Loaded ${client.server_cfg.size} guild configs!`);
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
  console.log(`[READY] Bot is ready! Logged in as ${client.user.username}. Serving ${client.users.size} users, in ${client.guilds.size} servers.`);
  if(client.config.logs.enabled){
    client.addLog = (text) => {
      cleanedText = text.replace('@', '');
      client.channels.get(client.config.logs.channelId).send(`[${moment().format('lll')}] ${cleanedText}`);
    };
  } else { client.addLog = (t) => {}; }
  client.guilds.forEach(g => {
    if(!client.server_cfg.has(g.id)){
      client.server_cfg.set(g.id, BlankServerConf);
    }
  });
  client.addLog(`Bot started!`);
  client.updateStatus = () => {
    let statuses = [
      `with ${client.users.size} users!`,
      `with ${client.guilds.size} ${client.guilds.size > 1 ? 'guilds' : 'guild'} and ${client.channels.size} ${client.channels.size > 1 ? 'channels' : 'channel'}!`,
      `with ${client.emojis.size} ${client.emojis.size > 1 ? 'emojis' : 'emoji'}!`,
      `for ${require('moment')(Date.now() - client.uptime).toNow(true)}!`,
      `with ${client.commands.size} commands!`
    ];
    let newStatus = statuses[Math.round(Math.random() * statuses.length)];
    client.user.setGame(newStatus);
  };
  client.updateStatus();
  //Change status every 5 minutes.
  setInterval(() => {
    client.updateStatus();
  }, 5 * 60000);
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
  try {
    cmd.run(client, message, args);
  } catch (e) {
    message.channel.send(`:x: There was a really big error! \`\`\`${e}\`\`\``);
  }
});

client.on('guildCreate', (guild) => {
  client.addLog(`Joined guild \`${guild.name}\` owned by \`${guild.owner.user.tag}\` with \`${guild.memberCount}\` members.\nNow in \`${client.guilds.size}\` servers with \`${client.users.size}\` users.`);
  client.server_cfg.set(guild.id, BlankServerConf);
});

client.on('guildDelete', (guild) => {
  client.addLog(`Left guild \`${guild.name.replace('@', '')}\` owned by \`${guild.owner.user.tag}\` with \`${guild.memberCount}\` members.\nNow in \`${client.guilds.size}\` servers with \`${client.users.size}\` users.`);
});

client.on('guildMemberAdd', (member) => {
  let guild = member.guild;
  let config = client.server_cfg.get(guild.id);
  if(config.autorole.length > 0){
    let roles = [];
    config.autorole.forEach(ar => {
      roles.push(guild.roles.get(ar));
    });
    member.addRoles(roles)
      .catch(e => {  });
  }
});

client.on('roleDelete', (role) => {
  let guild = role.guild;
  let config = client.server_cfg.get(guild.id);
  if(config.autorole.includes(role.id)){
    config.autorole.splice(config.roleme.indexOf(role.id), 1);
    client.server_cfg.get(guild.id, config);
  }
});

client.login(client.config.token);
