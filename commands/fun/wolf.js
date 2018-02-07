exports.run = (client, message, args) => {

    if(!client.wolfram){
        message.channel.send(`:x: Wolfram|Alpha functionality is currently disabled!`);
        return;
    }

    const snek = require('snekfetch');
    let query = encodeURIComponent(args.join(' '));
    let appID = client.config.wolfram.appID;

    message.channel.startTyping();

    snek.get(`http://api.wolframalpha.com/v1/result?appid=${appID}&i=${query}`)
        .then(res => {
            if(!res.ok){
                message.channel.send(`:x: There was an error while making the request!`);
                message.channel.stopTyping();
                return;
            }

            if(!res.status === 200){
                message.channel.send(`:x: Wolfram was unable to provide an answer...`);
                message.channel.stopTyping();
                return;
            }

            //console.log(res)

            message.channel.send(res.text);
            message.channel.stopTyping();

        })
        .catch(e => {
            message.channel.send(`:x: There was an error while making the request! \`\`\`${e}\`\`\``);
            message.channel.stopTyping();
            client.wolfram = false;
            return;
        })

}

exports.cfg = {
    name: 'wolf',
    desc: 'Query Wolfram|Alpha',
    usage: '{prefix}wolf [query]',
    aliases: ['wolfram', 'wr'],
    public: true
}