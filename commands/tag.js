exports.run = (client, message, args) => {
  switch (args[0]) {
    case "create":
      //create a tags
      if(client.tags.get(args[1])){
        message.channel.send(':x: That tag already exists!');
        break;
      }
      let tagData = [];
      let moment = require('moment');
      args.shift();
      tagData.author = message.author.tag;
      tagData.content = args.join(" "); //erase the first arg and join the rest
      tagData.createdAt = []
      tagData.createdAt.hr = moment().format('MMMM Do YYYY, h:mm:ss a'); //current date and time
      tagData.createdAt.cpu = moment().format('YYYYMMDD'); //used for (time ago) in info subcommand
    case "edit":
      //edit a tag
      message.channel.send('Coming soon:tm:');
      break;
    case "info":
      //Get info about a tag
      let tag = client.tags.get(args[0]);
      let agoTxt = moment(tag.createdAt.cpu, "YYYYMMDD").fromNow();
      if(!tag){
        message.channel.send(`:x: The tag \`${args[0]}\` was not found!`)
      }
      message.channel.send(`Info about tag (${args[0]}):\n`+
      `Author: ${tag.author}\n`+
      `Created at: ${tag.createdAt.hr} (${agoTxt})`)

    default:
      //display a tag
      let tag = client.tags.get(args[0]);
      if(!tag){
        message.channel.send(':x: That tag wasn\'t found!');
        break;
      }
      message.channel.send(`Content of tag:\n${tag.content}`)
      break;
  }
};
