export type ChatCompletionUsage = {
    prompt_tokens: number,
    completion_tokens: number,
    total_tokens: number
}

export type ChatCompletionChoice = {
    index: number,
    message: {
        role: string,
        content: string
    },
    finish_reason: string
}

export type ChatCompletionResponse = {
    id: string,
    object: string,
    created: number,
    model: string,
    choices: ChatCompletionChoice[],
    usage: ChatCompletionUsage
}

export type ChatCompletionErrorResponse = {
    error: {
        message: string,
        type: string,
        param: string | null,
        code: string
    }
}