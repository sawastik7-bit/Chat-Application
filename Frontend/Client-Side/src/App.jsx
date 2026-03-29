import { useState } from "react";
import { io } from "socket.io-client";
import Join from "./compoenents/Join";
import Chat from "./compoenents/Chat";
import "./App.css";

const socket = io("http://localhost:5000", { autoConnect: true });

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (!username.trim() || !room.trim()) return;
    socket.emit("join_room", room);
    setShowChat(true);
  };

  return (
    <div className="hero-root">
      <div className="hero-grid">
        {/* Left: brand / marketing copy */}
        <section className="hero-copy">
          <span className="badge">Realtime · Socket.IO · React</span>
          <h1>
            Build chats
            <br />
            that feel <span className="accent">alive.</span>
          </h1>
          <p>
            OrangeWire is your playground chat client. Join a room, open two
            tabs, and watch messages bounce in real‑time.
          </p>
          <ul className="hero-bullets">
            <li>Multi‑room messaging.</li>
            <li>Glassmorphism bento layout.</li>
            <li>Blazing fast Node backend.</li>
          </ul>
        </section>

        {/* Right: join/chat card */}
        <section className="hero-card">
          {!showChat ? (
            <Join
              username={username}
              setUsername={setUsername}
              room={room}
              setRoom={setRoom}
              joinRoom={joinRoom}
            />
          ) : (
            <Chat socket={socket} username={username} room={room} />
          )}
        </section>
      </div>
    </div>
  );
}

export default App;