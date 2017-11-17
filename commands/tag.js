exports.run = (client, message, args) => {

  let subCmd = args[0];
  let tagName = args[1];
  let tag;

  switch (args[0]) {
    case "create":
      //create a tag
      if(client.tags.get(args[1])){
        message.channel.send(':x: That tag already exists!');
        break;
      }

      let moment = require('moment');
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
      tag = client.tags.get(args[0]);
      let agoTxt = moment(tag.createdAt.cpu, "YYYYMMDD").fromNow();
      if(!tag){
        message.channel.send(`:x: The tag \`${args[0]}\` was not found!`)
      }
      message.channel.send(`Info about tag (${args[0]}):\n`+
      `Author: ${tag.author}\n`+
      `Created at: ${tag.createdAt.hr} (${agoTxt})`)

    default:
      //display a tag
      tag = client.tags.get(args[0]);
      if(!tag){
        message.channel.send(':x: That tag wasn\'t found!');
        break;
      }
      message.channel.send(`Content of tag:\n${tag.content}`)
      break;
  }
};
