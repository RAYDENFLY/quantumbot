import 'dotenv/config';
import { Client, GatewayIntentBits, Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Express server for API
const app = express();
app.use(cors({
  origin: ['https://quantumterminal.vercel.app', 'http://localhost:3000', 'http://localhost:8780'],
  credentials: true
}));
app.use(express.json());

// Import API handlers
import signalsHandler from './api/signals.js';
import researchHandler from './api/research.js';
import learningHandler from './api/learning.js';
import academyHandler from './api/academy.js';
import docsHandler from './api/docs.js';

app.get('/api/signals', signalsHandler);
app.post('/api/signals', signalsHandler);
app.patch('/api/signals', signalsHandler);

app.get('/api/research', researchHandler);
app.post('/api/research', researchHandler);

app.get('/api/learning', learningHandler);
app.post('/api/learning', learningHandler);

app.get('/api/academy', academyHandler);
app.post('/api/academy', academyHandler);

app.get('/api/docs', docsHandler);

// Ping endpoint for uptime monitoring
app.get('/ping', (req, res) => {
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 8780;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});

// Load commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = await import(pathToFileURL(filePath).href);
  if ('data' in command.default && 'execute' in command.default) {
    client.commands.set(command.default.data.name, command.default);
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

// Load events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = await import(pathToFileURL(filePath).href);
  if (event.default.once) {
    client.once(event.default.name, (...args) => event.default.execute(...args));
  } else {
    client.on(event.default.name, (...args) => event.default.execute(...args));
  }
}

client.login(process.env.DISCORD_TOKEN);