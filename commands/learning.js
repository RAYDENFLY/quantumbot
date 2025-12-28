import { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('learning')
    .setDescription('Submit learning material for review'),
  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId('learning_modal')
      .setTitle('Submit Learning Material');

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

    const deskripsiInput = new TextInputBuilder()
      .setCustomId('deskripsi')
      .setLabel('Deskripsi')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const firstActionRow = new ActionRowBuilder().addComponents(linkInput);
    const secondActionRow = new ActionRowBuilder().addComponents(authorInput);
    const thirdActionRow = new ActionRowBuilder().addComponents(deskripsiInput);

    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

    await interaction.showModal(modal);
  },
};