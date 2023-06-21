const settings = require("../../config/settings.js");
const snip = require("../../scripts/snippets");

module.exports = {

	name: 'boop',
	description: 'Give user(s) a boop on the face',
  usage: "boop [@User/ID] [@User/ID]...",
  // This is the description for the user option
  slashDescrip: "A user to boop",  
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

    const selfR = `**${fox.member.displayName}** boops themselves! 'o'`
    const rr = `**${fox.member.displayName}** ` + boops[Math.floor(Math.random() * boops.length)]

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