# Quantum Trading Bot

A Discord bot for trading signals with API backend.

## Setup

1. Clone the repo
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in your values
4. Run `node deploy.js` to register slash commands
5. Start the bot: `npm start`

## Environment Variables

- `DISCORD_TOKEN`: Your Discord bot token
- `MONGODB_URI`: MongoDB connection string
- `GUILD_ID`: Your Discord server ID
- `CLIENT_ID`: Your bot's client ID
- `API_BASE_URL`: Base URL for the API (localhost for dev, Vercel URL for prod)

## Deploy to Vercel

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

## API Documentation

Swagger docs available at `/api/docs` when API is running.