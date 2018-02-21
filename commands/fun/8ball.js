exports.run = (client, message, args) => {
    let question = args.join(' ');
    let responses = [
        //Affirmitave
        'It is certain',
        'It is decidedly so',
        'Without a doubt',
        'Yes definitely',
        'You may rely on it',
        'As I see it, yes',
        'Most likely',
        'Outlook good',
        'Yes',
        'Signs point to yes',
        //Uncertain
        'Reply hazy try again',
        'Ask again later',
        'Better not tell you now',
        'Cannot predict now',
        'Concentrate and ask again',
        //Negitave
        'Don\'t count on it',
        'My reply is no',
        'My sources say no',
        'Outlook not so good',
        'Very doubtful' ];

    let choice = Math.round(Math.random() * responses.length);
    let theBallSays = responses[choice];

    message.channel.send(`In response to the question \`${question}\`, the Magic 8 Ball said:\`\`\`${theBallSays}\`\`\``);

};

exports.cfg = {
    name: '8ball',
    desc: 'See what the magic 8 ball has to say!.',
    usage: '{prefix}8ball [question]',
    aliases: [],
    public: true
};