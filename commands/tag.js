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

      args.shift();
      args.shift();

      const tagData = {
        author: {
          tag: message.author.tag,
          id: message.author.id
        },
        content: args.join(" "),
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
      message.channel.send('Coming soon:tm');
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
      if(!client.tags.has(args[0])){
        message.channel.send(':x: That tag wasn\'t found!');
        break;
      }

      tag = client.tags.get(args[0]);
      message.channel.send(`Content of tag:\n${tag.content}`)
      break;
  }
};
