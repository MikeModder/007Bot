exports.run = (client, message, args) => {

    let qrImg = require('qr-image');
    let validator = require('validator');
    let Attachment = require('discord.js').Attachment;

    let encodeText = args.join(' ');
    
    if(validator.isEmpty(encodeText)){
        message.channel.send(`:x: You must provide text to encode!`);
        return;
    }

    let qr = qrImg.imageSync(encodeText, { type: 'png' });
    let msgAttach = new Attachment(qr, "qr.png");

    message.channel.send('Here\'s your QR!', msgAttach);

};

exports.cfg = {
    name: 'qr',
    desc: 'Generates a QR code with the given text.',
    usage: '{prefix}qr [text]',
    aliases: [],
    public: true
};
  