import Configuration from "openai";

export const configureOpenAI = () => {
    const config = new Configuration({
        apiKey: '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',
        organization: process.env.OPEN_AI_ORGID
    })
    return config;
}