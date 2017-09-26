exports.run = (client, message, args) => {
    if(message.guild.me.permissions.has("MANAGE_NICKNAMES")){
        message.channel.send(":x: I don't have permission to set nicknames!")
        return;
    }

    let newNick = args.join(" ")
    
    if(newNick===""){
        message.channel.send(":white_check_mark: Ok, I've reset your nickname!B")        
        message.member.setNickname("");
        return;
    }

    message.members.setNickname(newNick);
    return;
};