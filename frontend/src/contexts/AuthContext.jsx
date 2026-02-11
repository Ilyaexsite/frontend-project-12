import React, { createContext, useState, useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { chatApi } from '../store/api/chatApi'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, [])
  const login = async (username, password) => {
    try {
      const response = await fetch('/api/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) throw new Error('Login failed')

      const data = await response.json()
      localStorage.setItem('token', data.token)
      setUser({ token: data.token, username: data.username })
      dispatch(chatApi.util.resetApiState())
      return { success: true }
    } catch (error) {
      return { success: false, message: 'Ошибка авторизации' }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null);
    dispatch(chatApi.util.resetApiState())
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
