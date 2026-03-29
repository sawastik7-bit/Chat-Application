import React from "react";

const Join = ({ username, setUsername, room, setRoom, joinRoom }) => {
  return (
    <div className="join-root">
      <div className="join-header">
        <span className="badge badge-soft">Step 1</span>
        <h2>Join a room</h2>
        <p>Pick a handle and a room id. Share the room with a friend.</p>
      </div>

      <div className="join-form">
        <input
          className="field"
          type="text"
          placeholder="Your handle"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="field"
          type="text"
          placeholder="Room id (e.g. dev-lounge)"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />

        <button className="primary-btn" onClick={joinRoom}>
          Enter chat
        </button>

        <p className="hint-text">
          Tip: open this page in another tab with the same room id.
        </p>
      </div>
    </div>
  );
};

export default Join;