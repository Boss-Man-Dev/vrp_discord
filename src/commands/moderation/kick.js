const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js")
const permissionCheck = require("../../utils/permissionCheck");

module.exports = {
  callback: async (client, interaction) => {
    const targetUserId = interaction.options.get('target-user').value;
    const reason = interaction.options.get('reason')?.value || "No reason provided";

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(targetUserId);

    const permissionGranted = await permissionCheck.checkPermission(interaction, targetUser);
    if (!permissionGranted) {
      return;
    }

    // ban the target user
    try {
      await targetUser.kick(reason);
      await interaction.editReply(
        `User ${targetUser} was kicked\nReason: ${reason}`
      );
    } catch (error) {
      console.log(`there was an error when kicking: ${error}`);
    }
  },

  name: 'kick',
  description: 'Kicks a member form this server',

  options: [
    {
      name:'target-user',
      description: 'The user you want to Kick.',
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name:'reason',
      description: 'The reason you want to Kick.',
      type: ApplicationCommandOptionType.String,
    }
  ],
  permissionsRequired: [PermissionFlagsBits.KickMembers],
  botPermissions: [PermissionFlagsBits.KickMembers],
}