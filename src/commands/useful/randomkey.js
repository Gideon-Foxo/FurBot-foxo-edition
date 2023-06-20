const snip = require("../../scripts/snippets");

module.exports = {

	name: 'randomkey',
	description: 'Return a random key!',
	async execute(fox, stuff) {

        return await fox.reply(`\`${snip.get.key()}\``)
	},
};