const settings = require("../../config/settings.js");
const snip = require("../../scripts/snippets");

module.exports = {

	name: 'boop',
	description: 'Give user(s) a boop on the face',
  usage: "boop [@User/ID] [@User/ID]...",
  // This is the description for the user option
  slashDescrip: "A user to boop",
  // 0 = Install as a guild command, 1 = Install as a user command
  integration_types: [0, 1],
  // 0 = Allow command to be run in guilds, 1 = Allow commands to be used in bot dms, 2 = Allow commands to be used in Private Messages
  contexts: [0, 1, 2],    
	async execute(fox, stuff) {

    // Defines the people to receiver the commands action (if any is given)
    const receivers = stuff.r

    // Group responses
    const boops = [
        `jumps on ${receivers} and boops them! ${settings.boop} **boop!**`,
        `walks up to ${receivers} and boops them! ${settings.boop} **boop!**`,
        `boops ${receivers}! ${settings.boop} **boop!**`,
        `gives ${receivers} a quick boop~ ${settings.boop} **boop!**`,
        `sneakily boops ${receivers} ${settings.boop} **boop!**`,
        `runs around ${receivers} and boops them multiple times! ${settings.boop} **boop!**`,
        `walks up behind ${receivers}, taps them on the back and the moment they turn around-- ${settings.boop} **boop!**`,
        `quickly boops ${receivers} on the nose ${settings.boop} **boop!**`,
        `gives ${receivers} a noseboop! ${settings.boop} **boop!**`,
        `boops ${receivers} ${settings.boop} **boop!**`,
        `teasingly boops ${receivers} on the nose ${settings.boop} **boop!**`,
        `smiles and boops ${receivers}! ${settings.boop} **boop!**`,
        `softly boops ${receivers} ${settings.boop} **boop!**`,
        `leans over towards ${receivers} and gives them a couple of boops! ${settings.boop} **boop!**`,
        `deployed their booping device to boop ${receivers} multiple times! ${settings.boop} **boop!**`,
        `softly boops ${receivers} on the cheek! ${settings.boop} **boop!**`
      ];

    let displayName = fox?.member?.displayName
    if (!displayName) displayName = fox.user.displayName

    const selfR = `**${displayName}** boops themselves! 'o'`
    const rr = `**${displayName}** ` + boops[Math.floor(Math.random() * boops.length)]

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