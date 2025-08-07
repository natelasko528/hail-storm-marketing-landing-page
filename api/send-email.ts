import { GoogleGenAI } from '@google/genai';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { NATE_RECIPIENT_EMAIL } from '../constants';
import type { Message } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}
if (!process.env.GMAIL_EMAIL || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error("Gmail credentials are not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const summarizationInstruction = `You are a helpful assistant. Summarize the following chat conversation between a homeowner and a virtual assistant. The user's name is Nate. Extract the key information and format it as a clean, scannable, bullet-pointed list. 

The summary should be easy to read at a glance. Start with the homeowner's contact information, then provide a summary of their needs, and finish with the conversation outcome.

Here is the conversation:
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { chatHistory } = req.body as { chatHistory: Message[] };

  if (!chatHistory || chatHistory.length === 0) {
    return res.status(400).json({ error: 'Chat history is required.' });
  }

  try {
    // 1. Generate summary with Gemini
    const fullConversation = chatHistory.map(m => `${m.role === 'user' ? 'Homeowner' : 'Assistant'}: ${m.text}`).join('\n');
    const prompt = `${summarizationInstruction}\n${fullConversation}`;

    const summaryResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    const summaryText = summaryResponse.text;

    // 2. Send email with Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    // Extract subject info
    const homeownerName = chatHistory.find(m => m.role === 'user' && chatHistory[chatHistory.indexOf(m) + 1]?.text.toLowerCase().includes('what is the full address'))?.text || 'New Lead';

    await transporter.sendMail({
        from: `"C&E Bot" <${process.env.GMAIL_EMAIL}>`,
        to: NATE_RECIPIENT_EMAIL,
        subject: `New Lead Summary: ${homeownerName}`,
        html: `<p>A new potential client has been qualified by the website chatbot.</p>
               <h3>Conversation Summary:</h3>
               <pre style="font-family: sans-serif; white-space: pre-wrap; background-color: #f4f4f5; padding: 16px; border-radius: 8px;">${summaryText}</pre>
               <h3>Full Transcript:</h3>
               <pre style="font-family: sans-serif; white-space: pre-wrap;">${fullConversation}</pre>`,
    });

    res.status(200).json({ success: true, message: 'Summary sent successfully.' });
  } catch (error) {
    console.error('Error in send-email function:', error);
    res.status(500).json({ error: 'Failed to send summary email.' });
  }
}
