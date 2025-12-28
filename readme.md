# 🤖 Quantum Trading Bot

A Discord bot for trading signals, research submissions, learning materials, and academy resources with API backend. Built for trading communities to manage signals, review submissions, and track performance.

## Features

- **Trading Signals**: Submit and manage trading signals with conviction, SL/TP levels, and ROI tracking.
- **Research & Learning**: Submit research links and learning materials for community review.
- **Academy**: Share academy resources with ratings.
- **Admin Tools**: Approve/reject submissions, confirm exits (SL/TP), and monitor positions.
- **API Backend**: RESTful API with Swagger documentation for data management.
- **Database**: MongoDB integration for persistent storage.
- **Discord Integration**: Slash commands, message commands, modals, and role-based permissions.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/quantumbot.git
   cd quantumbot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables: Copy `.env.example` to `.env` and fill in your values:
   - `DISCORD_TOKEN`: Your Discord bot token
   - `MONGODB_URI`: MongoDB connection string
   - `GUILD_ID`: Your Discord server ID
   - `CLIENT_ID`: Your bot's client ID
   - `API_BASE_URL`: Base URL for the API (localhost for dev, Vercel URL for prod)

4. Register slash commands:
   ```bash
   node deploy.js
   ```

5. Start the bot:
   ```bash
   npm start
   ```

## Usage

### Commands

#### Created (User Submissions)
- **Trading Signals**: `q!signal <author> <conviction> <reason> <sl> <tp1> [tp2] [tp3]`  
  Submit a trading signal for review. Bot sends to review channel and tags admin roles.
- **Research**: `q!research <link> <author>`  
  Submit research for review.
- **Learning**: `q!learning <link> <author> <deskripsi>`  
  Submit learning material with description.
- **Academy**: `q!academy <link> <author> <deskripsi> <ratings>`  
  Submit academy resource with description and ratings (1-5).

*Note: Submissions go to review channel for approval before entering database. Admins approve/decline with buttons.*

#### Public Commands
- **Signals**: `q!signals`  
  View running signals (not hit SL or TP3).
- **Status Check**: `q!status <id> <type>`  
  Check status of submission (signal/research/learning/academy).

#### Admin Only (Roles: 1371341008838721587, 1383313862455201842, 1448289932006264982, 1383312723823169546)
- **Exit Confirmation**:  
  - `q!sl <signal_id> <roi>` - Confirm SL hit  
  - `q!tp1 <signal_id> <roi>` - Confirm TP1 hit  
  - `q!tp2 <signal_id> <roi>` - Confirm TP2 hit  
  - `q!tp3 <signal_id> <roi>` - Confirm TP3 hit
- **Signal List**: `q!signallist`  
  Paginated list of all signals with SL/TP/ROI and dates.
- **Position Monitor**: `q!monitor`  
  Monitor trading positions for TP/SL alerts.

#### Utility
- `q!ping` - Check bot status
- `q!help` - Show help

### API

The bot includes a REST API for data management. Access Swagger docs at `/api/docs` when running.

Endpoints:
- `GET/POST/DELETE /api/signals` - Manage signals
- `GET/POST/DELETE /api/research` - Manage research
- `GET/POST/DELETE /api/learning` - Manage learning
- `GET/POST/DELETE /api/academy` - Manage academy

## Deploy to Vercel

1. Push to GitHub.
2. Connect to Vercel.
3. Set environment variables in Vercel dashboard.
4. Deploy.

## Contributing

Contributions are welcome! Please fork the repo and submit a pull request.

## License

This project is open source under the MIT License.
