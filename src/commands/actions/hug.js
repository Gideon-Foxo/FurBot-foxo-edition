const settings = require("../../config/settings.js");
const snip = require("../../scripts/snippets");

module.exports = {

	name: 'hug',
	description: 'Give one or multiple users a warm hug',
  usage: "hug [@User/ID] [@User/ID]...",
  // This is the description for the user option
  slashDescrip: "A user to hug",   
  // 0 = Install as a guild command, 1 = Install as a user command
  integration_types: [0, 1],
  // 0 = Allow command to be run in guilds, 1 = Allow commands to be used in bot dms, 2 = Allow commands to be used in Private Messages
  contexts: [0, 1, 2],   
	async execute(fox, stuff) {

    // Defines the people to receiver the commands action (if any is given)
    const receivers = stuff.r

    // Group responses
    const hugs = [
        `jumps on ${receivers} and hugs them tight! ${settings.hug}`,
        `walks up to ${receivers} and gives them a hug! ${settings.hug}`,
        `hugs ${receivers}! ${settings.hug}`,
        `gives ${receivers} a warm hug~ ${settings.hug}`,
        `cozily hugs ${receivers} ${settings.hug}`,
        `shares a loving hug with ${receivers} :heart:!`,
        `wraps their arms around ${receivers} for a long, comfy hug! ${settings.hug}`,
        `warmly hugs ${receivers} ${settings.hug}`,
        `gives ${receivers} a big hug ${settings.hug}`,
        `hugs ${receivers} tight ${settings.hug}`,
        `spreads their arms and locks ${receivers} in a cozy hug! ${settings.hug}`,
        `smiles and hugs ${receivers}! ${settings.hug}`,
        `cuddles ${receivers} ${settings.hug}`,
        `cozily cuddles with ${receivers} ${settings.hug}`,
        `warmly cuddles up to ${receivers} ${settings.hug}`,
        `covers ${receivers} in floof! ${settings.hug}`,
        `soaks up ${receivers} into their fluff to keep them warm ${settings.hug}`,
        `wraps ${receivers} in hundreds of layers of blankets and hugs them ${settings.hug}`,
        `places ${receivers} in front of a warm campfire and hugs them ${settings.hug}`,
        `huddles together with ${receivers} ${settings.hug}`,
        `yells: FREE HUGS FOR ${receivers}!! ${settings.hug}`,
        `yells: Attention ${receivers}! You are about to get hugged!`,
        `gives ${receivers} a long, warm hug! Super cozy!`,
        `shares a nice comforting hug with ${receivers}!`
      ];

    let displayName = fox?.member?.displayName
    if (!displayName) displayName = fox.user.displayName

    const selfR = `**${displayName}** hugs themselves! ${settings.hug}`
    const rr = `**${displayName}** ` + hugs[Math.floor(Math.random() * hugs.length)]

    // Add the user action data into the database if it is enabled
    if (settings.database && stuff.rIds.length) snip.actionData((stuff.prefix) ? fox.author.id : fox.user.id, stuff.rIds, this.name)

    if (stuff.text) {
      if (stuff.r?.length) return await fox.channel.send(rr)
      else return await fox.channel.send(selfR)
    }
    else if (stuff.slash) {
      if (stuff.r?.length) return await fox.reply(rr)
      else return await fox.reply(selfR)
    }
	},
};