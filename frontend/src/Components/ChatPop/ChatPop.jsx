import React, { useEffect, useRef, useState } from 'react';
import './ChatPop.css';
import { useSocket } from '../../Context/SocketContext';
import { useUser } from '../../Context/UserContext';
import axios from 'axios';

const ChatPop = ({ recipient, onClose }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const socket = useSocket();
  const { user } = useUser();
  const messagesEndRef = useRef(null);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  // Join personal socket room
  useEffect(() => {
    if (user?._id && socket.current) {
      
      socket.current.emit('join-room', user._id);
    }
  }, [user, socket]);

  // Fetch chat history
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/messages/${user._id}/${recipient._id}`);
        setChat(
          res.data.map((m) => ({
            ...m,
            fromMe: m.senderId === user._id,
          }))
        );
      } catch (err) {
        console.error('Failed to load messages', err);
      }
    };

    if (user && recipient?._id) {
      fetchMessages();
    }
  }, [user, recipient]);

  // Handle receiving new messages
  useEffect(() => {
    if (!socket.current) return;

    const handleReceive = (data) => {
      // Only process messages from the current chat recipient
      if (data.senderId === recipient._id) {
        setChat((prev) => [...prev, { ...data, fromMe: false }]);
      }
    };

    socket.current.on('receive-message', handleReceive);
    
    return () => {
      socket.current.off('receive-message', handleReceive);
    };
  }, [socket, recipient._id]);

  // Send message
  const sendMessage = async () => {
    if (!user?._id || !recipient?._id || !message.trim()) return;

    const msgData = {
      senderId: user._id,
      receiverId: recipient._id,
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    try {
      // Add to local chat immediately for better UX
      setChat((prev) => [...prev, { ...msgData, fromMe: true }]);
      setMessage('');
      
      // Save to backend
      const res = await axios.post('http://localhost:5000/api/messages/', msgData);
      
      // Emit to socket
      socket.current.emit('send-message', res.data);
    } catch (err) {
      console.error('Failed to send message', err);
      // Optionally remove the message from chat if it failed to send
    }
  };

  return (
    <div className="chat-popup">
      <div className="chat-header">
        <span>Chat with {recipient.name}</span>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="chat-messages">
        {chat.length === 0 ? (
          <div className="empty-chat">Start a conversation with {recipient.name}</div>
        ) : (
          chat.map((msg, index) => (
            <div key={msg._id || index} className={`message ${msg.fromMe ? 'me' : 'them'}`}>
              <div className="text">{msg.message}</div>
              <small className="meta">
                {msg.fromMe ? 'You' : recipient.name}
                {msg.timestamp && ` • ${new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
              </small>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={message}
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} disabled={!message.trim()}>Send</button>
      </div>
    </div>
  );
};

export default ChatPop;