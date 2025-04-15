import React, { useEffect, useRef, useState } from 'react';
import './ChatPop.css';

const ChatPop = ({ recipient = { name: "Jane Doe", _id: "recipient-id" }, onClose }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const messagesEndRef = useRef(null);
  const prevChatLength = useRef(0);

  // Simulated logged-in user
  const user = { _id: 'user-id', name: 'You' };

  // Load messages from localStorage or use dummy
  useEffect(() => {
    const storedChat = localStorage.getItem(`chat_${recipient._id}`);
    if (storedChat) {
      setChat(JSON.parse(storedChat));
    } else {
      const dummy = [
        { senderId: 'user-id', receiverId: 'recipient-id', message: 'Hey!', timestamp: new Date().toISOString(), fromMe: true },
        { senderId: 'recipient-id', receiverId: 'user-id', message: 'Hello! How are you?', timestamp: new Date().toISOString(), fromMe: false },
      ];
      setChat(dummy);
      localStorage.setItem(`chat_${recipient._id}`, JSON.stringify(dummy));
    }
  }, [recipient._id]);

  // Scroll to bottom only when a new message is added
  useEffect(() => {
    if (chat.length > prevChatLength.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    prevChatLength.current = chat.length;
  }, [chat]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      senderId: user._id,
      receiverId: recipient._id,
      message: message.trim(),
      timestamp: new Date().toISOString(),
      fromMe: true,
    };

    const updatedChat = [...chat, msgData];
    setChat(updatedChat);
    setMessage('');
    localStorage.setItem(`chat_${recipient._id}`, JSON.stringify(updatedChat));
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
            <div key={index} className={`message ${msg.fromMe ? 'me' : 'them'}`}>
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
