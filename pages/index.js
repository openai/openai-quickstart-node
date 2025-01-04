import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container whenever messages changes
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const clearChat = () => {
    setMessages([]);
    setError('');
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            ...messages,
            { role: 'user', content: messageInput }
          ]
        })
      });

      // Add user message immediately
      setMessages(prev => [...prev, { role: 'user', content: messageInput }]);
      setMessageInput('');

      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                assistantMessage += data.content;
                setMessages(prev => {
                  const lastMessage = prev[prev.length - 1];
                  if (lastMessage?.role === 'assistant') {
                    return [...prev.slice(0, -1), { role: 'assistant', content: assistantMessage }];
                  }
                  return [...prev, { role: 'assistant', content: assistantMessage }];
                });
              }
              if (data.error) {
                throw new Error(data.error);
              }
              if (data.done) {
                // Stream is complete
                break;
              }
            } catch (parseError) {
              console.error('Parse error:', parseError);
              continue; // Skip invalid JSON lines
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>OpenAI Chat</title>
      </Head>
      <h1 className={styles.heading1}>OpenAI Chat Completion Quickstart</h1>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <div className={styles.chatContainer} ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.role === "user" ? styles.userMessage : styles.assistantMessage
            }
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className={styles.messageInputContainer}>
        <form onSubmit={onSubmit}>
          <textarea
            className={styles.textarea}
            name="message"
            placeholder="Type your message here..."
            required
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            disabled={isLoading}
          ></textarea>
          <div className={styles.buttonGroup}>
            <input className={styles.inputSubmit} type="submit" value={isLoading ? 'Sending...' : 'Send'} disabled={isLoading || !messageInput.trim()} />
            <button
              className={styles.inputButton}
              type="button"
              onClick={clearChat}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
