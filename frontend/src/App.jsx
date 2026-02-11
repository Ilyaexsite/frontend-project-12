import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AuthProvider } from './contexts/AuthContext'
import { store } from './store'
import LoginPage from './components/LoginPage'
import MainPage from './components/MainPage'
import ChatPage from './components/Chat/ChatPage'
import NotFoundPage from './components/NotFoundPage'
import ProtectedRoute from './components/ProtectedRoute'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/main" element={<MainPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  )
}

export default App
