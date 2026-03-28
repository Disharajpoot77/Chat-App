// import React from 'react'
// import axios from 'axios'
// import { useState, useEffect } from 'react'

// const UI = () => {


//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     async function fetchUsers() {
//       try {
//         const res = await axios.get("http://localhost:4000/users");
//         setUsers(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     }

//     fetchUsers();
//   }, []);



//   return (
// 	<div>
 
//     <div className="h-screen flex bg-gray-100">

//       {/* Sidebar */}
//      <div className="w-1/4 bg-white border-r">
//   <div className="p-4 font-bold text-xl border-b">
//     Chats
//   </div>

//   {users.map((user) => (
//     <div
//       key={user._id}
//       className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
//     >
//       <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
//         {user.userName}
//       </div>

//       <div>
//         <p className="font-semibold">{user.userName}</p>
//         <p className="text-sm text-gray-400">Start chat</p>
//       </div>
//     </div>
//   ))}
// </div>


//       {/* Main Chat Area */}
//       <div className="w-3/4 flex flex-col">

//         {/* Header */}
//         <div className="p-4 border-b bg-white font-semibold">
//           Select a chat
//         </div>

//         {/* Empty Chat Area */}
//         <div className="flex-1 flex items-center justify-center text-gray-400">
//           Start a conversation
//         </div>

//         {/* Input UI */}
//         <div className="p-4 border-t bg-white flex gap-2">
//           <input
//             type="text"
//             placeholder="Type a message..."
//             className="flex-1 px-4 py-2 border rounded-lg focus:outline-none"
//           />
//           <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
//             Send
//           </button>
//         </div>

//       </div>
//     </div>

		
// 	</div>
//   )
// }

// export default UI












import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSocket } from "./socket";
import "./chat.css";

export default function Chat() {
  const nav = useNavigate();
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const me = localStorage.getItem("me");
  useEffect(() => {
    fetch("http://localhost:3000/api/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data.filter((u) => u.username !== me));
        }
      });
  }, []);

  // socket
  useEffect(() => {
    const s = createSocket();
    setSocket(s);

    s.on("receive_private_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => s.disconnect();
  }, []);

  const send= () => {
     if (!message || !selectedUser) return;

    socket.emit("private_message", {
      to: selectedUser,
      message,
    });

    setChat((prev) => [...prev, { from: me, message }]);
    setMessage("");
  };

  const logout = () => {
    localStorage.clear();
    nav("/login");
  };

  return (
    <div className="chat-layout">

   
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>{me}</h3>
          <button onClick={logout}>Logout</button>
        </div>

        <div className="user-list">
          {users.map((u) => (
            <div
              key={u._id}
              className={`user ${u.username === selectedUser ? "active" : ""}`}
              onClick={() => {
                setSelectedUser(u.username);
                setChat([]);
              }}
            >
              <div className="avatar">
                {u.username.charAt(0).toUpperCase()}
              </div>
              <span>{u.username}</span>
            </div>
          ))}
        </div>
      </div>

   
      <div className="chat-window">
        <div className="chat-header">
          {selectedUser ? `Chat with ${selectedUser}` : "Select a user"}
        </div>

        <div className="messages">
          {chat.map((m, i) => (
            <div
              key={i}
              className={`msg ${m.from === me ? "me" : "other"}`}
            >
              {m.message}
            </div>
          ))}
        </div>

        {selectedUser && (
          <div className="input-area">
            <input
              value={message}
              placeholder="Type message..."
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button onClick={send}>Send</button>
          </div>
        )}
      </div>
    </div>
  );
}