exports.run = (client, message, args) => {

    let pkgInfo = require('package-info');
    let validator = require('validator');

    let pkgName = args.join(' ');

    if(validator.isEmpty(pkgName)){
        message.channel.send(':x: You must provide a package name to search for!');
        return;
    }

    pkgInfo(pkgName)
        .then((info) => {
            let msg = ``;
            msg += `Info for package \`${info.name}\`:\n`;
            msg += `Author: ${info.author}\n`;
            msg += `Version: ${info.version}\n`;
            msg += `Description: \`${info.description}\`\n`;
            msg += `Homepage: ${info.homepage}`;
    
            message.channel.send(msg);
        })
        .catch((err) => {
            if(err.statusCode === 404){
                message.channel.send(`:x: There is no package named \`${pkgName}\`!`);
            } else {
                console.log(`[CMD][NPM] Error: ${err}`);
                message.channel.send(`:x: There was an error trying to get information for the requested package. If you think this is an error, report it to \`mikemodder007#7678\`!`);
            }
        });
};

exports.cfg = {
    name: 'npm',
    desc: 'Gets information about the given npm package.',
    usage: '{prefix}npm [package]',
    aliases: [],
    public: true
};