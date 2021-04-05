require("dotenv").config();
require("./kick");

const { Client, DMChannel, User } = require("discord.js");
const client = new Client();
const PREFIX = "$";
const mashaId = "440076211276742658"
let masha;

const REACTION_MESSAGE_ID = '828689391937519658'

const randomFrom = (min = 0, max = 1) => {
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
};

const fetchUser = async (id) => client.users.fetch(id);
fetchUser(mashaId).then(response => masha = response )


client.on("ready", () => {
	console.log(`${client.user.tag} has logged in`);
});

client.on("message", async (message) => {
	if (message.author.bot) return;
	if (message.content.startsWith(PREFIX)) {
		const [CMD_NAME, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/);

		if (CMD_NAME === "kick") {
			if (message.member.hasPermission("KICK_MEMBERS"))
				return message.reply("You do not have permissions to use that command");
			if (args.length === 0) message.reply("Provide a ID");

			const member = message.guild.members.cache.get(args[0]);
			if (member) {
				member
					.setNickname("Walhalla")
					.then((member) => message.channel.send(`${member} was kicked`))
					.catch((err) => message.channel.send("I do not have permissions"));
			} else {
				message.channel.send("that member was not found");
			}
		} else if (CMD_NAME === "ban") {
			if (!message.member.hasPermission("BAN_MEMBERS"))
				return message.reply("You do not have permissions to use that command");

			if (args.length === 0) message.reply("Provide a ID");
			
			try {
				const user = await message.guild.members.ban(args[0])
				console.log(user)
			}
			catch (err) {
				console.log(err)
			}
		}




		if (CMD_NAME === "clear") {
			const channel = message.channel.bulkDelete(100);
		}
		if (CMD_NAME === "info") {
			// message.author.send('hi')
			// masha.send(args[0])

			console.log(masha.displayAvatarURL());
			
		}
		if (CMD_NAME === "r") {
			const [num1, num2] = args;
			const min = parseInt(num1);
			const max = parseInt(num2);

			message.channel.send(`random number from ${min} to ${max} is ${random}`);
		}
	}


	client.on('messageReactionAdd', (reaction, user) => {
		const {name } = reaction.emoji;
		if (reaction.message.id === REACTION_MESSAGE_ID)

		switch(name) {
			case '🍎' : 
		}

	})

	// if (message.content.match(/привет|приветик/i)) {
	// 	message.channel.send("приветик))");
	// 	return;
	// }

});

client.login(process.env.DISCORDJS_BOT_TOKEN);
