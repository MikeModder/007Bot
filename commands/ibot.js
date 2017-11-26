exports.run = (client, message, args) => {
    let request = require('request')
    request('http://ibot.idroid.me/api/bot/stats', (err, http, body) => {
        if(err){
            message.channel.send(":x: There was an error getting iBot's stats!");
            return;
        }
        try {

            let resp = JSON.parse(body);

            message.channel.send(`\`\`\`-=-Info about iBot-=-\nGuild count: ${resp.guilds}\nUser count: ${resp.users}\nChannels: ${resp.channels}\nCommands ran: ${resp.cmdsran}\nRAM Usage: ${resp.ram}\`\`\``);
        } catch (e) {
            message.channel.send(":x: An unkown error occured while getting iBot's stats!");
        }
    });
};
