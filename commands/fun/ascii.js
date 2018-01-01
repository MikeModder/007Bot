exports.run = (client, message, args) => {
    
    let which;
    switch(args[0]){
        case "cat":
            which = true;
            break;
        case "cool":
            which = false;
            break;
        default:
            which = Math.round(Math.random());
            break;
    }

    let cat = require('cat-ascii-faces');
    let cool = require('cool-ascii-faces');

    if(which){
        //cat
        message.channel.send(cat());
    } else {
        //cool
        message.channel.send(cool());
    }
    
};

exports.cfg = {
    name: 'ascii',
    desc: 'Get a random ASCII face.',
    usage: '{prefix}ascii [cool/cat]',
    aliases: [ 'face', 'donger' ],
    public: true
}