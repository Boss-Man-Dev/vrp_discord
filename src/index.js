const { Client, IntentsBitField } = require("discord.js");
const path = require('path');
const resourcePath = global.GetResourcePath ? global.GetResourcePath(global.GetCurrentResourceName()) : global.__dirname;
const normalizedPath = path.normalize(resourcePath); // Normalize the file path

require('dotenv').config({ path: path.join(normalizedPath, '.env') })
const { updatePlayerCount } = require(path.join(normalizedPath,'src/misc', 'fivem.js'));
const { MongoDB, oxmysql } = require(path.join(normalizedPath,'src/utils', 'connectDatabase.js'));
const { mysql } = require(path.join(normalizedPath, 'config.json'));
const eventHandler = require(path.join(normalizedPath, 'src/handlers', 'eventHandler.js'));

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

(async () => {
  try {
    if (mysql) {
      await oxmysql();
    } else {
      await MongoDB();
    }

    eventHandler(client);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();

client.on('ready', () => {
  updatePlayerCount(client, 5)
  //this will update the bot's activity every 5 seconds
});

client.login(process.env.TOKEN);