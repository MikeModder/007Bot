exports.run = (client, message, args) => {
	function clean(text) {
		if (typeof(text) === "string")
		return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203)).replace(client.config.token, '[pretend this is a token]');
	else
		return text;
	}

  try {
    const code = args.join(" ");
    let evaled = eval(code);

    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);

		if(evaled.length > 2000) return message.channel.send(`:x: The output was over 2000 characters!`);
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