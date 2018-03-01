exports.run = (client, message, args) => {
    let amount = parseInt(args.shift());
    let text = args.join(' ');
    let out = '';

    if(!amount){
        message.channel.send(`:x: You must provide a valid number of times to repeat!`);
        return;
    }

    for(let i = 0; i < amount; i++){
        out += text;
    }

    if(out.length >= 2000){
        message.channel.send(':x: The resulting text was too big! Try a smaller string, less spaces or both!');
        return;
    }

    message.channel.send(out);

}

exports.cfg = {
    name: 'repeat',
    desc: 'Repeat a string a bunch',
    usage: '{prefix}repeat [times] [text]',
    aliases: [],
    public: true
}