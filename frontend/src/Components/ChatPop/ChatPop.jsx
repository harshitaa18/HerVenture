import React, { useEffect, useRef, useState } from 'react';
import './ChatPop.css';
import { useSocket } from '../../Context/SocketContext';
import { useUser } from '../../Context/UserContext';

const ChatPop = ({ recipient, onClose }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const socket = useSocket();
  const { user } = useUser();
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  // Join personal room once
  useEffect(() => {
    if (user?._id && socket.current) {
      console.log('User ID:', user._id); // Log the current user's ID
      socket.current.emit('join-room', user._id);
    }
  }, [user, socket]);

  // Receive message handler
  useEffect(() => {
    if (!socket.current) return;

    const handleReceive = (data) => {
        console.log("Received message:", data);
      setChat((prev) => [...prev, { ...data, fromMe: false }]);
    };

    socket.current.on('receive-message', handleReceive);
    return () => socket.current.off('receive-message', handleReceive);
  }, [socket]);

  // Send message
  const sendMessage = () => {
    if (!user?._id) {
        console.error('User ID is missing');
        return;
      }
      if (!recipient?._id) {
        console.error('Recipient ID is missing');
        return;
      }
    if (message.trim()) {
      const msg = {
        senderId: user._id,
        receiverId: recipient._id,
        text: message,
      };

      console.log('Sending message from:', user._id); // Log the sender ID
      console.log('Sending message to:', recipient._id, recipient.name); // Log the recipient ID and name

      socket.current.emit('send-message', msg);
      setChat((prev) => [...prev, { ...msg, fromMe: true }]);
      setMessage('');
    }
  };

  return (
    <div className="chat-popup">
      <div className="chat-header">
        <span>Chat with {recipient.name}</span>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="chat-messages">
        {chat.map((msg, index) => (
          <div key={index} className={`message ${msg.fromMe ? 'me' : 'them'}`}>
            <div className="text">{msg.text}</div>
            <small className="meta">
              {msg.fromMe ? 'You' : recipient.name}
            </small>
          </div>
        ))}
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
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPop;
