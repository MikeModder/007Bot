exports.run = (client, message, args) => {



	function clean(text) {
		if (typeof(text) === "string")
		return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	else
		return text;
	}

	if(message.author.id !== client.config.owner){
		message.channel.send(":x: You don't have permission to run that command!");
		return;
	}
  try {
    const code = args.join(" ");
    let evaled = eval(code);

    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);

    message.channel.send(clean(evaled), {code:"xl"});
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }

};

exports.cfg = {
	name: 'eval',
	desc: 'Evaluates the given JavaScript.',
	usage: '{prefix}eval [code]',
	aliases: [],
	public: false
};