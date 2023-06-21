const settings = require("../../config/settings.js");
const snip = require("../../scripts/snippets");

module.exports = {

	name: 'pet',
	description: 'Give user(s) some much needed pets!',
  usage: "pet [@User/ID] [@User/ID]...",
  // This is the description for the user option
  slashDescrip: "A user to pet",  
	async execute(fox, stuff) {

    // Defines the people to receiver the commands action (if any is given)
    const receivers = stuff.r


    // Group responses
    const pets = [
        `inches closer to ${receivers} and pets them! ${settings.pet}`,
        `softly pets ${receivers}! ${settings.pet} ***petpet!***`,
        `gives soft pets to ${receivers} ${settings.pet}`,
        `randomly pets ${receivers}! Woah! ${settings.pet}`,
        `reaches out to ${receivers} and gives them a quick few pets ${settings.pet}`,
        `petpets ${receivers}, who's a good pet? You are, yes you are! ${settings.pet}`,
        `pets ${receivers}! ${settings.pet}`,
        `gently applies some pets to ${receivers}'s heads, soft! ${settings.pet}'`,
        `gently pets ${receivers}~ ${settings.pet}`,
        `walks up to ${receivers} and pets them! ${settings.pet}`,
        `softly pets ${receivers}'s chest(s). Fluffy and warm! ${settings.pet}`,
        `decides to pet ${receivers}! ${settings.pet}`,
        `gives a couple of quick pets to ${receivers}! ${settings.pet}`,
        `slides over to ${receivers} and pets them~ ${settings.pet}`,
        `rolls over to ${receivers} and gives them some pets and attention ${settings.pet}`,
        `gives ${receivers} some caressing pets! ${settings.pet}`
    ];

    const selfR = `**${fox.member.displayName}** pets themselves!? 'o'`
    const rr = `**${fox.member.displayName}** ` + pets[Math.floor(Math.random() * pets.length)]

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