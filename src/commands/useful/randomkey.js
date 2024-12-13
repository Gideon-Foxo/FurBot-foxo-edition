const snip = require("../../scripts/snippets");

module.exports = {

	name: 'randomkey',
	description: 'Return a random key!',
	// 0 = Install as a guild command, 1 = Install as a user command
	integration_types: [0, 1],
	// 0 = Allow command to be run in guilds, 1 = Allow commands to be used in bot dms, 2 = Allow commands to be used in Private Messages
	contexts: [0, 1, 2],
	async execute(fox, stuff) {

        return await fox.reply(`\`${snip.get.key()}\``)
	},
};