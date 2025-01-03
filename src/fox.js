const Discord = require('discord.js');
const log = require('dbot-console-logger');
const settings = require('./config/settings.js');
const db = require('./database.js');


// The function for messages!
async function messages(msg, client) {

    // If author is a bot return
    if (msg.author.bot) return;
    // If message does not start with the prefix return
    if (!msg.content.startsWith(settings.prefix)) return;

    // Defines args
    let args = msg.content.slice(settings.prefix.length).trim().split("><@").join("> <@").split(/ +/);

    // Defines the name of the possible command 
	const commandName = args.shift().toLowerCase();

    // Checks to see if the command exists, returns if not 
	if (!client.commands.has(commandName)) return;

    // Defines the command
    const command = client.commands.get(commandName);


    // Defines the client permissions in the channel the command is being run on
    const bot = await msg.guild?.members.fetch(client.user)
    const clientPerms = msg.channel.permissionsFor(bot)

    // If there are not perms (return if cant send messages and return error if doesnt have embed links unless command has said otherwise)
    if (!clientPerms.has("SendMessages")) return;
    if (!command.embed && !clientPerms.has("EmbedLinks")) return await msg.channel.send(`${settings.redTick} I need \`embed links\` permission to run this command!`)


    // If command is an action command (this is to gather the receivers)
    let receivers = null;
    const Ids = []

    if (command.module === "actions") {
        const array = []

        // Starts a loop that goes over all of the provided users to add to the array
        for (arg of args) {

        // Checks if arg is a user ID or mention
        if (arg.match(/<@!?[0-9]+>/) || arg.match(/^[0-9]+$/)) {
            // Define the user ID
            let userID = arg.replace(/<@!?/, "").replace(/>/, "")
            // Fetch member
            member = await msg.guild.members.fetch({ user: userID, }).catch((err) => {console.log(err)})
            // If member is the author
            if (member.id === msg.author.id) {}
            // If the array has 25 items in it stop (25 is the say amount of users you can do with slash command for consistency)
            else if (array.length === 25) break;
            // Push the members displayname the to the array!
            else {
                array.push(member.displayName)
                Ids.push(member.id)
            }
        }
        // If there are names in the arrays format it
        if (array.length === 1) receivers = `**${array.join(" ")}**`
        if (array.length === 2) receivers = `**${array.join("** and **")}**`
        if (array.length >= 3) receivers = `**${array.slice(0, -1).join('**, **') + '** and **' + array[array.length-1]}**`
    }
}

    // If user args and user
    if (command.options?.[0]?.name === "user" && (args[0]?.match(/<@!?[0-9]+>/) || args[0]?.match(/^[0-9]+$/))) {
        let userID = args[0].replace(/<@!?/, "").replace(/>/, "")
        args = await client.users.fetch(userID) 
    } else args = null

    // Defines the object stuff used for passing data over into the command.
    const stuff = {
        client: client,
        r: receivers,
        rIds: Ids,
        prefix: settings.prefix,
        text: true,
        args: args,
    }


        // This runs the command
	try {
		command.execute(msg, stuff, db);
        // If any error  log it and return error message to user
	} catch (err) {
		log.error("Error in command handler (fox.js function messages at command execute)", err)
		
        const embed = new Discord.EmbedBuilder()
        .setColor(Settings.red)
        .setDescription(`${settings.redTick} Something went wrong, Error: ${err.msg}`)
        return await msg.channel.send({embeds: [embed]})
	}
}


// Slash commands!
async function slash(i, client) {

    // This fetchs the command
    let command = client.commands.get(i.commandName)

    let receivers = null;
    const Ids = []

    // If the command is an action command gather receivers
    if (command.module === "actions") {

        const array = []

        // Trigger the func function
        // Why did I do it like this, do I really hate loops that much 😬
        i.options.data.forEach(func)

        // Added the displayname to the array of users, skis over the author
        function func(item) {
            let member = item.member
            // If the member does not exist (run in dms or whatever) use the user display name instead
            if (!member?.id) member = item.user
            if (member.id === i.user.id) {}
            else {
                array.push(member.displayName)
                Ids.push(member.id)
            }
        }

        // If there are names in the arrays format it
        if (array.length === 1) receivers = `**${array.join(" ")}**`
        if (array.length === 2) receivers = `**${array.join("** and **")}**`
        if (array.length >= 3) receivers = `**${array.slice(0, -1).join('**, **') + '** and **' + array[array.length-1]}**`

    }

    // Defines the stuff object used to pass data over into the command
    let stuff = {
        client: client,
        r: receivers,
        rIds: Ids,
        slash: true,
    }

    await command.execute(i, stuff, db);
}


// Export slash and messages from this file
module.exports = {
    messages,
    slash,
}