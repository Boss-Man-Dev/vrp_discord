const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");
const permissionCheck = require("../../utils/permissionCheck");

module.exports = {
  callback: async (client, interaction) => {
    const targetUser = interaction.options.get('target-user').value;
    const reason = interaction.options.get('reason')?.value || "No reason provided";

    await interaction.deferReply();

    const targetMember = await interaction.guild.members.fetch(targetUser);

    const permissionGranted = await permissionCheck.checkPermission(interaction, targetMember);
    if (!permissionGranted) {
      return;
    }

    // Ban the target user
    try {
      await targetMember.ban({ reason });
      await interaction.editReply(
        `User ${targetMember} was banned\nReason: ${reason}`
      );
    } catch (error) {
      console.log(`There was an error when banning: ${error}`);
      await interaction.editReply("An error occurred while attempting to ban the user.");
    }
  },

  name: 'ban',
  description: 'Bans a member!!!',

  options: [
    {
      name: 'target-user',
      description: 'The user to ban.',
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: 'reason',
      description: 'Reason for banning.',
      type: ApplicationCommandOptionType.String,
    }
  ],
  permissionsRequired: [PermissionFlagsBits.BanMembers],
  botPermissions: [PermissionFlagsBits.BanMembers],
};
