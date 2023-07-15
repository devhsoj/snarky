# snarky

snarky is a sarcastic GPT powered auto-response bot for Discord.

## Installation

**Requirements:**  [node 18/npm](https://nodejs.org/en/download)

```bash
git clone https://github.com/devhsoj/snarky.git
cd snarky/
npm i
tsc
```

## Setup

Your .env (or environment) should look something like this:

```text
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxx
DISCORD_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxx
DISCORD_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxx
DISCORD_CLIENT_TOKEN=xxxxxxxxxxxxxxxxxxxxxx
```

More config options and how to use them in your environment can be found in `src/config.ts`

## Running

```
# in the snarky/ directory (after compiling with tsc)
node dist/index.js
```