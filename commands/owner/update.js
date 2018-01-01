exports.run = (client, message, args) => {
    let shell = require('shelljs');

    let msg;
    message.channel.send(`Running \`git pull\`, please wait...`)
        .then((msg) => {
            shell.exec('git pull');
            msg.edit(`Complete! Rebooting...`)
                .then(() => {
                    client.tags.close();
                    client.ignores.close();
                    client.afk.close();
                    client.destroy();
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