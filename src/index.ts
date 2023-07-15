import { Client, GatewayDispatchEvents, GatewayIntentBits } from '@discordjs/core';
import { generateUsageCost, getSnarkyGPTResponse } from './lib/openai';
import { formatSmallCurrency } from './lib/format';
import { WebSocketManager } from '@discordjs/ws';
import { REST } from '@discordjs/rest';
import Sentiment from 'sentiment';
import config from './config';

(async () => {
    // Sentiment Initialization

    const sentiment = new Sentiment();

    // Discord Client Initialization

    const rest = new REST({ version: '10' }).setToken(config.discord.client.token);

    const gateway = new WebSocketManager({
        token: config.discord.client.token,
        intents: GatewayIntentBits.Guilds | GatewayIntentBits.GuildMessages | GatewayIntentBits.MessageContent,
        rest
    });

    const client = new Client({ rest, gateway });

    // Discord Hooks

    process.on('exit', async () => (await gateway.destroy()));

    client.once(GatewayDispatchEvents.Ready, () => console.log('[+] snarky bot connected!'));

    client.on(GatewayDispatchEvents.MessageCreate, async ({ data, api }) => {
        const { score } = sentiment.analyze(data.content);

        if (
            data.author.bot
            || score > config.bot.sentimentThreshold
            || data.content.length > config.bot.maxMessageLength
            || config.openai.usage.cost >= config.openai.usage.limit
        ) return;

        const response = await getSnarkyGPTResponse(data.content);

        if (response.choices.length === 0) {
            return;
        }

        const cost = generateUsageCost(response.usage);
        const { content } = response.choices[0].message;

        config.openai.usage.cost += cost;

        // Faster then console.log for lots of messages
        process.stdout.write(`OpenAI (GPT-3.5) Usage Cost: ${formatSmallCurrency(config.openai.usage.cost)} - +${formatSmallCurrency(cost)}\n`);

        await api.channels.createMessage(data.channel_id, {
            content
        });
    });

    await gateway.connect();
})();