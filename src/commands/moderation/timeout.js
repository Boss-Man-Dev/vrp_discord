const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
const permissionCheck = require("../../utils/permissionCheck");
const ms = require('ms');

module.exports = {
  callback: async (client, interaction) => {
    const targetUser = interaction.options.get('target-user').value;
    const duration = interaction.options.get('duration').value;
    const reason = interaction.options.get('reason')?.value || "No reason provided";

    await interaction.deferReply();

    const targetMember = await interaction.guild.members.fetch(targetUser);

    const permissionGranted = await permissionCheck.checkPermission(interaction, targetMember);
    if (!permissionGranted) {
      return;
    }

    const msDuration = ms(duration);
    if (isNaN(msDuration)) {
      await interaction.editReply("Please provide a valid timeout duration.");
      return;
    }

    if (msDuration < 5000 || msDuration > 2.419e9) {
      await interaction.editReply("Timeout duration cannot be less than 5 seconds or more than 28 days.");
      return;
    }

    // Timeout the user
    try {
      const { default: prettyMs } = await import('pretty-ms');

      await targetMember.timeout(msDuration, reason);
      const formattedDuration = prettyMs(msDuration, { verbose: true });

      let replyMessage = `${targetMember} was timed out for ${formattedDuration}.\n`;
      replyMessage += `Reason: ${reason}`;

      await interaction.editReply(replyMessage);
    } catch (error) {
      console.log(`There was an error when timing out: ${error}`);
      await interaction.editReply("An error occurred while attempting to timeout the user.");
    }
  },

  name: 'timeout',
  description: 'Timeout a user.',
  options: [
    {
      name: 'target-user',
      description: 'The user you want to timeout.',
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: 'duration',
      description: 'Timeout duration (e.g., 30m, 1h, 1d).',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'reason',
      description: 'The reason for the timeout.',
      type: ApplicationCommandOptionType.String,
    }
  ],
  permissionsRequired: [PermissionFlagsBits.MuteMembers],
  botPermissions: [PermissionFlagsBits.MuteMembers],
};
