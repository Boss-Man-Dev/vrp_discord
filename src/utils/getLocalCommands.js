const path = require('path');
const getAllFiles = require('./getAllFiles')

module.exports = (exceptions = []) => {
  let localCommands = []

  const commandCategories = getAllFiles(
    path.join(__dirname, '..', 'commands'),
    true
  )

  for (const commandCategory of commandCategories) {
    const commandFIles = getAllFiles(commandCategory)

    for (const commandFIle of commandFIles) {
      const commandObject = require(commandFIle);

      if (exceptions.includes(commandObject.name)) {
        continue;
      }
      
      localCommands.push(commandObject);
    }
  }

  return localCommands;
}