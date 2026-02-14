import React, { createContext, useState, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { chatApi } from '../store/api/chatApi';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser({ token, username });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch('/api/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const token = data.token || `jwt-${username}-${Date.now()}`;
      
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      setUser({ token, username });
      dispatch(chatApi.util.resetApiState());
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Ошибка авторизации' };
    }
  };

  const signup = async (username, password) => {
    try {
      const response = await fetch('/api/v1/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error('User already exists');
        }
        throw new Error('Signup failed');
      }

      const data = await response.json();
      const token = data.token || `jwt-${username}-${Date.now()}`;
      
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      setUser({ token, username });
      dispatch(chatApi.util.resetApiState());
      
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      if (error.message === 'User already exists') {
        return { success: false, message: 'Пользователь уже существует' };
      }
      return { success: false, message: 'Ошибка регистрации' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
    dispatch(chatApi.util.resetApiState());
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      isAuthenticated: !!user, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
