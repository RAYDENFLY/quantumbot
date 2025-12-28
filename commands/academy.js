import { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('academy')
    .setDescription('Submit academy content for review'),
  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId('academy_modal')
      .setTitle('Submit Academy Content');

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

    const ratingsInput = new TextInputBuilder()
      .setCustomId('ratings')
      .setLabel('Ratings (1-5)')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const firstActionRow = new ActionRowBuilder().addComponents(linkInput);
    const secondActionRow = new ActionRowBuilder().addComponents(authorInput);
    const thirdActionRow = new ActionRowBuilder().addComponents(deskripsiInput);
    const fourthActionRow = new ActionRowBuilder().addComponents(ratingsInput);

    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);

    await interaction.showModal(modal);
  },
};