require("dotenv").config();
require("./kick");

const { Client } = require("discord.js");
const client = new Client();
const PREFIX = "$";

client.on("ready", () => {
	console.log(`${client.user.tag} has logged in`);
});

client.on("message", (message) => {
	if (message.author.bot) return;
	if (message.content.startsWith(PREFIX)) {
		const [CMD_NAME, ...args] = message.content
			.trim()
			.substring(PREFIX.length)
			.split(/\s+/);

		if (CMD_NAME === "kick") {
			if (message.member.hasPermission('KICK_MEMBERS'))
				return message.reply('You do not have permissions to use that command')
			if (args.length === 0) message.reply("Provide a ID");

			const member = message.guild.members.cache.get(args[0]);
			if (member) {
				member
					.setNickname("Walhalla")
					.then((member) =>
						message.channel.send(`${member} was kicked`)
					)
					.catch((err) =>
						message.channel.send("I do not have permissions")
					);
			} else {
				message.channel.send("that member was not found");
			}
		}

		if (CMD_NAME === "clear") {
			const channel = message.channel.bulkDelete(100);
		}
	}

	// if (message.content.match(/привет|приветик/i)) {
	// 	message.channel.send("приветик))");
	// 	return;
	// }

	// if (message.content === "привет ангелочек") {
	// 	message.reply("Привет сладенький");
	// 	return;
	// }
	// if (message.content.match(/хочешь/gi)) {
	// 	message.channel.send("конечно хочу))");
	// 	return;
	// }
	// if (message.content.match(/сладких снов|спокойной ночи/gi)) {
	// 	message.channel.send("cладких");
	// 	return;
	// }
	// if (message.content.match(/люблю тебя/i)) {
	// 	message.channel.send("мур :heart_eyes:");
	// 	return;
	// }
	// if (message.content.match(/лови обнимашку|скучаю/i)) {
	// 	message.channel.send(":blush:");
	// 	return;
	// }

});

client.login(process.env.DISCORDJS_BOT_TOKEN);
