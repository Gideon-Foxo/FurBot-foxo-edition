<h1 align="center">FurBot Foxo edition</h1>

FurBot foxo edition is a remake of [FurBot](https://github.com/PhunStyle/FurBot) one of the oldest and largest Discord furry bots that was shut down on 23-05-2022. This remake of FurBot is built using [Discord.js](https://discord.js.org/#/) v14 and supports many new features to Discord such as slash commands or buttons but can also be operated using old text based commands. As time goes on more commands will be ported over, view [FurBots roadmap](https://github.com/users/Gideon-Foxo/projects/1) for more information. [Click here](https://github.com/Gideon-Foxo/FurBot-foxo-edition/tree/main/src/commands) to view what commands have been ported over.

<h1 align="center">Furboi; a public instance</h1>

Invite FurBoi, the public instance of this bot [here](https://discord.com/api/oauth2/authorize?client_id=990695577547333734&permissions=346176&scope=bot+applications.commands). This uses Discord slash commands as there simply is no way to get Discords [message intent](https://support-dev.discord.com/hc/en-us/articles/4404772028055-Message-Content-Privileged-Intent-FAQ) to use text commands at a public scale. If you would like to use text commands please host your own instance, read below for more. [Click here](https://discord.bots.gg/bots/990695577547333734) if you would like more information about FurBoi.

<h1 align="center">Self hosting</h1>

1. Install [node](https://nodejs.org/en/) v16.9.0 or higher.

2. [Download the latest release of this project](https://github.com/Gideon-Foxo/FurBot-foxo-edition/releases)

3. Install and run [Rethink database](https://github.com/rethinkdb/rethinkdb/releases) 2.4.0 or higher. If you do not wish to run FurBot with a database set database to `false` in the [settings](https://github.com/Gideon-Foxo/FurBot-foxo-edition/blob/main/src/config/settings.js) folder (src -> config -> settings.js)

3. CD over to this project on your system and run `npm i`.

4. Input your bot token into [tokens.json](https://github.com/Gideon-Foxo/FurBot-foxo-edition/blob/main/src/config/tokens.json) (src -> config -> tokens.json)

5. CD over to the src folder and run `node index.js` to lunch the bot. It is highly recommended you use a program such as [pm2](https://www.npmjs.com/package/pm2) to run this app.


<h1 align="center">Contact/Support/Feedback</h1>

If you need help with FurBoi, the public instance please join and ask our [Discord server](https://discord.gg/HyMnSbs53P).

If you run into any bugs or issues please [create a new issue](https://github.com/Gideon-Foxo/FurBot-foxo-edition/issues/new).
