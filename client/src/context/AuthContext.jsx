import React, { createContext, useContext, useState } from 'react';
import io from 'socket.io-client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [socket, setSocket] = useState(io('http://localhost:9000', {
        reconnection: false, // Disable automatic reconnection
      }))

  return (
    <AuthContext.Provider value={{ socket }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};