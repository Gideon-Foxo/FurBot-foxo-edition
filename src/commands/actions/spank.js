const settings = require("../../config/settings.js");
const snip = require("../../scripts/snippets");

module.exports = {

	name: 'spank',
	description: 'Give user(s) a spanking. They probably deserve it.',
  usage: "spank [@User/ID] [@User/ID]...",
  // This is the description for the user option
  slashDescrip: "A user to spank",
  // 0 = Install as a guild command, 1 = Install as a user command
  integration_types: [0, 1],
  // 0 = Allow command to be run in guilds, 1 = Allow commands to be used in bot dms, 2 = Allow commands to be used in Private Messages
  contexts: [0, 1, 2],
	async execute(fox, stuff) {

    // Defines the people to receiver the commands action (if any is given)
    const receivers = stuff.r

    // Group responses
    const spanks = [
        `gives ${receivers} a smol spanking! \ud83d\udc4b\ud83c\udf51`,
        `spanks ${receivers} \ud83d\udc4b\ud83c\udf51`,
        `gives ${receivers} a spank! \ud83d\udc4b\ud83c\udf51`,
        `spanks ${receivers} softly! \ud83d\udc4b\ud83c\udf51`,
        `spanks ${receivers} gently! \ud83d\udc4b\ud83c\udf51`,
        `turns around and spanks ${receivers}! \ud83d\udc4b\ud83c\udf51`,
        `gives ${receivers} a firm spanking! \ud83d\udc4b\ud83c\udf51`,
        `gives ${receivers} a hard spanking! \ud83d\udc4b\ud83c\udf51`,
        `seems to think you've been bad, ${receivers}, so they walk up to you and spank you! \ud83d\udc4b\ud83c\udf51`,
        `spanks ${receivers} several times! \ud83d\udc4b\ud83c\udf51`,
        `spanks ${receivers} until red marks appear! \ud83d\udc4b\ud83c\udf51`,
        `leans over towards ${receivers} and spanks their butt hard! \ud83d\udc4b\ud83c\udf51`,
        `walks up to ${receivers} and gives them a firm spanking! \ud83d\udc4b\ud83c\udf51`,
        `bends ${receivers} over their knees and gives them a hard spanking! \ud83d\udc4b\ud83c\udf51`,
        `raises their arm and spanks ${receivers} gently -- no wait i meant hard! \ud83d\udc4b\ud83c\udf51`,
        `gives ${receivers} a smol butt-bap.. that was a warning! \ud83d\udc4b\ud83c\udf51`
    ];

    let displayName = fox?.member?.displayName
    if (!displayName) displayName = fox.user.displayName

    const selfR = `**${displayName}** spanks their own butt! \ud83d\udc4b\ud83c\udf51`
    const rr = `**${displayName}** ` + spanks[Math.floor(Math.random() * spanks.length)]
    
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