import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Tampilkan help'),
  async execute(interaction) {
    const helpText = `
🤖 Quantum Trading Bot - Help
Daftar command yang tersedia:

Created
📈 Trading Signals
/signal <author> <conviction> <reason> <sl> <tp1> [tp2] [tp3]
Buat signal trading untuk review
📚 Research
/research <link> <author>
Submit research untuk review
🎓 Learning
/learning <link> <author>
Submit materi pembelajaran
🎓 Academy
/academy <link> <author>
Submit server academy

📊 Signals
/signals
Lihat signals terbaru hanya yang masih running
📋 Status Check
/status <id> <type>
Cek status submission
🏓 Utility
/ping - Check bot status
/help - Tampilkan help
    `;
    const embed = {
      title: 'Quantum Trading Bot Help',
      description: helpText,
      color: 0x0099ff,
    };
    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};