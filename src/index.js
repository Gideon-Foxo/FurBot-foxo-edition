// This allows pm2 and chalk to work at the same time. Without it when using pm2 chalk does not do anything.
process.env.FORCE_COLOR = "true";
// Define modules
const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const log = require('dbot-console-logger');
// dumb djs stuff
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Files!
//const sharding = require('./sharding.js');
const fox = require('./fox.js');
const settings = require('./config/settings.js');
const token = require('./config/tokens.json');
const package = require('../package.json');
const database = require('./database.js');

// If there is a database go start it, read the readme for more info
if (settings.database) database()


// If slash commands is off add the message intent to see messages
const array = [Discord.GatewayIntentBits.Guilds]
if (!settings.slash) array.push(Discord.GatewayIntentBits.MessageContent, Discord.GatewayIntentBits.GuildMessages)

// Defines the client or bot instance
const client = new Discord.Client({
    allowedMentions: { parse: [] },
    intents: array
});
client.commands = new Discord.Collection();


// Define client uptime 
client.startTime = Date.now()



// This triggers when the bot is "ready"
client.on('ready', async (client) => {

    // Command loading! 
    // Add all new folders here 
    client.cmdmodules = fs.readdirSync(path.join(__dirname, './commands/'))

    // Loops thought the folders under 'commands' and loads the command files as long as they are js files
    for (const folder of client.cmdmodules) {  
        let filesInFolder = fs.readdirSync(path.join(__dirname, './commands/', folder)).filter(file => file.endsWith('.js'))
        for (const file of filesInFolder) {
            const commandexport = require(`./commands/${folder}/${file}`)
            commandexport.module = folder
            client.commands.set(commandexport.name, commandexport)
            //log.debug(`Loaded command ${log.c.bold(commandexport.name)}`)
        }
    }

    // Sets the string for what mode the bot is running on to be console logged
    let mode = "Running in slash mode."
    if (!settings.slash) mode = `Prefix: ${log.c.bold(settings.prefix)}`


    // The console log that its online
    log.info(`${log.chalk.bold(client.user.tag)} is now ${log.chalk.green("online")}.`)
    log.info(mode)
    log.info(`Version: ${log.c.bold(package.version)}`)
    log.info(`Guilds: ${log.c.bold(client.guilds.cache.size)}`)


    // This fetches the data for the commands to be used for slash and pushes them to Discord
    if (settings.slash) {

        // Defines all of the commands in one array
        let commands =  [...client.commands.values()].map(c => ({ ...c }))
        let slashCommands = []

        // This loop goes over every command and adds the options for the action commands. It also removes the bits of the files that would make Discord very confused and ultimately very unhappy
        for (const cmd of commands) {
            // If command is slash command (else ignore)
            if (!cmd.notSlash) {
                // Added the user options to the action commands
                if (cmd.module === "actions") {
                  cmd.options = [{ type: 6, name: "user1", description: cmd.slashDescrip}, { type: 6, name: "user2", description: cmd.slashDescrip}, { type: 6, name: "user3", description: cmd.slashDescrip}, { type: 6, name: "user4", description: cmd.slashDescrip}, { type: 6, name: "user5", description: cmd.slashDescrip}, { type: 6, name: "user6", description: cmd.slashDescrip}, { type: 6, name: "user7", description: cmd.slashDescrip}, { type: 6, name: "user8", description: cmd.slashDescrip}, { type: 6, name: "user9", description: cmd.slashDescrip}, { type: 6, name: "user10", description: cmd.slashDescrip}, { type: 6, name: "user11", description: cmd.slashDescrip}, { type: 6, name: "user12", description: cmd.slashDescrip}, { type: 6, name: "user13", description: cmd.slashDescrip}, { type: 6, name: "user14", description: cmd.slashDescrip}, { type: 6, name: "user15", description: cmd.slashDescrip}, { type: 6, name: "user16", description: cmd.slashDescrip}, { type: 6, name: "user17", description: cmd.slashDescrip}, { type: 6, name: "user18", description: cmd.slashDescrip}, { type: 6, name: "user19", description: cmd.slashDescrip}, { type: 6, name: "user20", description: cmd.slashDescrip}, { type: 6, name: "user21", description: cmd.slashDescrip}, { type: 6, name: "user22", description: cmd.slashDescrip}, { type: 6, name: "user23", description: cmd.slashDescrip}, { type: 6, name: "user24", description: cmd.slashDescrip}, { type: 6, name: "user25", description: cmd.slashDescrip},]  
                }
                delete cmd.execute
                delete cmd.module
                delete cmd.usage
                delete cmd.slashDescrip
                slashCommands.push(cmd)
            }
        }

        try {
            // Defines the where to send the commands to
            const rest = new REST({ version: '9' }).setToken(token.token);

            // If guildID
            if (settings.guildID) await rest.put(
                Routes.applicationGuildCommands(client.user.id, settings.guildID),
                { body: slashCommands },
            );
            // Else make commands global
            else await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: slashCommands },
            );
        // Catch any errors if Discord is unhappy
        } catch (error) {
            log.err("Error attempting to send slash data", error)
        }
    }
})



// The message event! Check to see if the bot is in slash mode or not.
client.on('messageCreate', async msg => { 
    if (!settings.slash) return await fox.messages(msg, client);
    return;
})


// The interaction event! 
client.on('interactionCreate', async i => { 
    if (settings.slash && i.isCommand()) return await fox.slash(i, client);
    return;
})



// This is how we log into Discord
client.login(token.token)

// Allows the client to be accessed as a module (used a lot in the snip file)
module.exports = client