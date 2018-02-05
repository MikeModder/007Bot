exports.run = (client, message, args) => {
    let amount = parseInt(args.shift());
    let text = args.join(' ');
    let out = '';

    if(!amount){
        message.channel.send(`:x: You must provide a valid number of spaces!`);
        return;
    }

    let space = '';
    for(let i = 0; i < amount; i++){
        space += ' ';
    }

    out += '***';
    for(let i = 0; i < text.length; i++){
        out += text.charAt(i) + space;
    }
    out += '***';

    if(out.length >= 2000){
        message.channel.send(':x: The resulting text was too big! Try a smaller string, less spaces or both!');
        return;
    }

    message.channel.send(out);

}

exports.cfg = {
    name: 'space',
    desc: 'Add some spaces between the letters.',
    usage: '{prefix}space [amount of spaces] [text]',
    aliases: ['expand'],
    public: true
}