exports.run = (client, message, args) => {
    let msg = args.join(' ') || 'No AFK message provided';
    let id = message.author.id;

    let afk = {
        msg
    };

    client.afk.set(id, afk);

    message.channel.send(`:white_check_mark: Ok, you've gone AFK. See you later! :wave:`);

};

exports.cfg = {
    name: 'afk',
    desc: 'Sets your afk status.',
    usage: '{prefix}afk [afk message]',
    aliases: [],
    public: true
};