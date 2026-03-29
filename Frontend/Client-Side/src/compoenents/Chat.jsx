import React, { useEffect, useRef, useState } from "react";

const Chat = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef(null);

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };
    socket.on("receive_message", handleReceiveMessage);
    return () => socket.off("receive_message", handleReceiveMessage);
  }, [socket]);

  useEffect(() => {
    if (!messagesRef.current) return;
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      room,
      author: username,
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    socket.emit("send_message", msgData);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chat-card">
      <header className="chat-header">
        <div>
          <p className="chat-label">Room</p>
          <h3>{room}</h3>
        </div>
        <div className="chat-header-right">
          <span className="pill pill-live">Live</span>
          <span className="chat-user">@{username}</span>
        </div>
      </header>

      <div className="chat-messages" ref={messagesRef}>
        {messages.map((m, i) => {
          const isMe = m.author === username;
          return (
            <div
              key={i}
              className={`chat-row ${isMe ? "chat-row-me" : "chat-row-other"}`}
            >
              <div className="chat-meta">
                <span className="chat-author">
                  {isMe ? "You" : m.author}
                </span>
                <span className="chat-time">{m.time}</span>
              </div>
              <div
                className={`chat-bubble ${
                  isMe ? "bubble-me" : "bubble-other"
                }`}
              >
                {m.text}
              </div>
            </div>
          );
        })}
      </div>

      <div className="chat-input-row">
        <input
          className="field chat-field"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send a message…"
        />
        <button className="primary-btn chat-send" onClick={sendMessage}>
          ➤
        </button>
      </div>
    </div>
  );
};

export default Chat;