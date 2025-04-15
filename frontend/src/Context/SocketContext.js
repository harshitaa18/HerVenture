// // Context/SocketContext.js
// import React, { createContext, useContext, useEffect, useRef } from 'react';
// import io from 'socket.io-client';

// const SocketContext = createContext();

// export const useSocket = () => useContext(SocketContext);

// export const SocketProvider = ({ children }) => {
//   const socket = useRef(null);

//   useEffect(() => {
//     // Initialize socket connection
//     socket.current = io('http://localhost:5000', {
//       withCredentials: true,
//     });

//     // Clean up on unmount
//     return () => {
//       if (socket.current) {
//         socket.current.disconnect();
//       }
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={socket}>
//       {children}
//     </SocketContext.Provider>
//   );
// };