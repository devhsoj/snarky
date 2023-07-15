import { config as loadEnv } from 'dotenv';

loadEnv();

const config = {
    bot: {
        name: process.env.BOT_NAME ?? 'Snarky',
        sentimentThreshold: process.env.BOT_SENTIMENT_THRESHOLD ? parseInt(process.env.BOT_SENTIMENT_THRESHOLD) : -10,
        // Prohibits tokenizing huge messages so usage costs don't go crazy high for a high volume of messages
        maxMessageLength: process.env.BOT_MAX_MESSAGE_LENGTH ? parseInt(process.env.BOT_MAX_MESSAGE_LENGTH) : 256
    },
    discord: {
        client: {
            id: process.env.DISCORD_CLIENT_ID!,
            secret: process.env.DISCORD_CLIENT_SECRET!,
            token: process.env.DISCORD_CLIENT_TOKEN!,
        }
    },
    openai: {
        key: process.env.OPENAI_API_KEY!,
        usage: {
            cost: 0,
            // The currency amount (in USD) to stop generating GPT responses (HIGHLY SUGGEST YOU USE THE OPENAI SOFT/HARD LIMITS ON TOP OF THIS)
            limit: process.env.OPENAI_COST_LIMIT_USD ? parseFloat(process.env.OPENAI_COST_LIMIT_USD) : 5
        }
    }
};

export default config;