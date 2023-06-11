module.exports = {
  name: 'test',
  description: 'test a command!',

  callback: async (client, interaction) => {
    await interaction.deferReply()

    interaction.editReply(`testing! You have done a remote command`)
  },
}