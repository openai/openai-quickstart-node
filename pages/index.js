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
    // This will scroll the chat container to the bottom every time chatHistory changes
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  async function onSubmit(event) {
    event.preventDefault();
    if (!message.trim()) return;

    // Append user message to chat history
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { role: "user", content: message.trim() },
    ]);

    // Clear the message input
    setMessage("");

    // Send the user's message to the server
    const response = await fetch("/api/generate?endpoint=chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message.trim() }),
    });

    const data = await response.json();
    if (data.success) {
      // Open a connection to receive streamed responses
      const eventSource = new EventSource("/api/generate?endpoint=stream");
      eventSource.onmessage = function (event) {
        // Parse the event data, which is a JSON string
        const parsedData = JSON.parse(event.data);
        // Append assistant message to chat history
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          { role: "assistant", content: parsedData },
        ]);
      };
      eventSource.onerror = function () {
        eventSource.close();
      };
    }
  }

  function clearChat() {
    setChatHistory([
      { role: "system", content: "You are a helpful assistant." },
    ]);
    // Reset the chat history on the server
    fetch("/api/generate?endpoint=reset", { method: "POST" });
  }

  console.log(chatHistory);

  return (
    <div>
      <Head>
        <title>OpenAI Chat</title>
      </Head>
      <h1>OpenAI Chat Completion Quickstart</h1>
      <div className={styles.chatContainer} ref={chatContainerRef}>
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={
              message.role === "user"
                ? styles.userMessage
                : styles.assistantMessage
            }
          >
            {message.content}
          </div>
        ))}
      </div>
      <div className={styles.messageInputContainer}>
        <form onSubmit={onSubmit}>
          <textarea
            name="message"
            placeholder="Type your message here..."
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div className={styles.buttonGroup}>
            <input type="submit" value="Send" />
            <button type="button" onClick={clearChat}>
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
