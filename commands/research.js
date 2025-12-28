import { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('research')
    .setDescription('Submit research for review'),
  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId('research_modal')
      .setTitle('Submit Research');

    const linkInput = new TextInputBuilder()
      .setCustomId('link')
      .setLabel('Link')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const authorInput = new TextInputBuilder()
      .setCustomId('author')
      .setLabel('Author')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const firstActionRow = new ActionRowBuilder().addComponents(linkInput);
    const secondActionRow = new ActionRowBuilder().addComponents(authorInput);

    modal.addComponents(firstActionRow, secondActionRow);

    await interaction.showModal(modal);
  },
};