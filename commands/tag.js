exports.run = (client, message, args) => {

  const moment = require('moment');

  let subCmd = args[0];
  let tagName = args[1];
  let tag;

  switch (args[0]) {
    case "create":
      //create a tag
      if(client.tags.has(tagName)){
        message.channel.send(':x: That tag already exists!');
        break;
      }

      if(message.mentions.everyone){
        message.channel.send(':x: Don\'t mention `@here` or `@everyone` in your tag!');
        break;
      }
      
      if(message.mentions.size > 0){
        message.channel.send(':x: Don\'t mention people through the bot!');
        break;
      }

      args.shift();
      args.shift();

      let content = args.join(" ");
      
      if(!content || content === " "){
        message.channel.send(':x: You must specify the content for your tag!')
      }
      
      content = content.replace("@here", "(at)here");
      content = content.replace("@everyone", "(at)everyone");

      const tagData = {
        author: {
          tag: message.author.tag,
          id: message.author.id
        },
        content: content,
        createdAt: {
          hr: moment().format('MMMM Do YYYY, h:mm:ss a'),
          cpu: moment().format('YYYYMMDD')
        }
      }

      client.tags.set(tagName, tagData);
      message.channel.send(`:white_check_mark: Tag \`${tagName}\` created!`)
      break;
    case "edit":
      //edit a tag
      message.channel.send('Coming soon:tm:');
      break;
    case "delete":
      message.channel.send('Coming soon:tm:');
      break;
    case "info":
      //Get info about a tag
      if(!client.tags.has(tagName)){
        message.channel.send(`:x: The tag \`${tagName}\` was not found!`)
        break;
      }

      tag = client.tags.get(tagName);
      let agoTxt = moment(tag.createdAt.cpu, "YYYYMMDD").fromNow();
      message.channel.send(`Info about tag (${tagName}):\n`+
      `Author: ${tag.author.tag} (ID: ${tag.author.id})\n`+
      `Created at: ${tag.createdAt.hr} (${agoTxt})`)
      break;

    default:
      //display a tag
      if(!args[0]){
        message.channel.send(`:x: You must specify a tag!`);
        break;
      } 
      if(!client.tags.has(args[0])){
        message.channel.send(':x: That tag wasn\'t found!');
        break;
      }

      tag = client.tags.get(args[0]);
      message.channel.send(`Content of tag:\n${script(tag.content)}`)
      break;
  }
  
  function script(input){
    let finished = input.replace("{authTag}", message.author.tag);
    finished = finished.replace("{authID}", message.author.id);
    finished = finished.replace("{guildName}", message.guild.name);
    finished = finished.replace("{today}", moment().format("DD.MM.YYYY"));
    finished = finished.replace("{guildOwnerTag}", message.guild.owner.user.tag);
    finished = finished.replace("{guildOwnerID}", message.guild.ownerID);
    return finished;
  }
  
};
