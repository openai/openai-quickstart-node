import OpenAI from "openai";
import { NextResponse } from 'next/server';

const MODEL = "nfa-llama2";
const openai = new OpenAI({
  apiKey:"sk-",
  baseURL: process.env.OPENAI_API_URL || 'http://34.127.54.11:8080/v1'
});

export const config = {
  api: {
    responseLimit: false,
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;
  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages must be an array' });
  }

  try {
    // Enable streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = await openai.chat.completions.create({
      model: MODEL,
      messages,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    // Send done signal as proper JSON
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
  } catch (error) {
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
  } finally {
    res.end();
  }
}
