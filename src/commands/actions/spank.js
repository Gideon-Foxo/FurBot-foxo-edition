const settings = require("../../config/settings.js");

module.exports = {

	name: 'spank',
	description: 'Give user(s) a spanking. They probably deserve it.',
  usage: "spank [@User/ID] [@User/ID]...",
  // This is the description for the user option
  slashDescrip: "A user to spank",
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

    const selfR = `**${fox.member.displayName}** spanks their own butt! \ud83d\udc4b\ud83c\udf51`
    const rr = `**${fox.member.displayName}** ` + spanks[Math.floor(Math.random() * spanks.length)]

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