exports.run = (client, message, args, config) => {
    let request = require('request')
    request('http://ibot-discord.cf:9024/api/stats', (err, http, body) => {
        if(err){
            message.channel.send(":x: There was an error getting iBot's stats!")
            return;
        }
        try {

            let resp = JSON.parse(body)
            
            message.channel.send(`\`\`\`Guild count: ${resp.guilds}\nUser count: ${resp.users}\nChannels: ${resp.channels}\nCommands ran: ${resp.cmdsran}\nRAM Usage: ${resp.ram}\`\`\``)
        } catch (e) {
            message.channel.send(":x: An unkown error occured while getting iBot's stats!")
        }
    });
};  