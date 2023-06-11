const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

module.exports = {
  updatePlayerCount: (client, seconds) => {
      const interval = setInterval(function setStatus() {
          status = `${GetNumPlayerIndices()} player(s)`
          //console.log(status)
          //client.user.setActivity(status, {type: 'WATCHING'})
          client.user.setPresence({
            activities: [{ name: `${status}`, type: ActivityType.Watching }]
          });
          return setStatus;
      }(), seconds * 1000)
  }
};