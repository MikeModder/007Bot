exports.run = (client, message, args) => {
    //message.channel.send("007Bot: info placeholder!")
    if(message.mentions.members.size === 0){
        message.channel.send("Info about `"+message.author.tag+"`:\n" +
        "Username: "+message.author.username +"\n")
        return;
    } else {
        let usr = message.mentions.members.first();
        let usrTag = usr.tag;
        let usrName = usr.username;
        message.channel.send('Info about `'+usrTag+"`:\n"+
        "Username: "+usrName+"\n")
        return;
    }
};