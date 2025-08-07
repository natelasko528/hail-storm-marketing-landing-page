
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { sendMessage, startChat, sendConversationSummary } from '../services/geminiService';
import type { Chat } from '@google/genai';
import { ChatIcon, CloseIcon, SendIcon, UserIcon, BotIcon } from './Icons';
import type { Message } from '../types';
import { CALENDAR_LINK } from '../constants';

// Helper function to find and convert links in text to clickable anchors
const linkify = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  // Using a regex with a capturing group will include the delimiter in the result array
  const parts = text.split(urlRegex);
  return (
    <>
      {parts.map((part, i) =>
        urlRegex.test(part) ? (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-500 hover:underline"
          >
            {part}
          </a>
        ) : (
          part
        )
      )}
    </>
  );
};


const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [summarySent, setSummarySent] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [hasBeenAutoOpened, setHasBeenAutoOpened] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen && !hasBeenAutoOpened) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasBeenAutoOpened(true);
      }, 3000); // 3-second delay
      return () => clearTimeout(timer);
    }
  }, [isOpen, hasBeenAutoOpened]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeChat = useCallback(async () => {
    try {
      setIsLoading(true);
      setSuggestions([]);
      chatRef.current = await startChat();
      // The initial message and suggestions will come from the AI.
      // We send an empty message to trigger the initial response.
      const initialStream = await sendMessage(chatRef.current, "Start conversation");

      let fullResponse = '';
      for await (const chunk of initialStream) {
        fullResponse += chunk.text;
      }
      
      let finalBotText = fullResponse;
      const lines = fullResponse.split('\n');
      const lastLine = lines[lines.length - 1];

      if (lastLine.startsWith('[SUGGESTIONS]')) {
        const suggestionsString = lastLine.replace('[SUGGESTIONS]', '').trim();
        setSuggestions(suggestionsString.split(' | ').map(s => s.trim().replace(/^"|"$/g, '')));
        finalBotText = lines.slice(0, -1).join('\n').trim();
      }

      setMessages([{ role: 'model', text: finalBotText }]);
      setSummarySent(false); // Reset summary status for new chat
    } catch (error) {
      console.error("Failed to initialize chat:", error);
      setMessages([
        {
          role: 'model',
          text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
        setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen && !chatRef.current) {
      initializeChat();
    }
  }, [isOpen, initializeChat]);

  const handleSend = async (messageOverride?: string) => {
    const textToSend = messageOverride || input;
    if (textToSend.trim() === '' || isLoading || !chatRef.current) return;

    setSuggestions([]);
    const userMessage: Message = { role: 'user', text: textToSend };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setInput('');
    setIsLoading(true);

    let fullResponse = '';
    // Add a placeholder for the bot's response
    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    try {
      const stream = await sendMessage(chatRef.current, textToSend);
      for await (const chunk of stream) {
        fullResponse += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = fullResponse;
          return newMessages;
        });
      }
      
      let finalBotText = fullResponse;
      let newSuggestions: string[] = [];

      const lines = fullResponse.split('\n');
      const lastLine = lines[lines.length - 1];

      if (lastLine.startsWith('[SUGGESTIONS]')) {
        const suggestionsString = lastLine.replace('[SUGGESTIONS]', '').trim();
        newSuggestions = suggestionsString.split(' | ').map(s => s.trim().replace(/^"|"$/g, ''));
        finalBotText = lines.slice(0, -1).join('\n').trim();
      }

      setSuggestions(newSuggestions);
      
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].text = finalBotText;
        return newMessages;
      });


      // After response is complete, check if we should send summary
      if (finalBotText.includes(CALENDAR_LINK) && !summarySent) {
          const finalMessages: Message[] = [...currentMessages, { role: 'model', text: finalBotText }];
          await sendConversationSummary(finalMessages);
          setSummarySent(true);
      }

    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].text = "I apologize, but I encountered an error. Please try asking your question again.";
        return newMessages;
      });
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };


  return (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-sky-700 text-white rounded-full p-5 shadow-lg hover:bg-sky-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          aria-label={isOpen ? 'Close Chat' : 'Open Chat'}
        >
          {isOpen ? <CloseIcon className="h-10 w-10" /> : <ChatIcon className="h-10 w-10" />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-5 w-[calc(100%-40px)] sm:w-96 h-[70vh] max-h-[700px] bg-white rounded-lg shadow-2xl flex flex-col z-50 animate-fade-in-up">
          <header className="bg-black text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">C&E Wurzer Assistant</h3>
          </header>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
            {messages.length === 0 && isLoading ? (
                <div className="flex justify-center items-center h-full">
                    <div className="h-4 w-4 bg-sky-600 rounded-full animate-pulse"></div>
                </div>
            ) : messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 my-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'model' && <BotIcon className="h-8 w-8 text-sky-700 flex-shrink-0" />}
                <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-sky-600 text-white' : 'bg-white text-gray-800 shadow-sm'}`}>
                  <p className="text-sm break-words">{linkify(msg.text)}</p>
                   {isLoading && msg.role === 'model' && index === messages.length - 1 && msg.text.length === 0 && <div className="h-2 w-2 bg-sky-600 rounded-full animate-pulse ml-1 inline-block"></div>}
                </div>
                 {msg.role === 'user' && <UserIcon className="h-8 w-8 text-gray-500 flex-shrink-0" />}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <footer className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
             {suggestions.length > 0 && !isLoading && (
              <div className="mb-3 flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(s)}
                    className="px-3 py-1.5 text-sm text-sky-700 bg-sky-100 rounded-full hover:bg-sky-200 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-300"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div className="flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask a question..."
                className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-gray-900"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="bg-sky-700 text-white p-2 rounded-r-md disabled:bg-gray-400 hover:bg-sky-800 transition-colors"
                aria-label="Send Message"
              >
                <SendIcon className="h-6 w-6" />
              </button>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default Chatbot;
