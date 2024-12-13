const log = require('dbot-console-logger');
const settings = require('./config/settings.js');

if (!settings.database) return

const url = process.env.RETHINKDB_URL || settings.databaseUrl
if (!url || !url.match(/^\/\/.+:[0-9]{1,5}$/)) {
    log.warn("Invalid database url found (format: `//host:port`)")
}

// Start the database and make sure its setup ready to go
const database = require('rethinkdbdash')({ 
    // This stops rethink from sending a message every single time it connects
    silent: true,
    // Defines the default database to look at
    db: "FurBot",
    // Where to find rethinkdb
    host: url.split('//')[1]?.split(':')[0],
    port: Number(url.split(':')[1]),
});


databaseChecker()


// This function makes sure the database is setup correctly upon startup 
async function databaseChecker () {

    // Define the database
    let dbs = await database.dbList().run()

    // If there is no database create it
    if (!dbs.includes("FurBot")) {

        log.warn("No database found, creating database...")

        try {
            await database.dbCreate("FurBot").run()
            await database.db("FurBot").tableCreate('users').run()

            log.info("Database was successfully created!")

        } catch (err) {
            log.err("Database creation failed!")
        }
    }

}

module.exports = database
