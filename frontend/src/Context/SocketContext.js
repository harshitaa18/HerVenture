import { createContext, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useUser } from './UserContext';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      socket.current = io('http://localhost:5000');
      socket.current.emit('join-room', user._id);
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
