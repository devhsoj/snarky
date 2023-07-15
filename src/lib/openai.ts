import { ChatCompletionErrorResponse, ChatCompletionResponse, ChatCompletionUsage } from '../types/openai';
import config from '../config';

export function generateUsageCost(usage: ChatCompletionUsage) {

    if (usage.prompt_tokens === 0 || usage.completion_tokens === 0) return 0;

    return ((usage.prompt_tokens / 1_000) * 0.0015) + ((usage.completion_tokens / 1_000) * 0.002);
}

export async function getSnarkyGPTResponse(input: string) {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + process.env.OPENAI_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: `You are a snarky and annoying friend named ${config.bot.name} that gives very sarcastic, disrespectful, and gaslighting responses (in textism format) to any comment.`
                },
                {
                    role: 'user',
                    content: input
                }
            ],
            max_tokens: 100
        })
    });


    if (res.status !== 200) {
        const error = await res.json() as ChatCompletionErrorResponse;

        throw error;
    }

    const data = await res.json() as ChatCompletionResponse;

    return data;
}