const settings = require("../../config/settings.js");

module.exports = {

	name: 'slap',
	description: 'Slap one or multiple users.. ouch :(',
  usage: "slap [@User/ID] [@User/ID]...",
  // This is the description for the user option
  slashDescrip: "A user to slap", 
	async execute(fox, stuff) {

    // Defines the people to receiver the commands action (if any is given)
    const receivers = stuff.r

    // Group responses
    const slaps = [
        `slaps ${receivers}! ${settings.slap}${settings.dizzy}`,
        `smacked ${receivers}! ${settings.slap}${settings.dizzy}`,
        `just slapped ${receivers}! ${settings.slap}${settings.dizzy}`,
        `walks up to ${receivers} and slaps them in the face ${settings.slap}${settings.dizzy}`,
        `bitch slaps ${receivers}! ${settings.slap}${settings.dizzy}`,
        `smacks ${receivers} hard, ouch! ${settings.slap}${settings.dizzy}`,
        `beats some sense into ${receivers} ${settings.slap}${settings.dizzy}`,
        `sends out slaps to ${receivers} ${settings.slap}${settings.dizzy}`,
        `slaps ${receivers} hard, leaving a red mark! ${settings.slap}${settings.dizzy}`,
        `slappity slap slap slaps ${receivers} ${settings.slap}${settings.dizzy}`,
        `gives ${receivers} a real good slappin'! ${settings.slap}${settings.dizzy}`,
        `whacks ${receivers} real good! ${settings.slap}${settings.dizzy}`,
        `do the slappy to ${receivers} ${settings.slap}${settings.dizzy}`,
        `starts a SLAP FIGHT! ${receivers}, get ready to get SLAPPED! ${settings.slap}${settings.dizzy}`
    ];

    const selfR = `**${fox.member.displayName}** slaps themselves..?`
    const rr = `**${fox.member.displayName}** ` + slaps[Math.floor(Math.random() * slaps.length)]

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