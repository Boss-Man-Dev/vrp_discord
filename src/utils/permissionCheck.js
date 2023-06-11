const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  checkPermission: async function (interaction, targetUser) {
    if (!targetUser) {
      await interaction.editReply("That user doesn't exist in this server");
      return false;
    }

    if (targetUser.id === interaction.guild.ownerId) {
      await interaction.editReply("You can't perform this action on the server owner.");
      return false;
    }

    const targetUserRolePosition = targetUser.roles.highest.position;
    const requestUserRolePosition = interaction.member.roles.highest.position;
    const botRolePosition = interaction.guild.members.me.roles.highest.position;

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply("You can't perform this action on a user who has the same or higher role than you.");
      return false;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply("I can't perform this action on a user who has the same or higher role than me.");
      return false;
    }

    return true;
  },
};
