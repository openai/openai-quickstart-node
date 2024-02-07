import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "system", content: "You are a helpful assistant." },
  ]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container whenever chatHistory changes
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const sendMessage = async (message) => {
    // Append user message to chat history
    setChatHistory((prev) => [...prev, { role: "user", content: message }]);

    // Send the user's message to the server
    const response = await fetch("/api/generate?endpoint=chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    if (data.success) {
      // Open a connection to receive streamed responses
      const eventSource = new EventSource("/api/generate?endpoint=stream");
      eventSource.onmessage = function (event) {
        // Parse the event data, which is a JSON string
        const parsedData = JSON.parse(event.data);

        // Check if the last message in the chat history is from the assistant
        setChatHistory((prevChatHistory) => {
          const newChatHistory = [...prevChatHistory];
          if (
            newChatHistory.length > 0 &&
            newChatHistory[newChatHistory.length - 1].role === "assistant"
          ) {
            // If so, append the new chunk to the existing assistant message content
            newChatHistory[newChatHistory.length - 1].content += parsedData;
          } else {
            // Otherwise, add a new assistant message to the chat history
            newChatHistory.push({ role: "assistant", content: parsedData });
          }
          return newChatHistory;
        });
      };
      eventSource.onerror = function () {
        eventSource.close();
      };
    }
  };

  const clearChat = async () => {
    // Clear the chat history in the client state
    setChatHistory([
      { role: "system", content: "You are a helpful assistant." },
    ]);

    // Reset the chat history on the server
    await fetch("/api/generate?endpoint=reset", { method: "POST" });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!message.trim()) return;
    sendMessage(message.trim());
    setMessage("");
  };

  return (
    <div>
      <Head>
        <title>OpenAI Chat</title>
      </Head>
      <h1 className={styles.heading1}>OpenAI Chat Completion Quickstart</h1>
      <div className={styles.chatContainer} ref={chatContainerRef}>
        {chatHistory.map((msg, index) => (
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div className={styles.buttonGroup}>
            <input className={styles.inputSubmit} type="submit" value="Send" />
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
