import { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('signal')
    .setDescription('Submit a trading signal for review'),
  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId('signal_modal')
      .setTitle('Submit Trading Signal');

    const authorInput = new TextInputBuilder()
      .setCustomId('author')
      .setLabel('Author')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const convictionInput = new TextInputBuilder()
      .setCustomId('conviction')
      .setLabel('Conviction')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const reasonInput = new TextInputBuilder()
      .setCustomId('reason')
      .setLabel('Reason')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const slInput = new TextInputBuilder()
      .setCustomId('sl')
      .setLabel('Stop Loss')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const tp1Input = new TextInputBuilder()
      .setCustomId('tp1')
      .setLabel('Take Profit 1')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const tp2Input = new TextInputBuilder()
      .setCustomId('tp2')
      .setLabel('Take Profit 2 (optional)')
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

    const tp3Input = new TextInputBuilder()
      .setCustomId('tp3')
      .setLabel('Take Profit 3 (optional)')
      .setStyle(TextInputStyle.Short)
      .setRequired(false);

    const firstActionRow = new ActionRowBuilder().addComponents(authorInput);
    const secondActionRow = new ActionRowBuilder().addComponents(convictionInput);
    const thirdActionRow = new ActionRowBuilder().addComponents(reasonInput);
    const fourthActionRow = new ActionRowBuilder().addComponents(slInput);
    const fifthActionRow = new ActionRowBuilder().addComponents(tp1Input);
    const sixthActionRow = new ActionRowBuilder().addComponents(tp2Input);
    const seventhActionRow = new ActionRowBuilder().addComponents(tp3Input);

    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow, sixthActionRow, seventhActionRow);

    await interaction.showModal(modal);
  },
};