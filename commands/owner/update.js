exports.run = (client, message, args) => {
    let shell = require('shelljs');

    let msg;
    message.channel.send(`Running \`git pull\`, please wait...`)
        .then(sentMsg => msg = sentMsg)
        .then(() => {
            shell.exec('git pull');
            msg.edit(`Complete! Rebooting...`)
                .then(() => {
                    process.exit(1);
                });
        });
};

exports.cfg = {
    name: 'update',
    desc: 'Updates the bot with a quick git pull',
    usage: '{prefix}update',
    aliases: [],
    public: false
};